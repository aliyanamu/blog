require("dotenv").config();
let hashPass = require("../helpers/hashPass");

const chai = require("chai"),
  request = require("request"),
  jwt = require("jsonwebtoken"),
  chaiHttp = require("chai-http"),
  app = require("../app"),
  expect = chai.expect,
  User = require("../models/users")
  Article = require("../models/articles"),
  ObjectId = require("mongodb").ObjectId;

chai.use(chaiHttp);

let name = "John Doe",
    email = "johnDOe@mail.co",
    password = "john-123",
    phone = "0011223344"

describe("Article", function() {

  it("/GET articles should return all articles", function(done) {
    chai
      .request(app)
      .get("/articles")
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('articles');
        expect(res.body.articles).to.be.a("array");
        done();
      });
  });
})

describe("Article", function() {

  let usertoken, author, articleId;
  let title = "Testing",
      desc = "",
      category = "",
      commentlist = [];
  
  beforeEach(function(done) {
    User.create({
      name,
      email,
      password,
      phone
    })
      .then(() => {
          User.findOne({
            email,
            password: hashPass(password)
          })
            .then(user => {
              userId = user._id
              jwt.sign({
                userId : userId
              }, process.env.ACCESS_KEY,
                function(err, token) {
                  usertoken = token,
                  author = userId
                  done()
                }
              );
            })
      })
      .catch(err => {
        console.log(err.message)
      })
  });

  it("/POST articles should return new object articles", function(done) {
    chai
      .request(app)
      .post("/articles")
      .set('token', usertoken)
      .send({
        title,
        author,
        desc,
        category,
        commentlist
      })
      .end(function(err, res) {
        articleId = res.body.arts._id
        console.log(res.body)
        expect(res).to.have.status(200);
        expect(res.body).to.be.a("object");
        expect(res.body).to.have.property('arts')
        expect(res.body.arts).to.have.property('title')
        expect(res.body.arts).to.have.property('author')
        expect(res.body.arts.title).to.equal(title)
        done();
      });
  });

  it("/GET articles should return this user's articles", function(done) {
    console.log('see here',author)
    chai
      .request(app)
      .get(`/articles/${author}`)
      .set('token', usertoken)
      .end(function(err, res) {
        console.log(res.body)
        expect(res).to.have.status(200);
        expect(res.body).to.be.a("object");
        done();
      });
  });

  it("/PUT articles should return updated articles", function(done) {
    title = "Testing 2",
    desc = "Fill description for second"
    chai
      .request(app)
      .put(`/articles/${articleId}`)
      .set('token', usertoken)
      .send({
        articleId,
        title,
        author,
        desc,
        category,
        commentlist
      })
      .end(function(err, res) {
        console.log(res.body)
        expect(res).to.have.status(200);
        expect(res.body).to.be.a("object");
        expect(res.body).to.have.property('upd')
        expect(res.body.upd).to.have.property('title')
        expect(res.body.upd).to.have.property('author')
        expect(res.body.upd.title).to.equal(title)
        done();
      });
  });

  it("/DELETE articles should return status deleted articles", function(done) {
    chai
      .request(app)
      .del(`/articles/${articleId}`)
      .set('token', usertoken)
      .end(function(err, res) {
        console.log(res.body)
        expect(res).to.have.status(200);
        expect(res.body).to.be.a("object");
        expect(res.body).to.have.property('message')
        expect(res.body.message).to.equal(`succesfully deleted article`)
        done();
      });
  });

  afterEach(function(done) {
    User.deleteOne({
      email
    })
    .then (() => {
      Article.deleteOne({
        title
      })
      .then (() => {
        done();
      })
    })
    .catch(err => {
      console.log(err.message);
    })
  });
});
