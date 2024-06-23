import DB_Account from "../models/account"

interface AccountAttributes {
    id: number
    originId: number
    balance: number
    createAt: string
    updatedAt: string
}


async function createAccount(originId: number): Promise<AccountAttributes> {
    return await DB_Account.create({originId:originId, balance:0.0})
}

async function getAllAccounts() : Promise<AccountAttributes[] | null> {
    return await DB_Account.findAll()
}

async function getAccount(id:string) : Promise<AccountAttributes | null> {
    return await DB_Account.findByPk(id)
}

async function deleteAccount(id:string) : Promise<number> {
    return await DB_Account.destroy({
        where: {
            id: id
        }
    })
}

export {createAccount, getAllAccounts, getAccount, deleteAccount}