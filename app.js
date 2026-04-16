import express from 'express'
import cors from 'cors'
import { DbConnect } from './config/Db.js'
import { router } from './Router/User.router.js'
import categoryRouter from './Router/catrgory.router.js'
import { config } from 'dotenv'

config()

const PORT = 3000
const app = express()
app.use(cors())
app.use(express.json())

await DbConnect();

app.use("/api/v1/User", router)
app.use("/api/v1/Category", categoryRouter)

app.listen(PORT, () => {
    console.log("Server is running on PORT ", PORT);
})
