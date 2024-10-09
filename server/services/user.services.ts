import User from "../models/user.model"
import bcrypt from "bcryptjs"

export const signup = async (fullname: string, email: string, password: string, contact: string) => {
    const user = await User.findOne({ email })
    if (user) {
        return {
            status: 400,
            response: { success: false, message: "User already exists with this email" }
        }
    }
    
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({
        fullname, email, password: hashedPassword, contact: Number(contact)
    })

    const { password: _, ...userWithoutPassword } = newUser.toObject()
    return {
        status: 201,
        response: { success: true, message: "Account created successfully", user: userWithoutPassword }
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

    user.lastLogin = new Date()
    await user.save()

    const { password: _, ...userWithoutPassword } = user.toObject()
    return {
        status: 201,
        response: { success: true, message: "Account created successfully", user: userWithoutPassword }
    }
}