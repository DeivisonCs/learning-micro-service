import { Request, Response } from "express"
import {createAccount, getAllAccounts, getAccount, deleteAccount} from "../service/account"


async function createAccountHandler (req: Request, res: Response) {

    try{
        const account = await createAccount(req.body)

        res.status(201).send({message: "Account Created", account: account})
    }
    catch(error){
        res.status(400).send({message: "Failed to create account", error:error})
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
        res.status(200).send({message: "account deleted"})
    }
    catch(error){
        res.status(400).send({message: error})
    }
}

export {createAccountHandler, getAccountsHandler, deleteAccountHandler}