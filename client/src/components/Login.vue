<template>
  <div class="login">
    <p>You will need to login to a valid Facebook account in order to use this application.</p>
    <p>Click on the 'Login' link above.</p>
    
  </div>
</template>

<script>
export default {
  name: 'Login',
  props: {
  },
  methods: {
    sessionEstablishedHandler() {
      if (this.$store.getters.isLoggedIn) {
      }
        let searchParams = new URLSearchParams(window.location.search);

        if (searchParams.has("redirect")) {
          this.$router.push({ path: `${searchParams.get("redirect")}` });
        } else this.$router.push({ path: "/" });
    }
  },

  mounted() {
    window.addEventListener('sessionEstablished', this.sessionEstablishedHandler);
    // window.dispatchEvent( new CustomEvent("sessionEstablished", {detail: null}) )
    
  },
  beforeDestroy() {
    window.removeEventListener('sessionEstablished', this.sessionEstablishedHandler);
  },
  
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
