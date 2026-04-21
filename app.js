import 'dotenv/config'

import express from 'express'
import cors from 'cors'
import { DbConnect } from './config/Db.js'
import { router } from './Router/User.router.js'
import categoryRouter from './Router/catrgory.router.js'
import subCategoryRouter from './Router/Subcatrgory.router.js'

const PORT = 3000
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

await DbConnect()

app.use("/api/v1/User", router)
app.use("/api/v1/Category", categoryRouter)
app.use("/api/v1/SubCategory", subCategoryRouter)

app.listen(PORT, () => {
    console.log("Server is running on PORT ", PORT);
})