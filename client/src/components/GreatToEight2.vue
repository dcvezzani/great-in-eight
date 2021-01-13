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
          <li>
            <button @click="save">Save</button>
          </li>
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
          <select id="pageFooterActions" name="pageFooterActions" @change="handlePageFooterActions($event, 'pageFooterActions')">
            <option value="do-nothing">- Select action -</option>
            <option value="reset-day-from-last-save">Reset day from last save</option>
            <option value="reset-week-from-last-save">Reset week from last save</option>
            <option value="reset-day">Reset day as new</option>
            <option value="reset-week">Reset week as new</option>
          </select>
          <button @click="handlePageFooterActions($event, 'pageFooterActions')">Reset</button>
        </li>
      </ul>
    </div>
    
  </div>
</template>

<script>

import DayTally from './DayTally.vue'
import { calculateWeeklyPoints, calculatePoints } from "../assets/js/points-calculator"
// const BASE_URL = 'https://10.0.0.54:3010/api'
const BASE_URL = 'https://great-in-eight.vezzaniphotography.com/api'

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
            body: JSON.stringify({days: this.days, userId: this.$store.state.userId}) // body data type must match "Content-Type" header
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
    },
    handlePageFooterActions(event, elementId) {
        const target = document.getElementById(elementId)
        // console.log(">>>target", target)
        const option = target.options[target.selectedIndex]
        // console.log(">>>handlePageFooterActions", option.value)

        switch(option.value) {
          case 'reset-week': {
            this.loadNewFormData()
            break;
          }
          case 'reset-day': {
            this.loadNewFormData(this.currentDay)
            break;
          }
          case 'reset-week-from-last-save': {
            this.loadCurrentUserData()
            break;
          }
          case 'reset-day-from-last-save': {
            this.loadCurrentUserData(this.currentDay)
            break;
          }
        }
    },
    loadNewFormData(currentDay=null) {
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
            this.message = `${err}: ${url}`
            this.loaded = true
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

        if (currentDay) {
            const idx = this.days.findIndex(day => day.name === currentDay)
            console.log(">>>idx", idx)
            this.days[idx] = days[idx]

        } else {
          this.days = days
        }

        this.loadDayTally("Mon")
        this.loaded = true

        setTimeout(() => {
          registerStickyHeader();
        }, 150)
      })()
          
    },
    loadCurrentUserData(currentDay=null) {
      (async () => {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        /* myHeaders.append('Content-Length', content.length.toString()); */
        /* myHeaders.append('X-Custom-Header', 'ProcessThisImmediately'); */

        const url = `${BASE_URL}?userId=${this.$store.state.userId}`
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
            this.message = `${err}: ${url}`
            this.loaded = true
            return {data: []}
          })
        ).data

        if (currentDay) {
            const idx = this.days.findIndex(day => day.name === currentDay)
            // console.log(">>>idx", idx)
            this.days[idx] = days[idx]

        } else {
          // console.log(">>>days", days[0].data)
            if (!days[0].data) {
              console.log(">>>No user data found.  Resetting form.")
              return this.loadNewFormData(currentDay)
            }

          console.log(">>>Found user data!")
          this.days = days
        }

        this.loadDayTally("Mon")
        this.loaded = true

        setTimeout(() => {
          registerStickyHeader();
        }, 150)
      })()
          
    },
  },
  mounted() {
    this.loadCurrentUserData()
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
