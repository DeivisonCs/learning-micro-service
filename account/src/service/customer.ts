import DB_Customer from "../models/customer"
import DB_Account from "../models/account"

interface CustumerAttributes{
    originId: number
    email: string
}

async function createCustomer(data: CustumerAttributes): Promise<DB_Customer>{
    return await DB_Customer.create(data)
}

async function getAllCustomers(): Promise<DB_Customer[]>{
    return await DB_Customer.findAll()
}

async function deleteCustomer(id: number): Promise<DB_Customer | null>{
    const custumer = await DB_Customer.findByPk(id)

    await DB_Account.destroy({
        where:{
            customerId: id
        }
    })

    await DB_Customer.destroy({
        where: {
            id: id
        }
    })

    return custumer
}

async function getCustomer(id: number): Promise<DB_Customer | null>{
    return await DB_Customer.findByPk(id)
}

async function tranferCustomers(fromId: number, toId: number): Promise<DB_Customer[]>{
    const tranferCustomers: DB_Customer[] = []

    const fromCustomer = await getCustomer(fromId)
    const toCustomer = await getCustomer(toId)

    if(fromCustomer!= null) tranferCustomers.push(fromCustomer)
    if(toCustomer!= null) tranferCustomers.push(toCustomer)

    return tranferCustomers
}

export {createCustomer, getAllCustomers, deleteCustomer, tranferCustomers, getCustomer}