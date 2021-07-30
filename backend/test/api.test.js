process.env.NODE_ENV = "test";
const app = require("../app");
const chai = require("chai");
const chaihttp = require("chai-http");
const userModel = require("../models/User.model");
const should = chai.should();
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
          done();
        });
    });
  });
  after(async () => {
    await userModel.deleteMany({});
  });
});
