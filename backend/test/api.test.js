process.env.NODE_ENV = "test";
const app = require("../app");
const chai = require("chai");
const chaihttp = require("chai-http");
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
  });
});
