function userpasswordcheck(req,res,next){
    if(req.body.password === "" || req.body.password === undefined)
        return res.status(406).send({message: "Enter password"});
    next();
}
function emailcheck(req,res,next){
    if(req.body.email === "" || req.body.email === undefined)
        return res.status(406).send({message: "Enter email"});
    else if(req.body.email.length > 255)
        return res.status(406).send({message: "Email to long"});
    next();
}

module.exports = {
    userpasswordcheck,
    emailcheck,
}