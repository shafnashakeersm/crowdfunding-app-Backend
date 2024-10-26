const Mongoose = require("mongoose");

const postSchema =Mongoose.Schema(
    {
    // userId: {
    //     type: Mongoose.Schema.Types.ObjectId,
    //     ref: "users",   // Links to the 'users' table (foreign key)
    //     required: true  // Ensure that every post is associated with a user
    // },
    name: {
        type: String,
        required: true  // Corrected 'require' to 'required'
    },
    dob: {
        type: String,   // Consider making this a Date if you're dealing with actual date values
        required: true  // Ensure DOB is mandatory
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Others'],  // Enforce valid gender options
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
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
    PostedDate: {
        type: Date,
        default: Date.now  // Automatically set the posted date to the current date
    },
    medhistory: {
        type: String,
        required: false  // Medical history can be optional
    }
});

// Middleware to format 'dob' as 'DD-MM-YYYY'
postSchema.pre('save', function (next) {
    if (this.dob && typeof this.dob === 'string') {
        const [year, month, day] = new Date(this.dob).toISOString().split('T')[0].split('-');
        this.dob = `${day}-${month}-${year}`;
    }
    next();
});

var postModel = Mongoose.model("posts", postSchema);
module.exports = postModel
