const Mongoose = require("mongoose");

const transactionSchema = new Mongoose.Schema({
    transactionId: String,
    amount: Number,
    date: {
         type: Date, default: Date.now
         },
    status: String,
    description: String
});

var transModel = Mongoose.model("transaction", transactionSchema);
module.exports = transModel