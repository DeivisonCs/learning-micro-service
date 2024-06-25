import DB_Transaction from "../models/transaction"
import {TransactionDetails} from "../controller/transaction"

async function createTransaction(data: TransactionDetails): Promise<DB_Transaction> {
    return DB_Transaction.create(data)
}

async function getAllTransactions(): Promise<DB_Transaction[]> {
    return DB_Transaction.findAll()
}

async function getTransaction(id: string): Promise<DB_Transaction | null> {
    return DB_Transaction.findByPk(id)
}

export {createTransaction, getAllTransactions, getTransaction}