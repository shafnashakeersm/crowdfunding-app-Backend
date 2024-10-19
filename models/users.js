const Mongoose=require("mongoose")

const userSchema=Mongoose.Schema(
    {
        name:{
            type:String,
            require:true
        },
        email:{
            type:String,
            require:true
        },
        phone:String,
        dob:String,
        gender:String,
        address:String,
        city:String,
        password:{
            type:String,
            required:true
        }

    }
)

//conver to model
var userModel=Mongoose.model("users",userSchema)
module.exports=userModel