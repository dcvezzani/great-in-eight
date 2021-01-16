<template>
  <div class="delete-my-data">
    <p>Sorry to see you go.  You're welcome back anytime.</p>

    <p>If you click this button, your data will be removed and cannot be restored.</p>

    <button @click="deleteMyData">Remove my data from this app</button>

    <p v-if="message">{{message}}</p>

  </div>
</template>

<script>
import { deleteUserData } from "../assets/js/requests"

export default {
  name: 'DeleteMyData',
  props: {
    msg: String
  },
  data() {
    return {
      message: null,
    }
  },
  methods: {
    deleteMyData() {
        deleteUserData(this, (results) => {
          console.log(">>>results", results)
          if (results.ok) {
            this.message = "Your data has been succesfully removed from the system.  We hope you come back!"
            setTimeout(() => {
              facebookExpireAccessToken({forwardRequest: '/about'})
              // this.$router.push('/about')
            }, 5000)

          } else {
            this.message = "Sorry; something went wrong.  Please contact the developer and ask him to remove your data or fix this bug!"
          }

          // this.toast((data.ok) ? "Data was successfully saved!" : "Data was not saved")
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
