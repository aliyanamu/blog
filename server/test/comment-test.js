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
  Comment = require("../models/comments"),
  ObjectId = require("mongodb").ObjectId;

chai.use(chaiHttp);

let name = "John Doe",
    email = "johnDOe@mail.co",
    password = "john-123",
    phone = "0011223344"

describe("Comment", function() {

  let usertoken, author = '' , articleId = '', owner = '', commentId = '';
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
                  if (token) {
                  usertoken = token,
                  author = String(userId)
                  owner = String(userId)

                  let arts = new Article({
                    title,
                    author,
                    desc,
                    category,
                    commentlist
                  })
                  arts.save((err, arts) => {
                    if (arts) {
                      articleId = arts._id
                      done();
                    }
                    else console.log(err)
                  })
                } else console.log(err)
              });
            })
      })
      .catch(err => {
        console.log(err.message)
      })
  });

  it("/GET comments should return all comments", function(done) {
    chai
      .request(app)
      .get(`/comments/${articleId}`)
      .end(function(err, res) {
        // console.log(res.body)
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('comments');
        expect(res.body.comments).to.be.a("array");
        done();
      });
  });
  
  it("/POST comments should return new object comments", function(done) {
    chai
      .request(app)
      .post(`/comments/${articleId}`)
      .set('token', usertoken)
      .send({
        owner : userId,
        comment : "this is my first comment"
      })
      .end(function(err, res) {
        // console.log(res.body)
        expect(res).to.have.status(200);
        expect(res.body).to.be.a("object");
        expect(res.body).to.have.property('commt')
        expect(res.body.commt).to.have.property('comment')
        expect(res.body.commt).to.have.property('owner')
        expect(res.body.commt.owner).to.equal(owner)
        done();
      });
  });

  it("/DELETE articles should return status deleted comments", function(done) {
    let comment = new Comment({
      owner : userId,
      comment : "this is my first comment"
    })
    comment.save((err, comment) => {
      chai
      .request(app)
      .del(`/comments/${comment._id}`)
      .set('token', usertoken)
      .end(function(err, res) {
        // console.log(res.body)
        expect(res).to.have.status(200);
        expect(res.body).to.be.a("object");
        expect(res.body).to.have.property('message')
        expect(res.body.message).to.equal(`succesfully delete comment`)
        done();
      });
    })
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
