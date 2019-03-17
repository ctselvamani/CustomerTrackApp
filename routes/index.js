var express = require('express');
var router = express.Router();

/* GET home page. */
// GET home page.
router.get('/', function(req, res) {
  res.redirect('/customertrack');
});

module.exports = router;
