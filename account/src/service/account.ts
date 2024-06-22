import DB_Account from "../models/account"

interface accountAtributes {
    balance: number
}

async function createAccount(datas: accountAtributes): Promise<accountAtributes> {
    return await DB_Account.create(datas)
}

async function getAllAccounts() : Promise<accountAtributes[] | null> {
    return await DB_Account.findAll()
}

async function getAccount(id:string) : Promise<accountAtributes | null> {
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