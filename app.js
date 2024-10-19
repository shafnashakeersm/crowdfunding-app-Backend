const Express=require("express")    // Importing the Express framework for building web servers and APIs
const Mongoose=require("mongoose")  // Importing Mongoose, a MongoDB object modeling tool to work with MongoDB databases
const Bcrypt=require("bcrypt")   // Importing Bcrypt, a library for hashing passwords securely
const Cors=require("cors")    // Importing CORS middleware to enable Cross-Origin Resource Sharing, allowing external domains to access the API
const jwt=require("jsonwebtoken")   // Importing jsonwebtoken, a library for generating and verifying JSON Web Tokens (JWT) used for authentication
const userModel = require("./models/users")

let app=Express()   // Creating an Express application instance

app.use(Express.json())
app.use(Cors())

Mongoose.connect("mongodb+srv://shafnashakeersm:Shafna123@cluster0.2srguee.mongodb.net/crowdfundingAppDb?retryWrites=true&w=majority&appName=Cluster0")


//**************************SignUp*****************
app.post("/signUp",async(req,res)=>{
   let input=req.body  //collect input
   let hashedPassword=Bcrypt.hashSync(req.body.password,10)//pass to model with encrypted password
   console.log(hashedPassword)
   req.body.password=hashedPassword  //to store password in req.body
   //cconsole.log(data)   //to display data with only password is hashed
   //res.send(data)    //to send data to check whether it is work or not
   userModel.find({email:req.body.email}).then(
    (items)=>{
        if (items.length>0) {
            res.json({"status":"email id already exist"})
        } else {
            let result=new userModel(input)
            result.save()
            res.json({"status":"success"})
        }
    }
   ).catch((error)=>{})

   
})

// Starting the server on port 3030
app.listen(3030,()=>{
    console.log("server started")
})
