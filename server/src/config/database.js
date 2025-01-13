import 'dotenv/config'

if (!process.env.MODE)
  console.error('[ERROR] .env not found')

const db_config = {
  host: process.env.db_host,
  user: process.env.db_user,
  password: process.env.db_password,
  database: process.env.db_database
}

export default db_config

