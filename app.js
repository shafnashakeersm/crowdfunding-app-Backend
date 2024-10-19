const Express=require("express")    // Importing the Express framework for building web servers and APIs
const Mongoose=require("mongoose")  // Importing Mongoose, a MongoDB object modeling tool to work with MongoDB databases
const Bcrypt=require("bcrypt")   // Importing Bcrypt, a library for hashing passwords securely
const Cors=require("cors")    // Importing CORS middleware to enable Cross-Origin Resource Sharing, allowing external domains to access the API
const jwt=require("jsonwebtoken")   // Importing jsonwebtoken, a library for generating and verifying JSON Web Tokens (JWT) used for authentication

let app=Express()   // Creating an Express application instance

app.post("/",(req,res)=>{
    res.send("hello")
})

// Starting the server on port 3030
app.listen(3030,()=>{
    console.log("server started")
})
