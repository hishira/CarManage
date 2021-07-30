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
            await user.save().catch(e=>{
                return res.status(406).send({message: "Incorrect data"})
            });
            return res.status(200).send(generateTokens(user))
        } catch (e) {
            return res.status(505).send({ message: "Server error" });
        }
    }
    static async Login(req,res){
        try{
            let tokenorerror;
            await userModel.findOne({email: req.body.email},(err,obj)=>{
                if(err || !obj)
                    tokenorerror = 401;
                else{
                    if(obj.comparepasswords(req.body.password))
                        tokenorerror = generateTokens(obj.toObject())
                    else
                    tokenorerror = 401
                }
            }).select("password");
            if(typeof tokenorerror === "number" || tokenorerror === undefined)
                return res.status(406).send({message: "User do not exists"});
            return res.status(200).json(tokenorerror)
        }catch(e){
            console.log(e);
            return res.status(505).send({message: "Server error"})
        }
    }
}

module.exports = AuthController;