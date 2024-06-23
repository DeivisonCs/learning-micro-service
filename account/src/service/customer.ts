import DB_Customer from "../models/customer"

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

export {createCustomer, getAllCustomers}