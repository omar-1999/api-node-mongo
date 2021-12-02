import { config } from 'dotenv'
config()

export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/dbtest'
export const APP_PORT = process.env.APP_PORT || 9000
export const CONFIG_SECRET = process.env.CONFIG_SECRET || 'CONFIG-SECRET'
export const TOKEN_EXPIRES = process.env.TOKEN_EXPIRES || 3600