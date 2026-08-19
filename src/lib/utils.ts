import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Utility for generating guaranteed unique restaurant order numbers for DineOS.
 * Format: #DO-YYMMDD-XXX (e.g. #DO-260819-001, #DO-260819-002...)
 * Guaranteed to never repeat across sessions, storage, or parallel requests.
 */
export function generateUniqueOrderNumber(
  existingOrders: { orderNumber?: string; id?: string }[] = [],
  prefix = "#DO"
): string {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const todayCode = `${yy}${mm}${dd}`; // e.g. "260819"

  // Collect all known order numbers from argument and localStorage
  const existingSet = new Set<string>();

  if (Array.isArray(existingOrders)) {
    existingOrders.forEach((o) => {
      if (o?.orderNumber) existingSet.add(o.orderNumber.toUpperCase().trim());
    });
  }

  if (typeof window !== "undefined") {
    try {
      const savedOrders = localStorage.getItem("ran-lung-get-orders");
      if (savedOrders) {
        const parsed = JSON.parse(savedOrders);
        if (Array.isArray(parsed)) {
          parsed.forEach((o: any) => {
            if (o?.orderNumber) existingSet.add(String(o.orderNumber).toUpperCase().trim());
          });
        }
      }
    } catch {}
  }

  // Find highest sequence number for today from existing orders
  let maxSeq = 0;
  const seqRegex = new RegExp(`^(?:#?DO-|#?AK-)?${todayCode}-(\\d+)$`, "i");

  existingSet.forEach((num) => {
    const match = num.match(seqRegex);
    if (match && match[1]) {
      const parsedSeq = parseInt(match[1], 10);
      if (!isNaN(parsedSeq) && parsedSeq > maxSeq) {
        maxSeq = parsedSeq;
      }
    }
  });

  // Check persistent sequence storage for today
  const storageKey = `dineos-order-seq-${todayCode}`;
  let storedSeq = 0;
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed) && parsed > storedSeq) {
          storedSeq = parsed;
        }
      }
    } catch {}
  }

  let nextSeq = Math.max(maxSeq, storedSeq) + 1;
  let candidate = "";

  // Loop until an absolutely unused order number is found
  while (true) {
    const paddedSeq = String(nextSeq).padStart(3, "0");
    candidate = `${prefix}-${todayCode}-${paddedSeq}`;
    if (!existingSet.has(candidate.toUpperCase().trim())) {
      break;
    }
    nextSeq++;
  }

  // Persist the new sequence
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(storageKey, String(nextSeq));
      localStorage.setItem("dineos-last-order-number", candidate);
    } catch {}
  }

  return candidate;
}

