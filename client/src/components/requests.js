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

        callback(data)
      })()
  
}
