const { isValidObjectId } = require("mongoose");

function valididcheck(req,res,next){
    if (!isValidObjectId(req.params.id))
        return res.status(406).send({ message: "Invalid id" });
    next();
}
module.exports = {
    valididcheck,
}