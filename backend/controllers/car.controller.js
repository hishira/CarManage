const carModel = require("../models/Car.model");
class CarController {
  static async Create(req, res) {
    try {
      if (
        new Date(req.body.companyintrodate) > new Date(Date.now()) ||
        new Date(req.body.companyintrodate).getFullYear() < 1970
      )
        return res
          .status(404)
          .send({
            message:
              "Invalid intro date into company, must be bettwen 1970 and now",
          });
      const newcar = new carModel({
        producer: req.body.producer,
        model: req.body.model,
        year: req.body.year,
        companyintrodate: req.body.companyintrodate,
        actualrun: req.body.actualrun,
        user: req.userid,
      });
      await newcar.save().catch((e) => {
        return res.status(406).send({ message: "Error while adding new car" });
      });
      return res.status(200).json(newcar);
    } catch (e) {
      return res.status(505).send({ message: "Server error" });
    }
  }
  static async Edit(req, res) {
    try {
      let updatedcar = await carModel.findById(req.params.id);
      if (!updatedcar)
        return res.status(406).send({ message: "Car do not exists" });
      let objstat = await carModel
        .findOneAndUpdate(
          { _id: req.params.id },
          {
            $set: {
              producer: req.body.producer
                ? req.body.producer
                : updatedcar.producer,
              model: req.body.model ? req.body.model : updatedcar.model,
              year: req.body.year ? req.body.year : updatedcar.year,
              companyintrodate: req.body.companyintrodate
                ? req.body.companyintrodate
                : updatedcar.companyintrodate,
              actualrun: req.body.actualrun
                ? req.body.actualrun
                : updatedcar.actualrun,
              editdate: Date.now(),
            },
          },
          { new: true, runValidators: true, useFindAndModify: false }
        )
        .then((document) => {
          if (document) {
            return { status: 200, updatedcar: document };
          } else {
            return { status: 406, updatedcar: {} };
          }
        })
        .catch((e) => {
          return res.status(406).send({ message: "Invalid data" });
        });
      return res.status(objstat.status).json(objstat.updatedcar);
    } catch (e) {
      console.log(e);
      return res.status(505).send({ message: "Server error" });
    }
  }
  static async Delete(req, res) {
    try {
      await carModel.deleteOne({ _id: req.params.id }, (err, doc) => {
        if (err || doc.deletedCount === 0)
          return res
            .status(406)
            .send({ message: "Cannot delete car, wrong id or something else" });
        return res.status(200).send({ message: "Car deleted" });
      });
    } catch (e) {
      return res.status(505).send({ message: "Server error" });
    }
  }
  static async GetByUser(req, res) {
    try {
      const cars = await carModel.find({ user: req.userid }).catch((e) => {
        return res.status(406).send({ message: "Error while car fetching" });
      });
      return res.status(200).json(cars);
    } catch (e) {
      return res.status(505).send({ message: "Server error" });
    }
  }
}
module.exports = CarController;
