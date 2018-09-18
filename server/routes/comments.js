const express = require('express'),
    router = express.Router(),
    { isLogin, authdulu } = require("../middlewares/auth"),
    { list, insert, remove } = require('../controllers/comments');

/* GET articles listing. */
router
    .get('/:artid', list)

    .post('/:artid', isLogin, authdulu, insert)

    .delete('/:id', isLogin, authdulu, remove)

module.exports = router;
