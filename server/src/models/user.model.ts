import mongoose from "mongoose";
import { IUser } from "../types/request";
import bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken";
import { config } from "../config/config";

const userSchema = new mongoose.Schema<IUser>({
    fullname: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    resetToken: {
        type: String,
        default: undefined,
    },
    resetTokenExpiry: {
        type: Number,
        default: undefined,
    },
},{ timestamps: true })

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password: string) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullname: this.fullname
        },
        config.accesstokensecret as jwt.Secret,
        { expiresIn: config.accesstokenexpiry } as jwt.SignOptions
    )
}

export const User = mongoose.model<IUser>("User", userSchema)