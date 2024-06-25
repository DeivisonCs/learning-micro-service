import { Request, Response } from 'express'
import { createTransaction, getAllTransactions, getTransaction } from "../service/transaction"; 
import { getCustomer } from '../service/customer';

interface Transaction{
    id: number
    fromId: number
    toId: number
    amount: number
}

interface TransactionDetails extends Transaction{
    fromName: string
    fromEmail: string
    fromAddress: string
    toName: string
    toEmail: string
    toAddress: string
}


async function createTransactionHandler(data: TransactionDetails) {
    try{
        const transaction = await createTransaction(data)
    }
    catch(error){
        console.log({message: "Failed to make transaction ", error:error})
    }
}

async function getTransactionHandler(req: Request, res: Response) {
    try{
        const id = req.params.id
        let transactions: any


        if(id){
            transactions = await getTransaction(id)
        
            if(transactions) transactions = await getTransactionDetails(transactions)
            transactions = filterTransactionData(transactions)
        }
        else {
            transactions = await getAllTransactions()

            transactions = await Promise.all(transactions.map(async (transaction: Transaction) => {
                const detailedTransaction = await getTransactionDetails(transaction);
                return filterTransactionData(detailedTransaction);
            }))
        }

        res.status(200).send({transaction: transactions})
    }
    catch(error){
        res.status(400).send({error: error})
    }
}

async function getTransactionDetails(transaction: Transaction): Promise<TransactionDetails> {
    const fromCustomer = await getCustomer(transaction.fromId)
    const toCustomer = await getCustomer(transaction.toId)

    const transactionDetails: TransactionDetails = {
        ...transaction,
        id: transaction.id,
        amount: transaction.amount,
        fromName: fromCustomer!.name,
        fromEmail: fromCustomer!.email,
        fromAddress: fromCustomer!.address,
        toName: toCustomer!.name,
        toEmail: toCustomer!.email,
        toAddress: toCustomer!.address
    }
    

    return transactionDetails
}

function filterTransactionData(transaction: any):  Omit<TransactionDetails, 'fromId' | 'toId'> {
    const { id, amount, fromName, fromEmail, fromAddress, toName, toEmail, toAddress } = transaction;
    return { id, amount, fromName, fromEmail, fromAddress, toName, toEmail, toAddress };
}

export {TransactionDetails, createTransactionHandler, getTransactionHandler}