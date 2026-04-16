import express from 'express'
import { DbConnect } from './DB/Db.js'
import { router } from './Router/User.router.js'
import { config } from 'dotenv'

config()

const PORT = 3000
const app = express()
app.use(express.json())

await DbConnect();

app.use("/api/v1/User", router)

app.listen(PORT, () => {
    console.log("Server is running on PORT ", PORT);
})
