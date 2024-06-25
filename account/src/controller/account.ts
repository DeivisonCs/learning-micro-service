import { Request, Response } from "express"
import {createAccount, getAllAccounts, getAccount, deleteAccount, updateAmountAccount} from "../service/account"


async function createAccountHandler (originId: number) {

    try{
        const account = await createAccount(originId)

        console.log(account)
    }
    catch(error){
        console.log({message: "Failed to create account", error:error})
    }
} 

async function getAccountsHandler (req: Request, res: Response) {

    try{
        const id = req.params.id?? null
        let accounts: any

        if(id) accounts = await getAccount(id)
        else accounts = await getAllAccounts()

        res.status(200).send({accounts:accounts})
    }
    catch(error){
        res.status(400).send({message: error})
    }
}

async function deleteAccountHandler(req: Request, res: Response) {
    try{
        deleteAccount(req.params.id)
        res.status(200).send({message: "account deleted"})
    }
    catch(error){
        res.status(400).send({message: error})
    }
}

async function updateAmountHandler(id: string, amount: number, operation: string): Promise<string> {
    
    const account = await getAccount(id)

    if(account === null) return "Account not found"

    if(operation === "DEPOSIT"){
        if(account.amount - amount < 0.0 ) return "Amount not enough"
        else{
            account.amount -= amount
            await updateAmountAccount(account.id, account.amount)

            return "Amount deposited"
        }
    }
    
    if(operation === "RECIEVE"){
        account.amount += amount
        await updateAmountAccount(account.id, account.amount)

        return "Amount received"
    }

    return `Error to ${operation}`
    
}

export {createAccountHandler, getAccountsHandler, deleteAccountHandler, updateAmountHandler}