// src/types/financial.ts

export interface JournalEntry {
  id: string; // or number, depending on your database
  date: string; // ISO 8601 date format (e.g., '2024-05-25')
  account: string;
  refno: string;
  debit: number;
  credit: number;
}

// Add other financial types as needed:
export interface GeneralLedgerEntry {
  // ...
}

export interface IncomeStatementEntry {
  // ...
}

export interface InventoryStockCardEntry {
  // ...
}

export interface PurchaseOrder {
  // ...
}

export interface Invoice {
  // ...
}
