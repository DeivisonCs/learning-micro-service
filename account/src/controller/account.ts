import { Request, Response } from "express"
import {createAccount, getAllAccounts, getAccount, deleteAccount} from "../service/account"


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

export {createAccountHandler, getAccountsHandler, deleteAccountHandler}