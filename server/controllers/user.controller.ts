import { Request, Response } from "express"
import * as userService from "../services/user.services"
import { generateToken } from "../utils/generateToken"

export const signup = async (req: Request, res:Response) => {
    try {
        const { fullname, email, password, contact } = req.body
        const result = await userService.signup(fullname, email, password, contact)

        if (result.response.token) {
            res.cookie("token", result.response.token, {
                httpOnly: true,
                sameSite: 'strict',
                maxAge:24*60*60*1000
            })
        }

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
        
        if (result.response.token) {
            res.cookie("token", result.response.token, {
                httpOnly: true,
                sameSite: 'strict',
                maxAge:24*60*60*1000
            })
        }

        res.status(result.status).json(result.response)
    } catch (error) {
        console.log("Error in login controller: ", error)
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}