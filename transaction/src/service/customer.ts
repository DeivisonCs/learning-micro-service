import DB_Customer from "../models/customer"

interface Customer {
    originId: number
    name: string
    email: string
    address: string
}

async function createCustomer(data: Customer): Promise<DB_Customer>{
    return await DB_Customer.create(data)
}

async function getCustomer(id: number): Promise<DB_Customer| null> {
    return await DB_Customer.findByPk(id)
}

async function getAllCustomers(): Promise<DB_Customer[]> {
    return await DB_Customer.findAll()
}

export {createCustomer, getCustomer, getAllCustomers}