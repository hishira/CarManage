const userModel = require("../models/User.model");
const { generateTokens, refreshAccessToken } = require("../utils/jwt.utils");
const SERVERERROR = "Server error";
class AuthController {
  static async SignUp(req, res) {
    try {
      let user = await userModel.findOne({ email: req.body.email });
      if (user) {
        return res.status(406).send({ message: "User with that email exists" });
      }
      let newuser = new userModel({
        fullname: req.body.fullname,
        email: req.body.email,
        password: req.body.password,
      });
      await newuser.save().catch((e) => {
        return res.status(406).send({ message: "Incorrect data" });
      });
      return res.status(200).json(generateTokens(newuser));
    } catch (e) {
      return res.status(505).send({ message: SERVERERROR });
    }
  }
  static async Login(req, res) {
    try {
      let tokenorerror;
      await userModel
        .findOne({ email: req.body.email }, (err, obj) => {
          if (err || !obj) tokenorerror = 401;
          else {
            if (obj.comparepasswords(req.body.password))
              tokenorerror = generateTokens(obj.toObject());
            else tokenorerror = 401;
          }
        })
        .select("password");
      if (typeof tokenorerror === "number" || tokenorerror === undefined)
        return res.status(406).send({ message: "User do not exists" });
      return res.status(200).json(tokenorerror);
    } catch (e) {
      return res.status(505).send({ message: SERVERERROR });
    }
  }
  static async RefreshToken(req, res) {
    try {
      let user = await userModel.findById(req.userid);
      let accesstoken = refreshAccessToken(user);
      return res.status(200).json(accesstoken);
    } catch (e) {
      return res.status(505).send({ message: SERVERERROR });
    }
  }
}

module.exports = AuthController;
