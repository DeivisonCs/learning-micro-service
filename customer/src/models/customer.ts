import { Sequelize, Model, DataTypes, Optional } from "sequelize"
import { db } from '../infra/database/database'

interface CustomerAttributes{
    id: number
    name: string
}

interface CustomerCreationAttributes extends Optional<CustomerAttributes, 'id'> {}

class Customer extends Model<CustomerAttributes, CustomerCreationAttributes > implements CustomerAttributes {
    public id!: number
    public name!: string
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
        },
        {
            sequelize,
            tableName: "customers",
            modelName: "Customer",
            timestamps: true,
        }
    );
};

initializeCustomer(db);
export default Customer