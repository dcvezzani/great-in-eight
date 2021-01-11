var express = require('express');
var router = express.Router();
var fs = require('fs');

const DATA_FILE = '/Users/dcvezzani/personal-projects/great-in-eight/server/data.json'

/* GET home page. */
router.get('/', function(req, res, next) {
  const data = fs.readFileSync(DATA_FILE).toString()
  res.json({ data: JSON.parse(data) });
});

router.post('/', function(req, res, next) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(req.body))
  res.json({ ok: true });
});


module.exports = router;
