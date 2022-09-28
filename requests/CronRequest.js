import { header } from "express-validator"

export default [
    header('cron_secret_token').equals(process.env.CRON_SECRET_TOKEN)
]