import mongoose from "mongoose"

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI as string)
        console.log("Server is connected to database")
    } catch (error) {
        console.log(error)
    }
}

export default connectDB