import { Request, Response } from 'express'
import { createTransaction, getAllTransactions, getTransaction } from "../service/transaction"; 
import { getCustomer } from '../service/customer';

interface Transaction {
    fromId: number
    toId: number
    amount: number
    fromName?: string
    fromEmail?: string
    fromAddress?: string
    toName?: string
    toEmail?: string
    toAddress?: string
}


async function createTransactionHandler(data: Transaction) {
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
        
            if(transactions) getTransactionDetails(transactions)
        }
        else {
            transactions = await getAllTransactions()

            transactions.forEach((transaction: Transaction) => getTransactionDetails(transaction));
        }

        res.status(200).send({transaction: transactions})
    }
    catch(error){
        res.status(400).send({error: error})
    }
}

async function getTransactionDetails(transaction: Transaction) {
    const fromCustomer = await getCustomer(transaction.fromId)
    const toCustomer = await getCustomer(transaction.toId)

    if(fromCustomer && toCustomer){
        transaction.fromName = fromCustomer.name
        transaction.fromAddress = fromCustomer.address
        transaction.fromEmail = fromCustomer.email
        transaction.toName = toCustomer.name
        transaction.toAddress = toCustomer.address
        transaction.toEmail = toCustomer.email
    }
}

export {Transaction, createTransactionHandler, getTransactionHandler}