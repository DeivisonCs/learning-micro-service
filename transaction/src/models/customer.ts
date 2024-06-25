import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { db } from "../infra/database/databse";

interface CustomerAttributes {
    id: number
    originId: number
    name: string
    email: string
    address: string
}

interface CustomerOptAttributes extends Optional<CustomerAttributes, "id"> {}

class Customer extends Model<CustomerAttributes, CustomerOptAttributes> implements CustomerAttributes {
    id!: number
    originId!: number
    name!: string
    email!: string
    address!: string
}

const initializeCustomer = (sequelize: Sequelize) => {
    return Customer.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            originId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            sequelize,
            tableName: "customer"
        }
    )
} 

initializeCustomer(db)
export default Customer