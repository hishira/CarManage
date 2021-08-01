const { isValidObjectId } = require("mongoose");

function valididcheck(req, res, next) {
  if (!isValidObjectId(req.params.id))
    return res.status(406).send({ message: "Invalid id" });
  next();
}
function carintrodatevalid(req, res, next) {
  if (
    new Date(req.body.companyintrodate) > new Date(Date.now()) ||
    new Date(req.body.companyintrodate).getFullYear() < 1970
  )
    return res.status(406).send({
      message: "Invalid intro date into company, must be bettwen 1970 and now",
    });
  next();
}
function caryearvalid(req, res, next) {
  if (
    req.body.year === undefined ||
    req.body.year < 1900 ||
    req.body.year > new Date(Date.now()).getFullYear()
  ) {
    return res.status(406).send({
      message: "Invalid car year",
    });
  }
  next();
}
function actualrun(req, res, next) {
  if (req.body.actualrun === undefined || req.body.actualrun < 0) {
    return res.status(406).send({
      message: "Invalid actual car run",
    });
  }
  next();
}
module.exports = {
  valididcheck,
  carintrodatevalid,
  caryearvalid,
  actualrun
};
