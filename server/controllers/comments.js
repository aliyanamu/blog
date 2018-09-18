const Comment = require("../models/comments"),
  Article = require("../models/articles"),
  ObjectId = require("mongodb").ObjectId;

module.exports = {
  list: (req, res) => {
    console.log("masuk controllers/comments -> list");
    Article.findOne({
      _id: ObjectId(req.params.artid)
    })
      .populate("commentlist")
      .exec(function(err, article) {
        if (err) {
          res.status(500).json({
            message: err.message
          });
        } else {
          Comment.find()
            .populate("owner")
            .exec(function(err, comments) {
              if (err) {
                res.status(500).json({
                  message: err.message
                });
              } else {
                res.status(200).json({
                  comments: comments
                });
              }
            });
        }
      });
  },

  insert: (req, res) => {
    console.log("masuk controllers/comments -> create");
    let commt = new Comment({
      owner: req.body.owner,
      comment: req.body.comment
    });
    commt.save(function(err) {
      if (!err) {
        Article.updateOne({
          _id: ObjectId(req.params.artid)
        }, {
          $push: {commentlist: commt._id}
        }, function(err) {
          if (!err) {
            console.log('masuk')
            res.status(200).json({
              message: `succesfully create comment`,
              commt
            });
          } else {
            console.log('masuk else')
            res.status(500).json({
              message: err.message
            });
          }
        })
      } else {
        console.log('masuk else 2')
        res.status(500).json({
          message: err.message
        });
      }
    });
  },

  remove: (req, res) => {
    console.log("masuk controllers/comments -> delete");
    Comment.deleteOne(
      {
        _id: ObjectId(req.params.id)
      },
      function(err) {
        if (!err) {
          res.status(200).json({
            message: `succesfully delete comment`
          });
        } else {
          res.status(500).json({
            message: err.message
          });
        }
      }
    );
  }
};
