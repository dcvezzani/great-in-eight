// const BASE_URL = 'https://192.168.86.32:3010/api'
const BASE_URL = 'https://great-in-eight.vezzaniphotography.com/api'

const getUserWeekUrlPath = ({userId, weekId}) => {
  return `${getUserUrlPath({userId})}/week/${weekId}`
}

const getUserUrlPath = ({userId}) => {
  return `${BASE_URL}/user/${userId}`
}

exports.saveUserData = (self, callback) => {
  const {userId}  = self.$store.state

  ;(async () => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const weekId = self.currentWeek || '1'
    const url = getUserWeekUrlPath({userId, weekId})
    const myPostRequest = new Request(url, {
      method: 'POST',
      headers: myHeaders,
      mode: 'cors',
      cache: 'default',
        body: JSON.stringify({days: self.days, userId: self.$store.state.userId}) // body data type must match "Content-Type" header
    });

    const data = await fetch(myPostRequest)
    .then(response => response.json())
    .catch(err => {
      console.error(`${err}: ${url}`)
      self.message = `${err}: ${url}`
      return {ok: false}
    })

    if (callback) callback(data)
  })()
}

exports.deleteUserData = (self, callback) => {
  const {userId}  = self.$store.state

  ;(async () => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    /* myHeaders.append('Content-Length', content.length.toString()); */
    /* myHeaders.append('X-Custom-Header', 'ProcessThisImmediately'); */

    // const url = `${BASE_URL}?userId=${self.$store.state.userId}`
    const url = getUserUrlPath({userId})
    const myDeleteRequest = new Request(url, {
      method: 'DELETE',
      headers: myHeaders,
      mode: 'cors',
      cache: 'default',
    });

    const results = await fetch(myDeleteRequest)
    .then(response => response.json())
    .catch(err => {
      console.error(`${err}: ${url}`)
      self.message = `${err}: ${url}`
      self.loaded = true
      return {ok: false}
    })

    if (callback) callback(results)

  })()
}

exports.loadUserData = (self, options={}, callback) => {
  const dayOfWeek = options.dayOfWeek || 'mon'
  const weekId = options.weekId || '1'
  const userId = self.$store.state.userId

  ;(async () => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    /* myHeaders.append('Content-Length', content.length.toString()); */
    /* myHeaders.append('X-Custom-Header', 'ProcessThisImmediately'); */

    // const url = `${BASE_URL}?userId=${self.$store.state.userId}&weekId=${weekId}`
    const url = getUserWeekUrlPath({userId, weekId})
    const myGetRequest = new Request(url, {
      method: 'GET',
      headers: myHeaders,
      mode: 'cors',
      cache: 'default',
    });

    const responsePayload = (
      await fetch(myGetRequest)
      .then(response => response.json())
      .catch(err => {
        console.error(`${err}: ${url}`)
        self.message = `${err}: ${url}`
        self.loaded = true
        return {data: []}
      })
    )

    if (callback) callback(responsePayload)

  })()
}

// exports.loadRulesData = (self, options={}, callback) => {
//   ;(async () => {
//     const myHeaders = new Headers();
//     myHeaders.append('Content-Type', 'application/json');
//     /* myHeaders.append('Content-Length', content.length.toString()); */
//     /* myHeaders.append('X-Custom-Header', 'ProcessThisImmediately'); */

//     const url = `${BASE_URL}/rules`
//     const myGetRequest = new Request(url, {
//       method: 'GET',
//       headers: myHeaders,
//       mode: 'cors',
//       cache: 'default',
//     });

//     const rules = (
//       await fetch(myGetRequest)
//       .then(response => response.json())
//       .catch(err => {
//         console.error(`${err}: ${url}`)
//         self.message = `${err}: ${url}`
//         self.loaded = true
//         return {data: []}
//       })
//     ).rules

//     if (callback) callback(rules)
//   })()
// }

exports.loadNewFormData = (self, options={}, callback) => {
  // const dayOfWeek = options.dayOfWeek || 'mon'
  const weekId = options.weekId || '1'
  // const userId = self.$store.state.userId;

  ;(async () => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    /* myHeaders.append('Content-Length', content.length.toString()); */
    /* myHeaders.append('X-Custom-Header', 'ProcessThisImmediately'); */

    const url = BASE_URL
    const myGetRequest = new Request(url, {
      method: 'GET',
      headers: myHeaders,
      mode: 'cors',
      cache: 'default',
    });

    const responsePayload = (
      await fetch(myGetRequest)
      .then(response => response.json())
      .catch(err => {
        console.error(`${err}: ${url}`)
        self.message = `${err}: ${url}`
        self.loaded = true
        return {data: []}
      })
    )
    // console.log(">>>responsePayload", responsePayload)

    const dailyTemplate = responsePayload.userTemplate

    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    // console.log(">>>dailyTemplate", dailyTemplate)
    // [...new Array(7)]
    let selected = true
    const days = daysOfWeek.map(dayName => {
        let day = JSON.parse(JSON.stringify(dailyTemplate))
        day.find(entry => entry.type === 'weekOfPeriod').value = weekId
        day.find(entry => entry.type === 'dayOfWeek').value = dayName
        day = {name: dayName, selected, data: day}
        selected = false
        return day
    })

    if (callback) callback({ days, rules: responsePayload.rules })
    
  })()
}

