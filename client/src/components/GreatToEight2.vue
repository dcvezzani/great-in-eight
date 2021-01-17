<template>
  <div class="great-to-eight">
<!-- <div class="navbar"> -->
<!--   <a href="#home">Home</a> -->
<!--   <a href="#news">News</a> -->
<!--   <a href="#contact">Contact</a> -->
<!-- </div> -->

    <div>{{message}}</div>

    <div v-if="loaded">

      <div class="header">
        <tabs>
          <tab v-for="week in weeks" :key="week.id" :name="week.name" :selected="week.selected" :click="() => loadWeekData(week.id)">
          </tab>
        </tabs>
        
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

        <div>{{message}}</div>
      </div>
        
      <div class="content-pane">
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
    
    
  </div>
</template>

<script>

import DayTally from './DayTally.vue'
import { calculateWeeklyPoints, calculatePoints } from "../assets/js/points-calculator"
import { saveUserData, loadNewFormData, loadUserData } from "../assets/js/requests"
// const BASE_URL = 'https://10.0.0.54:3010/api'
// const BASE_URL = 'https://great-in-eight.vezzaniphotography.com/api'

const registerStickyHeader = () => {

  // Get the header
  var header = document.querySelector(".header");

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
      const totalWeeklyPoints = calculateWeeklyPoints({week: this.days, rules: this.rules})
      // console.log(">>>totalPoints, totalWeeklyPoints", totalWeeklyPoints, this.rules)
      return totalWeeklyPoints
    },
    totalPointsForCurrentDay() {
      return calculatePoints({day: this.payload, rules: this.rules})
    },
    currentDay() {
      const dayOfWeek = this.payload.find(entry => entry.name === 'dayOfWeek')
      return (dayOfWeek) ? dayOfWeek.value : null
    },
    currentWeek() {
      const weekOfPeriod = this.payload.find(entry => entry.name === 'weekOfPeriod')
      return (weekOfPeriod) ? weekOfPeriod.value : null
    },
  },
  data() {
    return {
      weeks: [],
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
      rules: [],
    }
  },
  methods: {
    toast(message) {
      this.message = message
      console.log(">>>toast, message", message)
      setTimeout(() => { this.message = null }, 3000)
    },
    save() {
        saveUserData(this, (data) => {
          this.toast((data.ok) ? "Data was successfully saved!" : "Data was not saved")
        })
    },
    loadWeekData(weekId) {
        console.log(">>>loadWeekData(weekId)", weekId)

        loadUserData(this, {weekId}, ({data: days, rules}) => {
          this.rules = (rules) ? rules : []

          const currentDay = this.currentDay || 'Mon'
          const weekDataExistsForUser = !!(days[0].data)
          console.log(">>>days", days[0].data, weekDataExistsForUser)

          if (weekDataExistsForUser) {
            console.log(">>>Found user data!")
            this.days = days
            this.loadDayTally(currentDay)
            this.loaded = true

          } else {
            console.log(">>>Loading new data")
            this.loadNewFormData(null, weekId)
            this.loadDayTally(currentDay)
              
          }

          // if the first object in the array has a 'data' property, there is data for the user
          // else the user doesn't yet have data for the specified week and needs to create one
          // using the template data that was returned

          // if (dayOfWeek) {
          //     const idx = this.days.findIndex(day => day.name === dayOfWeek)
          //     // console.log(">>>idx", idx)
          //     this.days[idx] = days[idx]

          // } else {
          //   // console.log(">>>days", days[0].data)
          //     if (!days[0].data) {
          //       console.log(">>>No user data found.  Resetting form.")
          //       return this.loadNewFormData(dayOfWeek)
          //     }

          //   console.log(">>>Found user data!")
          //   this.days = days
          // }

          // this.loadDayTally("Mon")
          // this.loaded = true

          // setTimeout(() => {
          //   registerStickyHeader();
          // }, 150)
        
          // this.toast((data.ok) ? "Data was successfully saved!" : "Data was not saved")
        })
        
        // fetch data for given user id and week id
        // populate payload
        // load monday
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
            this.loadCurrentUserAndWeekData()
            break;
          }
          case 'reset-day-from-last-save': {
            this.loadCurrentUserAndWeekData(this.currentDay)
            break;
          }
        }
    },
    loadNewFormData(dayOfWeek=null, weekId) {
        loadNewFormData(this, {weekId}, ({ days, rules }) => {
          this.rules = (rules) ? rules : []

          if (dayOfWeek) {
              const idx = this.days.findIndex(day => day.name === dayOfWeek)
              console.log(">>>idx", idx)
              this.days[idx] = days[idx]

          } else {
            this.days = days
          }

          this.loadDayTally("Mon")
          this.loaded = true

          // setTimeout(() => {
          //   registerStickyHeader();
          // }, 150)
            
          // this.toast((data.ok) ? "Data was successfully saved!" : "Data was not saved")
        })
    },
    loadCurrentUserAndWeekData(dayOfWeek=null, weekId) {
        loadUserData(this, {weekId}, ({data: days, rules}) => {
          this.rules = (rules) ? rules : []

          if (dayOfWeek) {
              const idx = this.days.findIndex(day => day.name === dayOfWeek)
              // console.log(">>>idx", idx)
              this.days[idx] = days[idx]

          } else {
            // console.log(">>>days", days[0].data)
              if (!days[0].data) {
                console.log(">>>No user data found.  Resetting form.")
                return this.loadNewFormData(dayOfWeek)
              }

            console.log(">>>Found user data!")
            this.days = days
          }

          this.loadDayTally("Mon")
          this.loaded = true

          setTimeout(() => {
            registerStickyHeader();
          }, 150)
        
          // this.toast((data.ok) ? "Data was successfully saved!" : "Data was not saved")
        })
    },
  },
  mounted() {
    this.message = "loading current user..."
    this.loadCurrentUserAndWeekData()

    this.message = "build weeks..."
    let weekSelected = true
    this.weeks =  [...new Array(8)].map((week, index) => ({
      id: `${index+1}`,
      name: `w${(index+1).toString()}`,
      selected: (index === 0),
    }))

    this.toast("done with page initialization")
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
