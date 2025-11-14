import { Response, NextFunction } from "express";
import { asyncHandler } from "../utils/AsyncHandler";
import jwt, { JwtPayload } from "jsonwebtoken"
import { config } from "../config/config";
import { ApiError } from "../utils/ApiError";
import { User } from "../models/user.model";
import { AuthRequest } from "../types/request";


export const verifyJWT = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.replace("Bearer ", "")

        if (!token) {
            throw new ApiError(401, "Unauthorized user")
        }

        const decodedToken = jwt.verify(token, config.accesstokensecret) as JwtPayload

        const user = await User.findById(decodedToken?._id).select("-password")

        if (!user) {
            throw new ApiError(401, "Invalid access token")
        }

        req.user = user
        next()
    } catch (error : any) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }

})