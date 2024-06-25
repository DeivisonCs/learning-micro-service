import { Sequelize, Model, DataTypes, Optional } from "sequelize";
import { db } from "../infra/database/databse";
import Customer from "./customer"

interface TransactionAttributes {
    id: number
    fromId: number
    toId: number
    amount: number
}

interface TransactionOptAttributes extends Optional<TransactionAttributes, "id"> {}

class Transaction extends Model<TransactionAttributes, TransactionOptAttributes> implements TransactionAttributes {
    id!: number
    fromId!: number
    toId!: number
    amount!: number
    public createdAt!: string
    public updatedAt!: string
}

const initializeTransaction = (sequelize: Sequelize) => {
    return Transaction.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            fromId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: Customer,
                    key: 'id' 
                }
            },
            toId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: Customer,
                    key: 'id' 
                }
            },
            amount:{
                type: DataTypes.FLOAT,
                allowNull: false
            }
        },
        {
            sequelize,
            tableName: "transaction",
            timestamps: true
        }
    )
}

initializeTransaction(db)
export default Transaction