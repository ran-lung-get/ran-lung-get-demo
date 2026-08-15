# 🏗️ คู่มือการจัดเรียงไฟล์และ Refactor โค้ด (Architecture & Clean Code Guide)
> **เป้าหมาย**: จัดระเบียบโค้ดให้เป็นสัดส่วน ดูแลง่าย ลดโค้ดซ้ำซ้อน และเพิ่มความเร็วในการพัฒนา **โดยไม่มีการลบไฟล์เดิมในระบบออก**

---

## 📊 สถานะการ Refactor ปัจจุบัน (Current Refactoring Status)
✅ **ดำเนินการเสร็จสิ้นสมบูรณ์ 100% ทุกส่วน โดยไม่มีการลบไฟล์เดิมออก และผ่าน `npm run build` 0 errors**

| Domain / Route | สถานะ | สถิติลดขนาดโค้ด (Lines) | สิ่งที่ดำเนินการ |
|---|---|---|---|
| **Customer (`/customer`)** | ✅ **เสร็จสมบูรณ์** | **5,385 ➔ ~450 บรรทัด** | แยก Sub-components, Modals, Overlays, Custom Hooks (`useCustomerAuth`, `useCustomerCart`, `useCustomerOrders`, `useCustomerTables`, `useCustomerMenuAndStock`, `useStripeCheckoutVerification`), Constants และ Types |
| **Kitchen Monitor (`/kitchen`)** | ✅ **เสร็จสมบูรณ์** | **2,248 ➔ ~450 บรรทัด** | แยก `OrderCard`, `OrderTimer`, `DashboardView`, `RefundManagementView`, `sound.ts`, `simulation.ts` |
| **Staff Dashboard (`/staff`)** | ✅ **เสร็จสมบูรณ์** | **2,667 ➔ ~400 บรรทัด** | แยก `TableManagementView`, `MenuManagementView`, `StockManagementView`, `StaffOrderCard`, `StaffSidebarContent` |
| **Admin Dashboard (`/admin`)** | ✅ **เสร็จสมบูรณ์** | **1,924 ➔ ~430 บรรทัด** | แยก `AdminDashboardView`, `AdminInventoryView`, `AdminStaffView`, `AdminSidebarContent` |

---

## 📂 โครงสร้างโฟลเดอร์ใหม่ (Feature-Based Architecture)

```
src/
├── components/                 # 🧩 Shared UI Components
│   ├── ui/                     # ปุ่ม, Input, Card, Modal, Badge, Switch
│   ├── DevBypassPanel.tsx      # แถบลัดทดสอบระบบ
│   └── TranslationBox.tsx      # กล่องแปลภาษา
│
├── features/                   # 🚀 โค้ดแยกตามฟีเจอร์หลัก (Feature-Driven Architecture)
│   ├── customer/               # ฟีเจอร์ฝั่งลูกค้า
│   │   ├── components/         # Sub-components, Modals, Overlays ทั้งหมด
│   │   ├── hooks/              # useCustomerAuth, useCustomerOrders, useCustomerCart, useCustomerTables, useCustomerMenuAndStock, useStoreStatus, useStripeCheckoutVerification, useWebAvatar
│   │   ├── constants/          # options.ts, menu.ts
│   │   ├── types/              # index.ts
│   │   └── utils/              # pricing.ts
│   │
│   ├── staff/                  # ฟีเจอร์ฝั่งพนักงาน
│   │   ├── components/         # StaffSidebarContent, StaffOrderCard, TableManagementView, MenuManagementView, StockManagementView
│   │   ├── constants/          # categories.ts
│   │   ├── types/              # index.ts
│   │   └── utils/              # sound.ts
│   │
│   ├── kitchen/                # ฟีเจอร์หน้าจอครัว
│   │   ├── components/         # OrderCard, OrderTimer, HistoryOrderRow, KitchenSidebarContent, DashboardView, MenuManagementView, RefundManagementView
│   │   ├── constants/          # simulation.ts
│   │   ├── types/              # index.ts
│   │   └── utils/              # sound.ts
│   │
│   └── admin/                  # ฟีเจอร์ผู้ดูแลระบบ
│       ├── components/         # AdminSidebarContent, AdminDashboardView, AdminInventoryView, AdminStaffView
│       └── types/              # index.ts
│
├── hooks/                      # 🪝 Global Custom Hooks
├── lib/                        # 🛠️ Core Utilities & Services
│   ├── supabase.ts             # Supabase Client
│   ├── supabase.service.ts     # Data Access Layer
│   ├── i18n.tsx                # Internationalization
│   └── utils.ts                # Formatters & Helpers
│
└── routes/                     # 🌐 หน้าเพจหลัก (Router Page Assemblers)
    ├── customer/index.tsx      # Page Assembler สั้น สะอาดตา (~450 บรรทัด)
    ├── staff/index.tsx         # Page Assembler (~400 บรรทัด)
    ├── admin/index.tsx         # Page Assembler (~430 บรรทัด)
    ├── kitchen.tsx             # Page Assembler (~450 บรรทัด)
    └── login.tsx               # หน้า Login เข้าสู่ระบบ
```

---

## 🏆 ผลลัพธ์ที่ได้หลัง Refactor

1. **ขนาดไฟล์ลดลงมหาศาล**: ทุกไฟล์ Route หลักลดลงเหลือเพียง ~400–450 บรรทัด
2. **ค้นหาและแก้บั๊กได้ทันที**: เมื่อเจอปัญหาแยกดูตาม Custom Hook และ Sub-component ได้ทันที
3. **โค้ดสะอาด เป็นระเบียบ (Clean Code)**: แยก UI และ Business Logic ชัดเจน
4. **ไม่สูญเสียฟังก์ชันเดิม**: ไฟล์ Route และ URL เดิมยังคงทำงานได้ตามปกติ 100%
5. **Build ผ่าน 100%**: ตรวจสอบด้วย `npm run build` สำเร็จ 0 errors
