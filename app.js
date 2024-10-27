const Express = require("express")    // Importing the Express framework for building web servers and APIs
const Mongoose = require("mongoose")  // Importing Mongoose, a MongoDB object modeling tool to work with MongoDB databases
const Bcrypt = require("bcrypt")   // Importing Bcrypt, a library for hashing passwords securely
const Cors = require("cors")    // Importing CORS middleware to enable Cross-Origin Resource Sharing, allowing external domains to access the API
const jwt = require("jsonwebtoken")   // Importing jsonwebtoken, a library for generating and verifying JSON Web Tokens (JWT) used for authentication
const userModel = require("./models/users")
const postModel=require("./models/posts")
const fudpostModel=require("./models/viewfudpost")
const camppostModel = require("./models/camp")
const bodyParser = require("body-parser")
const transModel = require("./models/transaction")

let app = Express()   // Creating an Express application instance

app.use(Express.json())
app.use(Cors())
app.use(bodyParser.json())

Mongoose.connect("mongodb+srv://shafnashakeersm:Shafna123@cluster0.2srguee.mongodb.net/crowdfundingAppDb?retryWrites=true&w=majority&appName=Cluster0")


//**************************SignUp*****************
app.post("/signUp", async (req, res) => {
    let input = req.body  //collect input
    let hashedPassword = Bcrypt.hashSync(req.body.password, 10)//pass to model with encrypted password
    console.log(hashedPassword)
    req.body.password = hashedPassword  //to store password in req.body
    //console.log(data)   //to display data with only password is hashed
    //res.send(data)    //to send data to check whether it is work or not
    userModel.find({ email: req.body.email }).then(
        (items) => {
            if (items.length > 0) {
                res.json({ "status": "email id already exist" })
            } else {
                let result = new userModel(input)
                result.save()
                res.json({ "status": "success" })
            }
        }
    ).catch((error) => { })
})


//**************************SignIn*****************
app.post("/signin", async (req, res) => {
    let result = userModel.find({ email: req.body.email }).then(
        (items) => {
            if (items.length > 0) {
                const passwordValidator = Bcrypt.compareSync(req.body.password, items[0].password)
                if (passwordValidator) {
                    jwt.sign({ email: req.body.email }, "crowdfundingApp", { expiresIn: "1d" },
                        (error, token) => {
                            if (error) {
                                res.json({ "status": "error", "errorMessage": error })
                            } else {
                                res.json({ "status": "success", "token": token, "userId": items[0]._id })
                            }
                        })
                } else {
                    res.json({ "status": "Incorrect password" })
                }

            } else {
                res.json({ "status": "Invalid Email Id" })
            }
        }
    ).catch()
})


//***************************create a post**********
app.post("/create",async(req,res)=>{
    let input=req.body             //passing input through body
    let token=req.headers.token    //passing token through headers
    jwt.verify(token,"crowdfundingApp",async(error,decoded)=>{
        if (decoded && decoded.email) 
            {
                let result=new postModel(input)
                await result.save()
                res.json({"status":"success"})
            }
            else{
                res.json({"status":"Invalid Authentication"})
            }
        })
})


//***************************Viewall med post**********
app.post("/viewmedpost",(req,res)=>{
    let token=req.headers.token
    jwt.verify(token,"crowdfundingApp",(error,decoded)=>{
       if (decoded && decoded.email) {
            postModel.find().then(
                (items)=>{
                    res.json(items)
                }
            ).catch(
                (error)=>{
                    res.json({"status":"error"})
                }
            )
       } else {
        res.json({"status":"Invalid Authentication"})
       }
    })
})

//***************************create a fudpost**********
app.post("/fudpost",async(req,res)=>{
    let input=req.body             //passing input through body
    let token=req.headers.token    //passing token through headers
    jwt.verify(token,"crowdfundingApp",async(error,decoded)=>{
        if (decoded && decoded.email) 
            {
                let result=new fudpostModel(input)
                await result.save()
                res.json({"status":"success"})
            }
            else{
                res.json({"status":"Invalid Authentication"})
            }
        })
})







//***************************Viewall food post**********
app.post("/viewfudpost",(req,res)=>{
    let token=req.headers.token
    jwt.verify(token,"crowdfundingApp",(error,decoded)=>{
       if (decoded && decoded.email) {
            fudpostModel.find().then(
                (items)=>{
                    res.json(items)
                }
            ).catch(
                (error)=>{
                    res.json({"status":"error"})
                }
            )
       } else {
        res.json({"status":"Invalid Authentication"})
       }
    })
})


//***************************create a camppost**********
app.post("/camppost",async(req,res)=>{
    let input=req.body             //passing input through body
    let token=req.headers.token    //passing token through headers
    jwt.verify(token,"crowdfundingApp",async(error,decoded)=>{
        if (decoded && decoded.email) 
            {
                let result=new camppostModel(input)
                await result.save()
                res.json({"status":"success"})
            }
            else{
                res.json({"status":"Invalid Authentication"})
            }
        })
})

//***************************Viewall campeign post**********
app.post("/camp",(req,res)=>{
    let token=req.headers.token
    jwt.verify(token,"crowdfundingApp",(error,decoded)=>{
       if (decoded && decoded.email) {
            camppostModel.find().then(
                (items)=>{
                    res.json(items)
                }
            ).catch(
                (error)=>{
                    res.json({"status":"error"})
                }
            )
       } else {
        res.json({"status":"Invalid Authentication"})
       }
    })
})


//***************************transaction API**********
app.post("/transaction", async (req, res) => {
    const { transactionId, amount, status, description } = req.body;

    const transaction = new transModel({
        transactionId,
        amount,
        status,
        description
    });

    await transaction.save();
    res.json({ message: 'Transaction created', transaction });
});

//**************************fatch all transaction**********
app.get("/transactions", async (req, res) => {
    const transactions = await transModel.find();
    res.json(transactions);
});



// Starting the server on port 3030
app.listen(3030, () => {
    console.log("server started")
})
