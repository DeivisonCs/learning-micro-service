import DB_Customer from "../models/customer"

interface CustomerAttributes {
    name: string;
    email: string;
    address: string;
}

async function createCustomer(datas: CustomerAttributes): Promise<DB_Customer> {
    return await DB_Customer.create(datas)
}

async function getAllCustomers(): Promise<DB_Customer[] | null> {
    return await DB_Customer.findAll()
}

async function getCustomer(id: string): Promise<DB_Customer | null> {
    return await DB_Customer.findByPk(id)
}

async function deleteCustomer(id: string|undefined): Promise<DB_Customer | null> {
    const customer = await DB_Customer.findByPk(id)

    await DB_Customer.destroy({
        where: {
            id: id
        }
    })

    return customer
}

export {createCustomer, getAllCustomers, getCustomer, deleteCustomer}