const jwt = require("jsonwebtoken");
const { JWT_TOKEN_SECCRET } = require("../utils/secret");
const BEARER = "Bearer";
const ERRORMESSAGE = "Not send token";
const NOTCOMPLETETOKEN = "Token is not complete";
const INVALIDTOKEN = "Token is invalid";
function checkheadAuthorization(req, res, next) {
  return !req.headers.authorization
    ? res.status(401).send({ message: ERRORMESSAGE })
    : next();
}
function checkBearerTokenHeader(req, res, next) {
  const arrayofheader = req.headers.authorization.split(" ");
  return arrayofheader[0] !== BEARER
    ? res.status(401).send({ message: ERRORMESSAGE })
    : next();
}
function accessTokenCheck(req,res,next){
    const authorizationinfo = req.headers.authorization.split(" ");
    jwt.verify(authorizationinfo[1], JWT_TOKEN_SECCRET,(err,decoded)=>{
        if(err){
            return res.status(401).send({message:INVALIDTOKEN})
        }
        req.userid = decoded.userid
        next();
    })
}
function refreshtokenVerify(req,res,next){
    const authinfo = req.headers.authorization.split(" ");
    jwt.verify(authinfo[1],JWT_TOKEN_SECCRET,(err,decoded)=>{
        if(err)
            return res.status(401).send({message: INVALIDTOKEN})
        req.userid = decoded.userid
        next();
    })
}
module.exports = {
    checkheadAuthorization,
    checkBearerTokenHeader,
    accessTokenCheck,
    refreshtokenVerify
}