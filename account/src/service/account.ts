import DB_Account from "../models/account"

interface AccountAttributes {
    id: number
    customerId: number
    amount: number
    createAt: string
    updatedAt: string
}


async function createAccount(originId: number): Promise<AccountAttributes> {
    return await DB_Account.create({customerId:originId, amount:5000.0})
}

async function getAllAccounts() : Promise<AccountAttributes[] | null> {
    return await DB_Account.findAll()
}

async function getAccount(id:string) : Promise<AccountAttributes | null> {
    return await DB_Account.findByPk(id)
}

async function deleteAccount(id:string) : Promise<AccountAttributes | null> {
    const account = DB_Account.findByPk(id)

    await DB_Account.destroy({
        where: {
            id: id
        }
    })

    return account
}

async function updateAmountAccount(id:number, newAmount:number) {
    const accountToUpdate = await DB_Account.findByPk(id)
    
    if(accountToUpdate){
        
        await accountToUpdate.update({amount:newAmount})
    }
}

export {createAccount, getAllAccounts, getAccount, deleteAccount, updateAmountAccount}