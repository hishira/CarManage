process.env.NODE_ENV = "test";
const app = require("../app");
const chai = require("chai");
const chaihttp = require("chai-http");
const userModel = require("../models/User.model");
const carModel = require("../models/Car.model");
const should = chai.should();
const token = { accesstoken: "", refreshtoken: "" };
const car = { carid: "" };
chai.use(chaihttp);
describe("API tests", () => {
  before(() => {});
  describe("Auth tests", () => {
    it("We cannot create user without password", (done) => {
      chai
        .request(app)
        .post("/auth/signup")
        .send({ fullname: "Marian Paździoch", email: "mail@mail.com" })
        .end((err, res) => {
          res.should.have.status(406);
          res.body.should.be.an("object");
          res.body.should.have.property("message");
          done();
        });
    });
    it("We cannot create user without email", (done) => {
      chai
        .request(app)
        .post("/auth/signup")
        .send({ fullname: "Marian Paździoch", password: "123123d" })
        .end((err, res) => {
          res.should.have.status(406);
          res.body.should.be.an("object");
          res.body.should.have.property("message");
          done();
        });
    });
    it("Cannot create user with short password", (done) => {
      chai
        .request(app)
        .post("/auth/signup")
        .send({
          fullname: "Marian Paździoch",
          password: "123d",
          email: "mail@mail.com",
        })
        .end((err, res) => {
          res.should.have.status(406);
          res.body.should.be.an("object");
          res.body.should.have.property("message");
          done();
        });
    });
    it("Can create user if evrything is ok", (done) => {
      chai
        .request(app)
        .post("/auth/signup")
        .send({
          fullname: "Marian Paździoch",
          password: "123d123#",
          email: "mail@mail.com",
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("accessToken");
          res.body.should.have.property("refreshToken");
          done();
        });
    });
    it("We cannot login with wrong creditionals", (done) => {
      chai
        .request(app)
        .post("/auth/login")
        .send({ email: "2@2.com", password: "123123" })
        .end((err, res) => {
          res.should.have.status(406);
          done();
        });
    });
    it("We can login with good creditionals", (done) => {
      chai
        .request(app)
        .post("/auth/login")
        .send({ email: "mail@mail.com", password: "123d123#" })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("accessToken");
          token.accesstoken = res.body.accessToken;
          token.refreshtoken = res.body.refreshToken;
          res.body.should.have.property("refreshToken");
          done();
        });
    });
    it("We cannot refresh access token with wrong refreshtoken", (done) => {
      chai
        .request(app)
        .get("/auth/refreshtoken")
        .set({ Authorization: "Bearer 123j123j1kl2j31kl2j3d" })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property("message");
          done();
        });
    });
    it("We can refresh access token with good refresh token", (done) => {
      chai
        .request(app)
        .get("/auth/refreshtoken")
        .set({ Authorization: `Bearer ${token.refreshtoken}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("accessToken");
          done();
        });
    });
  });
  describe("Car tests", () => {
    describe("Car add", () => {
      it("We cannot create car if we are unauthorized", (done) => {
        chai
          .request(app)
          .post("/car/create")
          .send({
            producer: "Ford",
            model: "Mustang",
            year: 2000,
            companyintrodate: "12-12-21",
            actualrun: 123,
          })
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.have.property("message");
            done();
          });
      });
      it("We cannot authorize withour Bearer", (done) => {
        chai
          .request(app)
          .post("/car/create")
          .set({ Authorization: `${token.refreshtoken}` })
          .send({
            producer: "Ford",
            model: "Mustang",
            year: 2000,
            companyintrodate: "12-12-21",
            actualrun: 123,
          })
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.have.property("message");
            done();
          });
      });
      it("We cannot authorize with wrong token", (done) => {
        chai
          .request(app)
          .post("/car/create")
          .set({ Authorization: `Bearer 12h12kj3123j1h2k3jhk23` })
          .send({
            producer: "Ford",
            model: "Mustang",
            year: 2000,
            companyintrodate: "12-12-21",
            actualrun: 123,
          })
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.have.property("message");
            done();
          });
      });
      it("We cannot add car without producer", (done) => {
        chai
          .request(app)
          .post("/car/create")
          .set({ Authorization: `Bearer ${token.accesstoken}` })
          .send({
            model: "Mustang",
            year: 2000,
            companyintrodate: "12-12-21",
            actualrun: 123,
          })
          .end((err, res) => {
            res.should.have.status(406);
            res.body.should.have.property("message");
            done();
          });
      });
      it("We cannot add car without model", (done) => {
        chai
          .request(app)
          .post("/car/create")
          .set({ Authorization: `Bearer ${token.accesstoken}` })
          .send({
            producer: "Ford",
            year: 2000,
            companyintrodate: "12-12-21",
            actualrun: 123,
          })
          .end((err, res) => {
            res.should.have.status(406);
            res.body.should.have.property("message");
            done();
          });
      });
      it("We cannot add car without year", (done) => {
        chai
          .request(app)
          .post("/car/create")
          .set({ Authorization: `Bearer ${token.accesstoken}` })
          .send({
            producer: "Ford",
            model: "Mustang",
            companyintrodate: "12-12-21",
            actualrun: 123,
          })
          .end((err, res) => {
            res.should.have.status(406);
            res.body.should.have.property("message");
            done();
          });
      });
      it("We cannot add car without actual run", (done) => {
        chai
          .request(app)
          .post("/car/create")
          .set({ Authorization: `Bearer ${token.accesstoken}` })
          .send({
            producer: "Ford",
            model: "Mustang",
            year: 1996,
            companyintrodate: "12-12-21",
          })
          .end((err, res) => {
            res.should.have.status(406);
            res.body.should.have.property("message");
            done();
          });
      });
      it("We cannot create car if actual run is less than 0", (done) => {
        chai
          .request(app)
          .post("/car/create")
          .set({ Authorization: `Bearer ${token.accesstoken}` })
          .send({
            producer: "Ford",
            model: "Mustang",
            year: 1996,
            companyintrodate: new Date(Date.parse("Aug 9, 1995")),
            actualrun: -20,
          })
          .end((err, res) => {
            res.should.have.status(406);
            res.body.should.have.property("message");
            done();
          });
      });
      it("We cannot create car if car year is more than actual year ", (done) => {
        chai
          .request(app)
          .post("/car/create")
          .set({ Authorization: `Bearer ${token.accesstoken}` })
          .send({
            producer: "Ford",
            model: "Mustang",
            year: 2300,
            companyintrodate: new Date(Date.parse("Aug 9, 1995")),
            actualrun: -20,
          })
          .end((err, res) => {
            res.should.have.status(406);
            res.body.should.have.property("message");
            done();
          });
      });
      it("We cannot create car if car year is less than 1900 ", (done) => {
        chai
          .request(app)
          .post("/car/create")
          .set({ Authorization: `Bearer ${token.accesstoken}` })
          .send({
            producer: "Ford",
            model: "Mustang",
            year: 1899,
            companyintrodate: new Date(Date.parse("Aug 9, 1995")),
            actualrun: -20,
          })
          .end((err, res) => {
            res.should.have.status(406);
            res.body.should.have.property("message");
            done();
          });
      });
      it("We can add car if everything is ok", (done) => {
        chai
          .request(app)
          .post("/car/create")
          .set({ Authorization: `Bearer ${token.accesstoken}` })
          .send({
            producer: "Ford",
            model: "Mustang",
            year: 1996,
            companyintrodate: new Date(Date.parse("Aug 9, 1995")),
            actualrun: 20,
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("_id");
            car.carid = res.body._id;
            res.body.should.have.property("producer");
            res.body.should.have.property("model");
            res.body.should.have.property("actualrun");
            res.body.should.have.property("year");
            res.body.should.have.property("companyintrodate");
            res.body.should.have.property("createdate");
            res.body.should.have.property("editdate");
            done();
          });
      });
    });
    describe("Car modify", () => {
      it("We cannot edit car if we are unauthorized", (done) => {
        chai
          .request(app)
          .put(`/car/edit/${car.carid}`)
          .send({
            producer: "Ford",
            model: "Mustang",
            year: 2000,
            companyintrodate: "12-12-21",
            actualrun: 123,
          })
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.have.property("message");
            done();
          });
      });
      it("We cannot authorize withour Bearer", (done) => {
        chai
          .request(app)
          .put(`/car/edit/${car.carid}`)
          .set({ Authorization: `${token.refreshtoken}` })
          .send({
            producer: "Ford",
            model: "Mustang",
            year: 2000,
            companyintrodate: "12-12-21",
            actualrun: 123,
          })
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.have.property("message");
            done();
          });
      });
      it("We cannot authorize with wrong token", (done) => {
        chai
          .request(app)
          .put(`/car/edit/${car.carid}`)
          .set({ Authorization: `Bearer 12h12kj3123j1h2k3jhk23` })
          .send({
            producer: "Ford",
            model: "Mustang",
            year: 2000,
            companyintrodate: "12-12-21",
            actualrun: 123,
          })
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.have.property("message");
            done();
          });
      });
      it("We cannot edit car witch not exists", (done) => {
        chai
          .request(app)
          .put(`/car/edit/j1l23j1kl23jlk12j3`)
          .set({ Authorization: `Bearer ${token.accesstoken}` })
          .send({
            model: "Mustang",
            year: 2000,
            companyintrodate: "12-12-21",
            actualrun: 123,
          })
          .end((err, res) => {
            res.should.have.status(406);
            res.body.should.have.property("message");
            done();
          });
      });
      it("We cannot edit car witch year less than 1900 ", (done) => {
        chai
          .request(app)
          .put(`/car/edit/${car.carid}`)
          .set({ Authorization: `Bearer ${token.accesstoken}` })
          .send({
            model: "Mustang",
            year: 1897,
            companyintrodate: "12-12-21",
            actualrun: 123,
          })
          .end((err, res) => {
            res.should.have.status(406);
            res.body.should.have.property("message");
            done();
          });
      });
      it("We cannot edit car witch year bigger than current ", (done) => {
        chai
          .request(app)
          .put(`/car/edit/${car.carid}`)
          .set({ Authorization: `Bearer ${token.accesstoken}` })
          .send({
            model: "Mustang",
            year: 2120,
            companyintrodate: "12-12-21",
            actualrun: 123,
          })
          .end((err, res) => {
            res.should.have.status(406);
            res.body.should.have.property("message");
            done();
          });
      });
      it("We cannot edit car witch actual run less than 0", (done) => {
        chai
          .request(app)
          .put(`/car/edit/${car.carid}`)
          .set({ Authorization: `Bearer ${token.accesstoken}` })
          .send({
            model: "Mustang",
            year: 2012,
            companyintrodate: "12-12-21",
            actualrun: -123,
          })
          .end((err, res) => {
            res.should.have.status(406);
            res.body.should.have.property("message");
            done();
          });
      });
      it("We can edit car witch when everything is ok", (done) => {
        chai
          .request(app)
          .put(`/car/edit/${car.carid}`)
          .set({ Authorization: `Bearer ${token.accesstoken}` })
          .send({
            model: "Mustang",
            year: 2012,
            companyintrodate: "12-12-21",
            actualrun: 123,
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("_id");
            res.body.should.have.property("producer");
            res.body.should.have.property("model");
            res.body.should.have.property("actualrun");
            res.body.should.have.property("year");
            res.body.should.have.property("companyintrodate");
            res.body.should.have.property("createdate");
            res.body.should.have.property("editdate");
            done();
          });
      });
    });
    describe("Car delete", () => {
      it("We cannot delete car if we are unauthorized", (done) => {
        chai
          .request(app)
          .delete(`/car/delete/${car.carid}`)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.have.property("message");
            done();
          });
      });
      it("We cannot authorize withour Bearer", (done) => {
        chai
          .request(app)
          .delete(`/car/delete/${car.carid}`)
          .set({ Authorization: `${token.refreshtoken}` })
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.have.property("message");
            done();
          });
      });
      it("We cannot authorize with wrong token", (done) => {
        chai
          .request(app)
          .delete(`/car/delete/${car.carid}`)
          .set({ Authorization: `Bearer 12h12kj3123j1h2k3jhk23` })
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.have.property("message");
            done();
          });
      });
      it("We cannot delete car with invalid _id", (done) => {
        chai
          .request(app)
          .delete(`/car/delete/j1l23j1kl23jlk12j3`)
          .set({ Authorization: `Bearer ${token.accesstoken}` })
          .end((err, res) => {
            res.should.have.status(406);
            res.body.should.have.property("message");
            done();
          });
      });
      it("We can delete car if evrything is ok", (done) => {
        chai
          .request(app)
          .delete(`/car/delete/${car.carid}`)
          .set({ Authorization: `Bearer ${token.accesstoken}` })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("message");
            done();
          });
      });
    });
    describe("Car get by user",()=>{
      it("We cannot get cars if we are unauthorized", (done) => {
        chai
          .request(app)
          .get(`/car/cars`)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.have.property("message");
            done();
          });
      });
      it("We cannot authorize withour Bearer", (done) => {
        chai
          .request(app)
          .get(`/car/cars`)
          .set({ Authorization: `${token.refreshtoken}` })
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.have.property("message");
            done();
          });
      });
      it("We cannot authorize with wrong token", (done) => {
        chai
          .request(app)
          .get(`/car/cars`)
          .set({ Authorization: `Bearer 12h12kj3123j1h2k3jhk23` })
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.have.property("message");
            done();
          });
      });
      it("We can get cars if everything is ok", (done) => {
        chai
          .request(app)
          .get(`/car/cars`)
          .set({ Authorization: `Bearer ${token.accesstoken}` })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an("array");
            done();
          });
      });
    })
  });
  after(async () => {
    await userModel.deleteMany({});
    await carModel.deleteMany({});
  });
});
