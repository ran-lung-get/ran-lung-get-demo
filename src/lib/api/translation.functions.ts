import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { translateText } from "./translation.server";

export const translateApi = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      text: z.string().min(1).max(5000),
      sourceLang: z.string(),
      targetLang: z.string(),
    })
  )
  .handler(async ({ data }) => {
    return await translateText(data);
  });
