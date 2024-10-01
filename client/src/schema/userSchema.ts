import { z } from "zod"

export const userSignupSchema = z.object({
    fullname: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be of at least 8 characters"),
    contact: z.string().min(10, "Contact number should be of at least 10 digit").max(10, "Contact number should be at most 10 digit"),
})

export type SignupInputState = z.infer<typeof userSignupSchema>

export const userLoginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be of at least 8 characters"),
})

export type LoginInputState = z.infer<typeof userLoginSchema>