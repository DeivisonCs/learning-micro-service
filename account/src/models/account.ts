import { Sequelize, Model, DataTypes, Optional } from "sequelize"
import { db } from "../infra/database/database"
import Customer from "./customer"

interface AccountAttributes {
    id: number
    amount: number
    customerId: number
}

interface AccountOptAttributes extends Optional<AccountAttributes, "id">{}

class AccountModel extends Model<AccountAttributes, AccountOptAttributes> implements AccountAttributes {
    public id!: number
    public customerId!: number
    public amount!: number
    public createAt!: string
    public updatedAt!: string
}

const initializeAccount = (sequelize: Sequelize): typeof AccountModel => {
    return AccountModel.init(
        {
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            amount: {
                type: DataTypes.FLOAT
            },
            customerId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: Customer,
                    key: 'id'
                }
            }
        },{
            sequelize,
            timestamps: true
        }
    )
}


const Account = initializeAccount(db)
Account.belongsTo(Customer, { foreignKey: 'customerId' });

export default Account

// import { Model, DataTypes, Optional } from 'sequelize';
// import {db} from '../infra/database/database';
// import Customer from './customer';

// interface AccountAttributes {
//     id: number;
//     balance: number;
// }

// interface AccountCreationAttributes extends Optional<AccountAttributes, 'id'> {}

// interface AccountInstance
//     extends Model<AccountAttributes, AccountCreationAttributes>,
//         AccountAttributes {}

// const Account = db.define<AccountInstance, AccountCreationAttributes>('account', {
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     balance: {
//         type: DataTypes.FLOAT,
//         allowNull: true
//     }
// }, {
//     timestamps: true
// });

// Account.belongsTo(Customer);

// export default Account;