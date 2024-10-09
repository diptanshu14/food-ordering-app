import User from "../models/user.model"
import bcrypt from "bcryptjs"
import { generateToken } from "../utils/generateToken"

export const signup = async (fullname: string, email: string, password: string, contact: string) => {
    const user = await User.findOne({ email })
    if (user) {
        return {
            status: 400,
            response: { success: false, message: "User already exists with this email" }
        }
    }
    
    const hashedPassword = await bcrypt.hash(password, 10)
    //const verificationToken = 

    const newUser = await User.create({
        fullname, email, password: hashedPassword, contact: Number(contact)
    })
    const token = generateToken(newUser)

    const { password: _, ...userWithoutPassword } = newUser.toObject()
    return {
        status: 201,
        response: { success: true, message: "Account created successfully", user: userWithoutPassword, token }
    }
}


export const login = async (email: string, password: string) => {
    const user = await User.findOne({ email })
    if (!user) {
        return {
            status: 400,
            response: { success: false, message: "Invalid Credentials" }
        }
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        return {
            status: 400,
            response: { success: false, message: "Invalid Credentials" }
        }
    }

    const token = generateToken(user)
    user.lastLogin = new Date()
    await user.save()

    const { password: _, ...userWithoutPassword } = user.toObject()
    return {
        status: 200,
        response: { success: true, message: "User loged in successfully", user: userWithoutPassword, token }
    }
}