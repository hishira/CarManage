const jwt = require("jsonwebtoken")
const ACCESSTOKENTIME = "180s"
const REFRESHTOKENTIME = "300s"
const { JWT_TOKEN_SECCRET } = require("./secret");
function generateaccesstoken(user) {
    return jwt.sign({ userid: user._id, type: "ACCESS_TOKEN" }, JWT_TOKEN_SECCRET, {
        expiresIn: ACCESSTOKENTIME
    })
}
function generaterefreshtoken(user){
    return jwt.sign({userid:user._id,type:"REFRESH_TOKEN"},JWT_TOKEN_SECCRET,{
        expiresIn: REFRESHTOKENTIME
    })
}
function refreshAccessToken(user){
    return  {
        accessToken: generateaccesstoken(user),
    }
}
function generateTokens(user){
    return {
        accessToken: generateaccesstoken(user),
        refreshToken: generaterefreshtoken(user),
    }
}
module.exports = {
    generateaccesstoken,
    generaterefreshtoken,
    refreshAccessToken,
    generateTokens,
}