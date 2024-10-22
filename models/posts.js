const Mongoose=require("mongoose")


const postSchema=Mongoose.Schema(
    {
        userId:{
            type:Mongoose.Schema.Types.ObjectId,
            ref:"users"
        },
        name:{
            type:String,
            require:true
        },
        dob:String,
        gender:String,
        address:String,
        city:String,
        phone:String,
        email:{
            type:String,
            require:true
        },
        PostedDate:{
            type:Date,
            default:Date.now
        },
        medhistory:String
    }
)

var postModel=Mongoose.model("posts",postSchema)
module.exports=postModel