function userpasswordcheck(req, res, next) {
  if (req.body.password === "" || req.body.password === undefined)
    return res.status(406).send({ message: "Enter password" });
  next();
}
function userpasswordsequencecheck(req, res, next) {
  /*Regex add*/
  if (req.body.password.length >= 6) next();
  else
    return res.status(406).send({ message: "Password to short, min 6 char" });
}
function specialcharacter(req, res, next) {
  if (!/(?=.*\W|_)(?=.*\d)/.test(req.body.password)) {
    return res.status(406).send({
      message: "Password must containt at last one number or special character",
    });
  }
  next();
}
function emailcheck(req, res, next) {
  if (req.body.email === "" || req.body.email === undefined)
    return res.status(406).send({ message: "Enter email" });
  next();
}

module.exports = {
  userpasswordcheck,
  emailcheck,
  userpasswordsequencecheck,
  specialcharacter,
};
