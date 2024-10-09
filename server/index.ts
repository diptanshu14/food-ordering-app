import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import cors from "cors"

import connectDB from "./config/database"
import router from "./routes/routes"

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))

app.use(router)

app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running on port ${PORT}`)
})