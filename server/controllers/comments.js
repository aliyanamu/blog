const Comment = require("../models/comments"),
  ObjectId = require("mongodb").ObjectId;

module.exports = {
  list: (req, res) => {
    console.log('masuk controllers/comments -> list')
    Comment.find()
      .populate("commentlist")
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
  },

  insert: (req, res) => {
    console.log('masuk controllers/comments -> create')
    let commt = new Comment({
      owner: req.body.owner,
      comment: req.body.comment
    });
    commt.save(function(err) {
      if (!err) {
        res.status(200).json({
          message: `succesfully made comment`,
          commt
        });
      } else {
        res.status(500).json({
          message: err.message
        });
      }
    });
  },

  remove: (req, res) => {
    console.log('masuk controllers/comments -> delete')
    Comment.deleteOne(
      {
        _id: ObjectId(req.params.id)
      },
      function(err) {
        if (!err) {
          res.status(200).json({
            message: `succesfully deleted comment`
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
