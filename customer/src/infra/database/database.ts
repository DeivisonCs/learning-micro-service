import * as dotenv from 'dotenv'
import { Sequelize } from "sequelize"

dotenv.config({ path: '.env' })

export const db = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASSWORD as string,
    {
        host: process.env.DB_HOST as string,
        dialect: 'postgres'
    }
)

import "../../models/customer"

db.sync({force:true})