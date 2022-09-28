import { header } from "express-validator"

export default [
    header('seed_secret_token').equals(process.env.SEED_SECRET_TOKEN)
]