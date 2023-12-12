import { Timestamp } from 'mongodb'
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        email:{
            type: String,
            required: true
        },
        name:{
            type: String,
            required: true
        },
        imageURL: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: true
        },
        email_verified: {
            type: Boolean,
            required: true
        },
        auth_time: {
            type: String,
            required: true
        }
    }, {
        timestamps: true
    }
)

const user = mongoose.model("user", userSchema)
export default user
