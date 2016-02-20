var express = require('express');

var router = express.Router();

router.get('/', function (req,res) {
	res.render('index', { name: "cenas nome" });
});



router.get('/about', function (req, res) {
  res.render('about', {});
});

module.exports = router;