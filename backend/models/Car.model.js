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
        type: number,
        min: 1900,
    },
    companyintrodate: {
        type: Date,
        default: Date.now(),
    },
    actualrun: {
        type: number,
        min: 0,
    },
    createdate: {
        type: Date,
        default: Date.now(),
    },
    editdate: {
        type: Date,
        default: Date.now(),
    }
})
const Car = mongoose.model("Car",carSchema);
module.exports = Car;