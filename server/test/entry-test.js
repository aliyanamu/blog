require("dotenv").config();
let hashPass = require("../helpers/hashPass");

const chai = require("chai"),
  request = require("request"),
  chaiHttp = require("chai-http"),
  app = require("../app"),
  expect = chai.expect,
  User = require("../models/users"),
  ObjectId = require("mongodb").ObjectId;

chai.use(chaiHttp);

let name = "John Doe",
    email = "johnDOe@mail.co",
    password = "john-123",
    phone = "0011223344"

describe("User", function() {

  it("/POST register should return new object users", function(done) {
    chai
      .request(app)
      .post("/users")
      .send({
        name,
        email,
        password,
        phone
      })
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a("object");
        expect(res.body.user).to.have.property('name')
        expect(res.body.user.name).to.equal(name)
        done();
      });
  });

  afterEach(function(done) {
    User.deleteOne({
      email
    }, function(err) {
      if (!err) {
        done();
      } else {
        console.log(err.message);
      }
    });
  });
});

describe("User", function() {

  beforeEach(function(done) {
    User.create({
      name,
      email,
      password,
      phone
    })
      .then(() => {
          done()
      })
      .catch(err => {
        console.log(err)
      });
  })

  it("/POST login should return token", function(done) {
    chai
      .request(app)
      .post("/users/login")
      .send({
        email,
        password
      })
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a("object");
        expect(res.body).to.have.property('token')
        done();
      });
  });

  afterEach(function(done) {
    User.deleteOne({
      email
    }, function(err) {
      if (!err) {
        done();
      } else {
        console.log(err.message);
      }
    });
  });
});
