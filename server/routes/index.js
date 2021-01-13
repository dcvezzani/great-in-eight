var express = require('express');
var router = express.Router();
var fs = require('fs');

// const DATA_FILE = '/Users/dcvezzani/personal-projects/great-in-eight/server/data-template.json'
const DATA_FILE = `${process.env.FILE_BASE_PATH}/server/data-template.json`
const DATA_FILE_V2 = `${process.env.FILE_BASE_PATH}/server/data`

/* GET home page. */
router.get('/', function(req, res, next) {
  let filename = DATA_FILE
  if (req.query.userId) {
    const _filename = `${DATA_FILE_V2}-${req.query.userId}.json`
    if (fs.existsSync(_filename)) filename = _filename
  }

  const data = fs.readFileSync(filename).toString()
  console.log(">>>data", req.query, data.slice(0,200))
  res.json({ data: JSON.parse(data) });
});

router.post('/', function(req, res, next) {
  const payload = req.body
  const filename = `${DATA_FILE_V2}-${payload.userId}.json`

  fs.writeFileSync(filename, JSON.stringify(payload.days))
  res.json({ ok: true });
});

router.delete('/', function(req, res, next) {
  const filename = `${DATA_FILE_V2}-${req.query.userId}.json`
  if (!req.query.userId || !fs.existsSync(filename)) return res.json({ ok: false })

  try {
    console.log(`>>>Deleting user data for: ${filename}`)
    fs.unlinkSync(filename)
    res.json({ ok: true });
  } catch(err) {
    console.error(">>>Unable to remove user's data")
    res.json({ ok: false })
  }
});


module.exports = router;
