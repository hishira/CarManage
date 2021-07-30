process.env.NODE_ENV = "test";
const app = require("../app");
const chai = require("chai");
const chaihttp = require("chai-http");
const userModel = require("../models/User.model");
const should = chai.should();
const token = { refreshtoken: "" };
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
        .end((err,res)=>{
          res.should.have.status(401);
          res.body.should.have.property("message");
          done();
        })
    });
    it("We can refresh access token with good refresh token",(done)=>{
      chai.request(app).get("/auth/refreshtoken")
      .set({Authorization: `Bearer ${token.refreshtoken}`})
      .end((err,res)=>{
        res.should.have.status(200);
        res.body.should.have.property("accessToken");
        done();
      })
    })
  });
  after(async () => {
    await userModel.deleteMany({});
  });
});
