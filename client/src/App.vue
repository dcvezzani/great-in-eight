<template>
  <div id="app">
    <div id="nav">
      <span v-if="$store.getters.isLoggedIn">
        <router-link to="/">Home</router-link> |
      </span>
      <router-link to="/about">About</router-link> |
      <span v-if="$store.getters.isLoggedIn">
        <a href="#logout" onclick="facebookLogout()">Logout</a>
      </span>
      <span v-if="!$store.getters.isLoggedIn">
        <a href="#login" onclick="facebookLogin()">Login</a>
      </span>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  props: {
  },
  methods: {
    setUserId(userId) {
      if (userId) {
        this.$store.commit('setUserId', userId)
      }
    },
    clearUserId() {
      this.$store.commit('clearUserId')
    },
    loginHandler(event) {
      this.setUserId((event.detail || {}).userId)
      this.$router.push('/');
    },
    logoutHandler(event) {
      this.clearUserId()
      this.$router.push('/login');
    },
  },
  mounted() {
    window.addEventListener('login', this.loginHandler);
    window.addEventListener('logout', this.logoutHandler);
    // window.dispatchEvent( new CustomEvent("setUserId", {detail: 'user-id'}) )
    
  },
  beforeDestroy() {
    window.removeEventListener('login', this.loginHandler);
    window.removeEventListener('logout', this.logoutHandler);
  },
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
