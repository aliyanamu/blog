const express = require('express'),
    router = express.Router(),
    { isLogin, authdulu } = require("../middlewares/auth"),
    { list, insert, remove, update, getMyArticle } = require('../controllers/articles');

/* GET articles listing. */
router
    .get('/', list)

    .post('/', isLogin, insert)
    
    .get('/:userid', isLogin, getMyArticle)

    .put('/:id', isLogin, authdulu, update)

    .delete('/:id', isLogin, authdulu, remove)

module.exports = router;
