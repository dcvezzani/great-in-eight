<template>
  <div class="great-to-eight" v-if="loaded">
<!-- <div class="navbar"> -->
<!--   <a href="#home">Home</a> -->
<!--   <a href="#news">News</a> -->
<!--   <a href="#contact">Contact</a> -->
<!-- </div> -->

    <div class="header">
      <tabs>
        <tab v-for="day in days" :key="day.name" :name="day.name" :selected="day.selected" :click="() => loadDayTally(day.name)">
        </tab>
      </tabs>

      <div class="info">
        <ul>
          <li><div>Points for the week: {{totalPoints}}</div></li>
          <li><div>{{currentDay}}: {{totalPointsForCurrentDay}}</div></li>
          <li><button @click="save">Save</button></li>
        </ul>
      </div>
    </div>
      
    <div class="content-pane">
      <div>{{message}}</div>

      <DayTally :data="payload" v-if="payload"></DayTally>
    </div>

    <div class="info page-footer">
      <ul>
        <li><div></div></li>
        <li><div></div></li>
        <li>
          <select id="pageFooterActions" name="pageFooterActions">
            <option value="do-nothing">- Select action -</option>
            <option value="reset-page">Reset day from last save</option>
            <option value="reset-page">Reset week from last save</option>
            <option value="reset-page">Reset day as new</option>
            <option value="reset-week">Reset week as new</option>
          </select>
          <button>Reset</button>
        </li>
      </ul>
    </div>
    
  </div>
</template>

<script>

import DayTally from './DayTally.vue'
import { calculateWeeklyPoints, calculatePoints } from "../assets/js/points-calculator"
const BASE_URL = 'http://10.0.0.54:3010'

const registerStickyHeader = () => {

  // Get the header
  var header = document.querySelector(".header");

  console.log(">>>header", header)

  // Get the offset position of the navbar
  var sticky = header.offsetTop;

  // Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
  function myFunction() {
    if (window.pageYOffset > sticky) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  }

  // When the user scrolls the page, execute myFunction
  window.onscroll = function() {myFunction()};
}

export default {
  name: 'GreatToEight',
  components: {
    DayTally,
  },
  props: {
    msg: String
  },
  computed: {
    totalPoints() {
      return calculateWeeklyPoints(this.days)
    },
    totalPointsForCurrentDay() {
      return calculatePoints(this.payload)
    },
    currentDay() {
      const dayOfWeek = this.payload.find(entry => entry.name === 'dayOfWeek')
      return (dayOfWeek) ? dayOfWeek.value : null
    },
  },
  data() {
    return {
      payload: [], 
      message: '',
      days: [
        {name: "Mon", selected: true},
        {name: "Tue", selected: false},
        {name: "Wed", selected: false},
        {name: "Thu", selected: false},
        {name: "Fri", selected: false},
        {name: "Sat", selected: false},
        {name: "Sun", selected: false},
      ],
      loaded: false,
    }
  },
  methods: {
    toast(message) {
      this.message = message
      console.log(">>>toast, message", message)
      setTimeout(() => { this.message = null }, 3000)
    },
    save() {
      (async () => {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const myPostRequest = new Request(BASE_URL, {
          method: 'POST',
          headers: myHeaders,
          mode: 'cors',
          cache: 'default',
          body: JSON.stringify(this.days) // body data type must match "Content-Type" header
        });

        const data = await fetch(myPostRequest)
        .then(response => response.json())
        .catch(err => {
          console.error(err)
          return {ok: false}
        })
        this.toast((data.ok) ? "Data was successfully saved!" : "Data was not saved")
      })()
    },
    loadDayTally(theDay) {
      this.payload = this.days.find(day => day.name === theDay).data
      this.payload.find(entry => entry.name === 'dayOfWeek').value = theDay
      

      setTimeout(() => {
        const dailyTally = document.querySelector('#day-tally')
        dailyTally.dispatchEvent( new CustomEvent("load") )
      }, 150)
    }
  },
  mounted() {
    (async () => {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      /* myHeaders.append('Content-Length', content.length.toString()); */
      /* myHeaders.append('X-Custom-Header', 'ProcessThisImmediately'); */

      const myGetRequest = new Request(BASE_URL, {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
      });

      this.days = (
        await fetch(myGetRequest)
        .then(response => response.json())
        .catch(err => {
          this.message = `${err}: ${BASE_URL}`
          this.loaded = true
          return {data: []}
        })
      ).data

      this.loadDayTally("Mon")
      this.loaded = true

      setTimeout(() => {
        registerStickyHeader();
      }, 150)
    })()
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
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

.great-to-eight .header {
  background: white;
  border-bottom: 1px solid whitesmoke;
  padding-bottom: 1em;
  z-index: 100;
}

/* Page content-pane */
.content-pane {
  padding: 16px;
}

/* The sticky class is added to the header with JS when it reaches its scroll position */
.sticky {
  position: fixed;
  top: 0;
  width: 100%
}

/* Add some top padding to the page content-pane to prevent sudden quick movement (as the header gets a new position at the top of the page (position:fixed and top:0) */
.sticky + .content-pane {
  padding-top: 102px;
}

.great-to-eight .info {
  width: 100%;
  padding: 0 2em;
}

.great-to-eight .info ul {
  display: flex;
  justify-content: space-between;
}

.great-to-eight .info ul li {
  display: flex;

}

.great-to-eight .tabs {
  width: 100%;
  background: #f0f0f0;
  border: 1px solid #ccc;
  border-right: none;
}

.great-to-eight .tabs ul {
    flex-wrap:wrap;
    margin: 0;
    padding: 0;
}

.great-to-eight .tabs ul li {
    list-style: none;
    flex: 1 1 auto;
    text-align: center;
}

.great-to-eight .tabs ul li:first-child {
    border-left: none;
}

.great-to-eight .tabs ul li a {
    display: block;
}

.great-to-eight .info.page-footer {
  border: 1px solid whitesmoke;
  margin-top: 4em;
  padding-top: 1em;
  padding-bottom: 1em;
}

.great-to-eight {
  padding-bottom: 8em;
}
    
</style>
