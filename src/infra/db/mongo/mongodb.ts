import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config()

const startConnection = async()=>{
    const MONGO_user = process.env.MONGO_USER
    const MONGO_pass = process.env.MONGO_PASS

    await mongoose.connect(`mongodb+srv://${MONGO_user}:${MONGO_pass}@trilhafullture.oiizq4p.mongodb.net/?retryWrites=true&w=majority`)
    console.log("mongo connect")
}
const stopConnection = async()=>{
    await mongoose.disconnect()
    console.log("mongo disconnect")
}
export { startConnection,stopConnection }