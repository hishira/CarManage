process.env.NODE_ENV = "test";
const app = require("../app");
const chai = require("chai");
const chaihttp = require("chai-http");
const userModel = require("../models/User.model");
const carModel = require("../models/Car.model");
const should = chai.should();
const token = { accesstoken: "", refreshtoken: "" };
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
          password: "123d123",
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
        .send({ email: "mail@mail.com", password: "123d123" })
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
  });
  after(async () => {
    await userModel.deleteMany({});
    await carModel.deleteMany({})
  });
});
