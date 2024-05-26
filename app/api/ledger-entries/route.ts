// app/api/general-ledger/route.ts
import { NextRequest, NextResponse } from 'next/server';
import sql from 'mssql';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const account = searchParams.get('account'); // Get optional account filter

  // Azure SQL Database Configuration (Load from environment variables)
  const config = {
    user: 'miniprogroup2',        // Replace with your Azure SQL username
    password: 'inc.372g2',    // Replace with your Azure SQL password
    server: 'minipro372-g2-server.database.windows.net', // Replace with your Azure SQL server name
    database: 'minipro372-g2-db', // Replace with your Azure SQL database name
    options: {
      encrypt: true, // Use encryption (recommended)
    }
  };

  try {
    await sql.connect(config);
    // Prepare request
    const request = new sql.Request();

    let ledgerEntries: { account: string, entries: any[] }[] = [];
    
    // Start with an initial query to get all unique accounts
    const accountQuery = "SELECT DISTINCT account FROM LedgerEntries";

    const accountResult = await request.query(accountQuery);
    const uniqueAccounts = accountResult.recordset.map(row => row.account);
    
    // Prepare the ledgerEntries array with an empty array for each account
    ledgerEntries = uniqueAccounts.map(accountName => ({
      account: accountName,
      entries: []
    }));
    
    // Construct a query to fetch all journal entries
    const query = account
      ? `SELECT * FROM LedgerEntry WHERE account = @account ORDER BY date` 
      : `SELECT * FROM LedgerEntry ORDER BY date`;

    request.input('account', sql.NVarChar, account);

    const result = await request.query(query);

    for (const entry of result.recordset) {
      const accountIndex = ledgerEntries.findIndex(item => item.account === entry.account);
      if (accountIndex !== -1) {
        ledgerEntries[accountIndex].entries.push(entry);
      }
    }

    return NextResponse.json(ledgerEntries);
  } catch (err) {
    console.error('Error querying database:', err);
    return NextResponse.json({ error: 'Database query failed' }, { status: 500 });
  }
}

