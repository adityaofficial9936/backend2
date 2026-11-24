
const asyncHandler = (requestHandler) => {
   return  (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err))
    }
}

export {asyncHandler};
// in this we use the concept of higher order function and try catch block to handle the error in async function and pass it to the next middleware  
// const asyncHandler = () =>{}
    // const asyncHandler = (func)=>() =>{}
        // const asyncHandler = (func) => async(req,res,next)=>{}
// const  asyncHandler = (fn) =>async (req, res, next)=>{
// try{
//     await fn(req, res, next)
// }
// catch (error){
//     res.status(error.code || 500).json({
//         success: false,
//         message: error.message || "Internal server error"
//     })

// }
// }