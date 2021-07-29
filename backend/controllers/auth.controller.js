const userModel = require("../models/User.model");
const { generateTokens } = require("../utils/jwt.utils")
export class AuthController {
    static async SignUp(req, res) {
        try {
            let fullname = req.body.name + " " + req.body.lastname
            if (req.body.password === "" || req.body.email === "")
                return res.status(406).send({ message: "Email or password required" })
            let user = new userModel({
                fullname: fullname,
                email: req.body.email,
                password: req.body.password,
            })
            await user.save();
            return res.status(200).send(generateTokens(user))
        } catch (e) {
            return res.status(505).send({ message: "Server error" });
        }
    }
}