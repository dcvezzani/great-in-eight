// const BASE_URL = 'https://10.0.0.54:3010/api'
const BASE_URL = 'https://great-in-eight.vezzaniphotography.com/api'

exports.saveUserData = (self, callback) => {
      (async () => {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const myPostRequest = new Request(BASE_URL, {
          method: 'POST',
          headers: myHeaders,
          mode: 'cors',
          cache: 'default',
            body: JSON.stringify({days: self.days, userId: self.$store.state.userId}) // body data type must match "Content-Type" header
        });

        const data = await fetch(myPostRequest)
        .then(response => response.json())
        .catch(err => {
          console.error(err)
          return {ok: false}
        })

        if (callback) callback(data)
      })()
}

exports.deleteUserData = (self, callback) => {
      (async () => {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        /* myHeaders.append('Content-Length', content.length.toString()); */
        /* myHeaders.append('X-Custom-Header', 'ProcessThisImmediately'); */

        const url = `${BASE_URL}?userId=${self.$store.state.userId}`
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

      })()
}

exports.loadUserData = (self, callback) => {
      (async () => {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        /* myHeaders.append('Content-Length', content.length.toString()); */
        /* myHeaders.append('X-Custom-Header', 'ProcessThisImmediately'); */

        const url = `${BASE_URL}?userId=${self.$store.state.userId}`
        const myGetRequest = new Request(url, {
          method: 'GET',
          headers: myHeaders,
          mode: 'cors',
          cache: 'default',
        });

        const days = (
          await fetch(myGetRequest)
          .then(response => response.json())
          .catch(err => {
            console.error(`${err}: ${url}`)
            self.message = `${err}: ${url}`
            self.loaded = true
            return {data: []}
          })
        ).data

        if (callback) callback(days)
  
      })()
}

exports.loadNewFormData = (self, callback) => {
      (async () => {
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

        const dailyTemplate = (
          await fetch(myGetRequest)
          .then(response => response.json())
          .catch(err => {
            console.error(`${err}: ${url}`)
            self.message = `${err}: ${url}`
            self.loaded = true
            return {data: []}
          })
        ).data

        const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        // [...new Array(7)]
        let selected = true
        const days = daysOfWeek.map(dayName => {
            let day = JSON.parse(JSON.stringify(dailyTemplate))
            day.find(entry => entry.type === 'dayOfWeek').value = dayName
            day = {name: dayName, selected, data: day}
            selected = false
            return day
        })

        if (callback) callback(days)
        
      })()
}
