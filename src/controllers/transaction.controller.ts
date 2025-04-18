import { getDBConnection } from '../services/database';
import { Transaction } from '../models/transaction.model';

const TABLE_NAME = 'transactions';

export const createTable = async () => {
    const db = await getDBConnection();
    await db.executeSql(
        `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      amount REAL NOT NULL,
      description TEXT NOT NULL,
      date TEXT NOT NULL
    );`
    );
};

export const insertTransaction = async (transaction: Transaction): Promise<void> => {
    const db = await getDBConnection();
    const { amount, description, date } = transaction;
    await db.executeSql(
        `INSERT INTO ${TABLE_NAME} (amount, description, date) VALUES (?, ?, ?)`,
        [amount, description, date]
    );
};

export const getAllTransactions = async (): Promise<Transaction[]> => {
    const db = await getDBConnection();
    const results = await db.executeSql(`SELECT * FROM ${TABLE_NAME} ORDER BY date DESC`);
    const rows = results[0].rows;
    const transactions: Transaction[] = [];

    for (let i = 0; i < rows.length; i++) {
        transactions.push(rows.item(i));
    }

    return transactions;
};
