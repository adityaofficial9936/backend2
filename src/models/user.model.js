import mongoose , {Schema}  from "mongoose";

const userSchema = new Schema(
    {
        username:{
            type: String,
            required:true,
            unique: true,
            lowercase: true,
            trim: true,
            index:true,
            //if you want to improve the searching then you just need to treu the index: true and then you can search the username  in the database and it will be faster than normal search beacause it will create the index for the username and then it will be faster to search the username in the database.
        },
        email:{
            type: String,
            required:true,
            unique: true,
            lowercase: true,
            trim: true,
         },
        fullname:{
            type: String,
            required:true,
            
            index:true,
            trim: true,
         },
         avatar:{
            type: String, // cloudanary url
            required: true,
         },
         coverImage:{
            type : String,

         },
         watchHistory:{
             type: Schema.Types.ObjectId,
             ref: "Video"
         },
         password:{
            type:String,
            required:[true, "password is required"],
            minLength: [8, "password must be at least 8 character long"],
            match: [/^(?=.*[!@#$%^&*(),.?":{}|<>_\-+=])/,"Password must contain at least one special character"],
    
            select: false, 
            //it will not return the password when we query the user model and it will not be selected by default when we query the user model,
            // can i set the you have to use the special character at least one 


         },
         refreshToken:{
            type: String,
         },





},{
    timestamps:true, // it is ues to know about the creatAt and updatedAt time of the user model and it will automatically create the createdAt and updatedAt field in the user model and it will automatically update the updatedAt field when we update the user model.
}
)

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
})
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}
userSchema.methods.generateAccessToken = function(){
   return  jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname:this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
   return  jwt.sign(
        {
            _id: this._id,
           
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    )
}
userSchema.methods.generateRefreshTOken = function(){}
export const User = mongoose.model("User", userSchema);
