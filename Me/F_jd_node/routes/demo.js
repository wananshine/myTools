var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('demo', {
        title: "demojd"
    });
});

module.exports = router;