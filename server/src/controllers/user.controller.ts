import { Response } from "express";
import { User } from "../models/user.model";
import { AuthRequest } from "../types/request";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/AsyncHandler";
import crypto from "crypto"

const registerUser = asyncHandler(async (req: AuthRequest, res: Response) => {
    // take user input -> validate -> check if user already exists -> store user in db -> Fetch user w/o password , generate token -> return user and token

    const { email, password } = req.body

    if ([ email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    if (!(password.length > 6 && password.length < 20)){
        throw new ApiError(400, "Password must be between length 6 and 20")
    }
    
    const existingUser = await User.findOne({ email })

    if (existingUser) {
        throw new ApiError(409, "User with same email or username already exists")
    }

    const user = await User.create({
        email,
        password,
    })

    const token = user.generateAccessToken()

    const createdUser = await User.findById(user._id).select("-password")

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while creating user")
    }

    return res.status(200)
        .json(new ApiResponse(200, { createdUser, token }, "User created successfully"))
})

const loginUser = asyncHandler(async (req: AuthRequest, res: Response) => {
    // get user details -> validate -> match password -> generate tokens -> send response

    const { email, password } = req.body

    if (!password || !email) {
        throw new ApiError(400, "email and password is required")
    }

    const user = await User.findOne({
        email
    })

    if (!user) {
        throw new ApiError(404, "User not found")
    }
    const isPasswordValid = await user?.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "Credentials are not correct")
    }

    const token = user.generateAccessToken()

    const loggedInUser = await User.findById(user._id).select("-password")

    if (!loggedInUser) {
        throw new ApiError(500, "Something went wrong while fetching user")
    }


    return res.status(200)
        .json(new ApiResponse(200, { loggedInUser, token }, "User logged in successfully"))
})


const forgotPassword = asyncHandler(async (req, res) => {

    // User sends email with forgot password request 
    // Generate raw token and hashed the token 
    // Store hashed token into db and send raw token in response 
    // User clicks link and writes new password and raw token is also sent back
    // BE hash token and validated and updates password 

    const { email } = req.body

    if (!email) {
        throw new ApiError(400, "Email is required")
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const resetToken = crypto.randomBytes(32).toString("hex")

    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex")

    user.resetToken = hashedToken
    user.resetTokenExpiry = Date.now() + 1000 * 60 * 60

    await user.save({ validateBeforeSave: false })

    return res.status(200).json(
        new ApiResponse(200, { resetToken }, "Password reset token generated")
    );
})

export { registerUser, loginUser, forgotPassword }