import { Request, Response } from "express"
import * as userService from "../services/user.services"

export const signup = async (req: Request, res:Response) => {
    try {
        const { fullname, email, password, contact } = req.body
        const result = await userService.signup(fullname, email, password, contact)
        res.status(result.status).json(result.response)
    } catch (error) {
        console.log("Error in signup controller: ", error)
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const result = await userService.login(email, password)
        res.status(result.status).json(result.response)
    } catch (error) {
        console.log("Error in login controller: ", error)
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}