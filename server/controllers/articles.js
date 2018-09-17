const Article = require("../models/articles"),
  ObjectId = require("mongodb").ObjectId;

module.exports = {
  list: (req, res) => {
    console.log('masuk controllers/articles -> list')
    Article.find()
      .populate("commentlist")
      .exec(function(err, articles) {
        if (err) {
          res.status(500).json({
            message: err.message
          });
        } else {
          res.status(200).json({
            articles: articles
          });
        }
      });
  },

  getMyArticle: (req, res) => {
    console.log('masuk controllers/articles -> list my articles')
    Article.find({
      author: req.params.userid
    })
      .populate("author")
      .exec(function(err, data) {
        if (!err) {
          res.status(200).json({
            message: `get all of my articles`,
            data
          });
        } else {
          res.status(500).json({
            message: err.message
          });
        }
      });
  },

  insert: (req, res) => {
    console.log('masuk controllers/articles -> create')
    let arts = new Article({
      // user: req.userId
      title: req.body.title,
      author: req.body.author,
      desc: req.body.desc,
      category: req.body.category,
      commentlist: req.body.commentlist
    });
    arts.save(function(err) {
      if (!err) {
        res.status(200).json({
          message: `succesfully made article`,
          arts
        });
      } else {
        res.status(500).json({
          message: err.message
        });
      }
    });
  },

  update: (req, res) => {
    console.log('masuk controllers/articles -> update')
    const upd = {
      _id: req.body.articleId,
      title: req.body.title,
      author: req.body.author,
      desc: req.body.desc,
      category: req.body.category,
      commentlist: req.body.commentlist
    };
    Article.updateOne({
        _id: req.params.id
      }, upd, function(err) {
        if (!err) {
          res.status(200).json({
            message: `succesfully updated articles`,
            upd
          });
        } else {
          res.status(500).json({
            message: err.message
          });
        }
      }
    );
  },

  remove: (req, res) => {
    console.log('masuk controllers/articles -> delete')
    Article.deleteOne(
      {
        _id: ObjectId(req.params.id)
      },
      function(err) {
        if (!err) {
          res.status(200).json({
            message: `succesfully deleted article`
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
