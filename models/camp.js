const Mongoose=require("mongoose")

const camppostSchema=Mongoose.Schema(
    {
        campname:{
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
        place: {
            type: String,
            required: true
        },
        mode: {
            type: String,
            required: true
        },
        purpose: {
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
var camppostModel=Mongoose.model("camp",camppostSchema)
module.exports=camppostModel