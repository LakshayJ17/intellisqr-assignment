import { Request } from "express";
import { Document, Types } from "mongoose";


export interface IUser extends Document {
    id : Types.ObjectId;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
    resetToken : string;
    resetTokenExpiry : number

    isPasswordCorrect(password: string): Promise<boolean>;
    generateAccessToken(): string;
}

export interface AuthRequest extends Request {
    user?: IUser;
}