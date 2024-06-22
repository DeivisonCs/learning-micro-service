import { Sequelize, Model, DataTypes, Optional } from "sequelize"
import { db } from "../infra/database/database"

interface CustomerAttributes {
    id: number,
    originId: number
    name: string
}

interface CustomerOptAttributes extends Optional<CustomerAttributes, "id">{}

class Customer extends Model<CustomerAttributes, CustomerOptAttributes> implements CustomerAttributes {
    public id!: number
    public originId!: number
    public name!: string
}

const customerInit = (sequelize: Sequelize): typeof Customer => {
    return Customer.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            originId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },{
            sequelize,
            modelName: "Customer",
        }
    )
}

customerInit(db)
export default Customer