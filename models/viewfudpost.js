const Mongoose=require("mongoose")

const fudpostSchema=Mongoose.Schema(
    {
        organisation:{
            type:String,
            required:true
        },
        phone: {
            type: String,
            required: true,  // Validate phone if needed, e.g., regex for phone format
            minlength: 10    // Ensure phone number has a minimum length (for example, 10 digits)
        },
        email: {
            type: String,
            required: true,
            unique: true,  // Email should be unique across users/posts (if applicable)
            match: /.+\@.+\..+/  // Basic email format validation
        },
        address: {
            type: String,
            required: true
        },
        PostedDate: {
            type: Date,
            default: Date.now  // Automatically set the posted date to the current date
        }

    }
)

//conver to model
var fudpostModel=Mongoose.model("viewfudpost",fudpostSchema)
module.exports=fudpostModel