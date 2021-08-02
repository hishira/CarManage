const userModel = require("../models/User.model");
const carModel = require("../models/Car.model");
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
  /*Only for test */
  static async DeleteUser(req,res){
    try{
      const usertodele = await userModel.findOne({email: req.body.email})
      if(!usertodele){
        return res.status(406).send({message: "User does not exists"})
      }
      const deleteduser = await userModel.deleteOne({ email: req.body.email });
      return res.status(200).json(deleteduser);
    }catch(e){
      return res.status(505).send({ message: SERVERERROR });

    }
  }
  /*Only for test, cypress */
  static async CreateUserWithCar(req,res,next){
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
      let newcar = new carModel({
        producer: "Ford",
        model: "Fiesta",
        year: 1990,
        companyintrodate: "12-12-1998",
        actualrun: 90,
        user: newuser._id,
      })
      await newcar.save();
      return res.status(200).json(generateTokens(newuser));
    } catch (e) {
      return res.status(505).send({ message: SERVERERROR });
    }
  }
}
module.exports = UserController
