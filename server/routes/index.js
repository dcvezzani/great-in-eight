var express = require('express');
var router = express.Router();
var fs = require('fs');

// const DATA_FILE = '/Users/dcvezzani/personal-projects/great-in-eight/server/data-template.json'
const DATA_FILE = `${process.env.FILE_BASE_PATH}/server/userData/data-template.json`
const SERVER_ROOT_PATH = `${process.env.FILE_BASE_PATH}/server`

const DEFAULT_ID_ARGS = {userId: null, weekId: "1"}

const getUserDataDirPath = (options={}) => {
  const { userId, weekId } = {...DEFAULT_ID_ARGS, ...options}

  if (!userId) return null

  const userDataDir = `${SERVER_ROOT_PATH}/userData/${userId}`
  // console.log(">>>getUserDataDirPath, userDataDir", userDataDir)
  if (!fs.existsSync(userDataDir))
    fs.mkdirSync(userDataDir, { recursive: true })

  return userDataDir
}

const getUserDataFilePath = (options={}) => {
  const { userId, weekId } = {...DEFAULT_ID_ARGS, ...options}

  if (!userId) return null

  const userDataDir = getUserDataDirPath(options)

  const filename = `${userDataDir}/data-${userId}-${weekId}.json`
  // console.log(">>>getUserDataFilePath, filename", filename)
  if (!fs.existsSync(filename)) return null

  // console.log(">>>getUserDataFilePath, filename [2]", filename)
  return filename
}

// get user data
router.get('/user/:userId/week/:weekId', function(req, res, next) {
  const filename = getUserDataFilePath(req.params) || DATA_FILE
  const data = fs.readFileSync(filename).toString()
  console.log(">>>data [1]", req.params, data.slice(0,200))
  res.json({ data: JSON.parse(data) });
});

// save user data
router.post('/user/:userId/week/:weekId', function(req, res, next) {
  const payload = req.body

  const filename = getUserDataFilePath(payload)
  
  fs.writeFileSync(filename, JSON.stringify(payload.days))
  res.json({ ok: true });
});

// delete user data
router.delete('/user/:userId', function(req, res, next) {
  const userDataDirPath = getUserDataDirPath(req.params)
  if (!userDataDirPath || !fs.existsSync(userDataDirPath)) return res.json({ ok: false })

  try {
    console.log(`>>>Deleting user data for: ${userDataDirPath}`)
    fs.rmdirSync(userDataDirPath, {recursive: true, maxRetries: 3, retryDelay: 1000})
    res.json({ ok: true });
  } catch(err) {
    console.error(">>>Unable to remove user's data", err)
    res.json({ ok: false })
  }
});

// get day template
router.get('/', function(req, res, next) {
  let filename = DATA_FILE

  const data = fs.readFileSync(filename).toString()
  console.log(">>>data", data.slice(0,200))
  res.json({ data: JSON.parse(data) });
});





// deprecated
router.post('/', function(req, res, next) {
  const payload = req.body

  const filename = getUserDataFilePath(payload)
  
  fs.writeFileSync(filename, JSON.stringify(payload.days))
  res.json({ ok: true });
});

// deprecated
router.delete('/', function(req, res, next) {
  const userDataDirPath = getUserDataDirPath(req.query)
  if (!userDataDirPath || !fs.existsSync(userDataDirPath)) return res.json({ ok: false })

  try {
    console.log(`>>>Deleting user data for: ${userDataDirPath}`)
    fs.rmdirSync(userDataDirPath, {recursive: true, maxRetries: 3, retryDelay: 1000})
    res.json({ ok: true });
  } catch(err) {
    console.error(">>>Unable to remove user's data", err)
    res.json({ ok: false })
  }
});


module.exports = router;
