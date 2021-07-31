const userModel = require("../models/User.model");
const SERVERERROR = "Server error";
class UserController {
  static async GetUserInfo(req, res) {
    try {
      const user = await userModel.findById(req.userid);
      if (!user)
        return res
          .status(404)
          .send({ message: "User doeas not exists, somethig goes wrong" });
      return res.status(200).json(user);
    } catch (e) {
      return res.status(505).send({ message: SERVERERROR });
    }
  }
}
module.exports = UserController
