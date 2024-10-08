import express from "express"
import userRoutes from "./user.routes"

const router = express.Router()

router.use("/api/v1/user", userRoutes)

export default router