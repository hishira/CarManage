const mongoose = require("mongoose");
const carSchema = new mongoose.Schema({
    producer: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        min: 1900,
        required: true,
        validate(value){
            return value <= new Date(Date.now()).getFullYear()
        }
    },
    companyintrodate: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    actualrun: {
        type: Number,
        required: true,
        min: 0,
    },
    createdate: {
        type: Date,
        default: Date.now(),
    },
    editdate: {
        type: Date,
        default: Date.now(),
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
})
const Car = mongoose.model("Car",carSchema);
module.exports = Car;