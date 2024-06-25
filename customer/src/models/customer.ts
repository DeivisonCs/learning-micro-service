import { Sequelize, Model, DataTypes, Optional } from "sequelize"
import { db } from '../infra/database/database'

interface CustomerAttributes{
    id: number
    name: string
    email: string
    address: string
}

interface CustomerCreationAttributes extends Optional<CustomerAttributes, 'id'> {}

class Customer extends Model<CustomerAttributes, CustomerCreationAttributes > implements CustomerAttributes {
    public id!: number
    public name!: string
    public email!: string
    public address!: string
    public createdAt!: string
    public updatedAt!: string
}

const initializeCustomer = (sequelize: Sequelize): typeof Customer => {
    return Customer.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Customer",
            timestamps: true,
        }
    );
};

initializeCustomer(db);
export default Customer