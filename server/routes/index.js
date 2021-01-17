var express = require('express');
var router = express.Router();
var fs = require('fs');
var { parseRules } = require('../rules');
var { getUserTemplate, applyUserTemplate } = require('../user-template');

// const DATA_FILE = '/Users/dcvezzani/personal-projects/great-in-eight/server/data-template.json'
const DATA_FILE = `${process.env.FILE_BASE_PATH}/server/data-template.json`
const SERVER_ROOT_PATH = `${process.env.FILE_BASE_PATH}/server`

const DEFAULT_ID_ARGS = {userId: null, weekId: "1", force: false}

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
  const { userId, weekId, force } = {...DEFAULT_ID_ARGS, ...options}

  if (!userId) return null

  const userDataDir = getUserDataDirPath(options)
  // console.log(">>>userDataDir, ", userDataDir, { userId, weekId, force })

  const filename = `${userDataDir}/data-${userId}-${weekId}.json`
  // console.log(">>>getUserDataFilePath, filename", filename)
  if (!force && !fs.existsSync(filename)) return null

  // console.log(">>>getUserDataFilePath, filename [2]", filename)
  return filename
}

// get user data
router.get('/user/:userId/week/:weekId', function(req, res, next) {
  let filename = getUserDataFilePath(req.params)
  let userDataExists = true

  if (!filename) {
    userDataExists = false
    filename = DATA_FILE
  }

  const data = fs.readFileSync(filename).toString()
  console.log(">>>data [1]", req.params, data.slice(0,200))

  const { rules } = getRules()
  let userData = JSON.parse(data)
  
  if (userDataExists) {
    const _templateData = fs.readFileSync(DATA_FILE).toString()
    const templateData = JSON.parse(_templateData)

    userData = applyUserTemplate(templateData, userData)
  }
  
  res.json({ data: userData, rules });
});

// save user data
router.post('/user/:userId/week/:weekId', function(req, res, next) {
  const payload = req.body

  const filename = getUserDataFilePath({...req.params, force: true})
  // console.log(">>>filename", filename, req.params)
  // return res.json({ ok: true });
  
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

// get rules
router.get('/rules', function(req, res, next) {
  const rules = getRules()
  res.json(rules);
});

// get day template
router.get('/', function(req, res, next) {
  let filename = DATA_FILE

  const data = fs.readFileSync(filename).toString()
  console.log(">>>data", data.slice(0,200))

  const userTemplate = getUserTemplate(JSON.parse(data))
  console.log(">>>userTemplate", JSON.stringify(userTemplate).slice(0,200))

  const { rules } = getRules()
  
  res.json({userTemplate: userTemplate, rules});
});

const getRules = () => {
  let filename = DATA_FILE

  const data = fs.readFileSync(filename).toString()
  console.log(">>>data", data.slice(0,200))

  const rules = parseRules(JSON.parse(data))
  console.log(">>>rules", JSON.stringify(rules).slice(0,200))
  return rules
}

module.exports = router;
