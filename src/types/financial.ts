// src/types/financial.ts

export interface JournalEntry {
  id: string; // or number, depending on your database
  date: string; // ISO 8601 date format (e.g., '2024-05-25')
  account: string;
  debit: number;
  credit: number;
}

// Add other financial types as needed:
export interface GeneralLedgerEntry {
  id: string;
  date: string; // ISO 8601 date format (e.g., '2024-05-26')
  account: string;
  debit: number;
  credit: number;
  balance: number;  // Add balance to the type
}

export interface IncomeStatementEntry {
  sale_gas95: number;
  sale_diesel: number;
  totalsale: number;
  cogs_gas95: number;
  cogs_diesel: number;
  total_cogs: number;
  grossprofit: number;
  dayshift_saleoffice: number;
  dayshift_gate: number;
  nightshift_gate: number;
  depreciation : number;
  utilityExpense : number;
  totolOpEx : number;
  netincome : number;
}

export interface StockData {
  [key: string]: {
    GASOHOL95: number;
    DIESEL: number;
    // Add other fuel types as needed
  };
}

export interface PurchaseOrder {
  id: string; 
  po_number: string;
  invoice: string;
  datetime_created: string;
  customerID: string;
  company : string;
  customerName: string;
  tax_payer_id: number;
  gastype: string;
  PperLitre: number;
  volumn: number;
  totolprice: number;
  vat7: number;
  total_include_vat: number;
}

export interface Invoice {
  // ...
}
