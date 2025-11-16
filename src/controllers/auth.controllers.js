import { User } from "../models/user.models.js";
import { Apierror } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import {emailVerificationMailgenContent, sendEmail} from "../utils/mail.js"

const generateAccessAndRefreshTokens = async (userId)=>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken=refreshToken
        await user.save({validateBeforeSave:false})
        return {accessToken,refreshToken}
    } catch (error) {
        throw new Apierror
        900,"Something went wrong while generating access token"
    }}



const registerUser = asyncHandler(async (req,res)=>{
    const {email,username,password,role} = req.body

    const existedUser = await User.findOne({
        $or:[{username},{email}]
    })

    if(existedUser){
        throw new Apierror(409,"User with email or username already exists",[])
    }
const user = await User.create({
    email,
    password,
    username,
    isEmailVerified:false
})

const {unHashedToken, hashedToken,tokenExpiry} =  user.generateTemporaryToken()

user.emailVerificationExpiry = hashedToken
user.emailVerificationExpiry=tokenExpiry

await user.save({validateBeforeSave:false})
await sendEmail({
    email:user?.email,
    subject:"please verify your mail",
    mailgenContent:emailVerificationMailgenContent(user.username,`${req.protocol}"//${req.get("host")}/api/v1/users/verify-email/${unHashedToken}`),
})

await User.findById(user._id).select("-password -refreshToken -emailVerificationToken -emailVerificationExpiry",)

if(!createdUser){
    throw new Apierror(500,"Something went wrong while registering a user")
}
return res
.status(201)
.json(new ApiResponse(
    200,{user:createdUser},"User registered  successfully and verification email as been sent on your email  "
))

})

export {registerUser}