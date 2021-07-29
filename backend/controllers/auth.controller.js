const userModel = require("../models/User.model");
const { generateTokens } = require("../utils/jwt.utils")
class AuthController {
    static async SignUp(req, res) {
        try {
            let user = new userModel({
                fullname: req.body.fullname,
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

module.exports = AuthController;