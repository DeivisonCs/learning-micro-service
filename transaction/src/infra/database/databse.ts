import * as dotenv from 'dotenv'
import {Dialect, Sequelize} from "sequelize";

dotenv.config({ path: '.env' })

export const db = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASSWORD as string,
    {
        host: process.env.DB_HOST as string,
        dialect: process.env.DB_DIALECT as Dialect,
    }
)

db.sync({force:true})