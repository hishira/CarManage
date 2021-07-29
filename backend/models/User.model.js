const mongoose = require('mongoose');
const bcrypt = require("bcryptjs")
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        validate(value){
            if(value.length > 255)
                throw new Error("Error with email")
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    createdate: {
        type: Date,
        default: Date.now()
    }
})

userSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password"))
        user.password = await bcrypt.hash(user.password, 8);
    next();
})
userSchema.methods.comparepasswords = function (password) {
    return bcrypt.compareSync(password, this.password);
}
const User = mongoose.model("User", userSchema)

module.exports = User;