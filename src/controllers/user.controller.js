import { asyncHandler } from "../../utils/asynchandler.js";
import { User } from "../models/user.model.js";
import {ApiError} from "../../utils/ApiError.js"
import {uploadOnCloudinary} from "../../utils/cloudinary.js"
import { ApiResponse } from "../../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res, next) =>{


    // get user details form the frontend
    // validation- not empty, email format, password length, etc
    // check if user already exist inthe database  , username, email
    // check for images, check for avatar and cover image, if not then set default avatar and cover image
    // upload then cloudnary and get the url of the image and save it in the database , avatar
    // create user object and create entry in db
    // remove password and refresh token from response 
    // check for user creation
    // return res


    const {fullname, email, username, password} = req.body
    console.log("email:", email);
    // if(fullname === ""){
    //     throw new ApiError(400, "fullname is required");
    // }

  if(
    [fullname, email, username, password].some((field)=> field?.trim() === "")

  ){
    throw new ApiError(400, "All field are required");
  }

  const existedUser = User.findOne({
    $or: [{username}, {email}]
  })

  if(existedUser){
    throw new ApiError(409, "User already exist")
  }

const avatarLocalPath =req.files?.avatar[0]?.path;
const coverImageLocalPath = req.files?.coverImage[0]?.path;

if(!avatarLocalPath){
    throw new ApiError(400, "avatar file is required")
}



const avatar = await uploadOnCloudinary(avatarLocalPath);
const coverImage = await uploadOnCloudinary(coverImageLocalPath);

if(!avatar){
    throw new ApiError(400, "avatar file is requirde");
}
    // res.status(200).json({
    //     message: "aditya yadav you are the best developer in the world"
    // })


const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username:username.toLowerCase()

})

const createdUser =User.findById(user._id).select(
    "-password -refreshToken"
)

if(!createdUser){
    throw new ApiError(500, "something went wrong while registering the users");
}
return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered successfully ")
);
});
export {registerUser}; 