import { Model, DataTypes, Optional } from 'sequelize';
import {db} from '../infra/database/database';
import Customer from './customer';

// Define the attributes for the Account model
interface AccountAttributes {
    id: number;
    balance: number;
}

// Define the creation attributes for the Account model
interface AccountCreationAttributes extends Optional<AccountAttributes, 'id'> {}

// Define the instance type for the Account model
interface AccountInstance
    extends Model<AccountAttributes, AccountCreationAttributes>,
        AccountAttributes {}

const Account = db.define<AccountInstance, AccountCreationAttributes>('account', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    balance: {
        type: DataTypes.FLOAT,
        allowNull: true
    }
}, {
    timestamps: true
});

Account.belongsTo(Customer);

export default Account;
// import { Sequelize, Model, DataTypes, Optional } from "sequelize"
// import { db } from "../infra/database/database"
// import Customer from "./customer"

// interface AccountAttributes {
//     id: number
//     balance: number
// }

// interface AccountOptAttributes extends Optional<AccountAttributes, "id">{}

// class Account extends Model<AccountAttributes, AccountOptAttributes> implements AccountAttributes {
//     public id!: number
//     public balance!: number
//     public createAt!: string
//     public updatedAt!: string
// }

// const initializeAccount = (sequelize: Sequelize): typeof Account => {
//     return Account.init(
//         {
//             id:{
//                 type: DataTypes.INTEGER,
//                 primaryKey: true,
//                 autoIncrement: true
//             },
//             balance: {
//                 type: DataTypes.FLOAT
//             }
//         },{
//             sequelize,
//             timestamps: true
//         }
//     )
// }

// Account.belongsTo(Customer)

// initializeAccount(db)
// export default Account