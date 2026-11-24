import { asyncHandler } from "../../utils/asynchandler.js";

const registerUser = asyncHandler(async (req, res, next) =>{
    res.status(200).json({
        message: "aditya yadav you are the best developer in th world"
    })
})

export {registerUser}; 