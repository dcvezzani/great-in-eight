<template>
  <div class="great-to-eight" v-if="loaded">

    <tabs>
      <tab v-for="day in days" :key="day.name" :name="day.name" :selected="day.selected" :click="() => loadDayTally(day.name)">
      </tab>
    </tabs>
    
    <div>Points for the week: {{totalPoints}}</div>
    <button @click="save">Save</button>

    <DayTally :data="payload" v-if="payload"></DayTally>
    
  </div>
</template>

<script>

/* (async () => { */
/*   const myHeaders = new Headers(); */
/*   myHeaders.append('Content-Type', 'application/json'); */
/*   /1* myHeaders.append('Content-Length', content.length.toString()); *1/ */
/*   /1* myHeaders.append('X-Custom-Header', 'ProcessThisImmediately'); *1/ */

/*   const myGetRequest = new Request('http://localhost:3010/', { */
/*     method: 'GET', */
/*     headers: myHeaders, */
/*     mode: 'cors', */
/*     cache: 'default', */
/*   }); */

/*   let data = await fetch(myGetRequest) */
/*   .then(response => response.json()) */
/*   console.log(">>>data", data) */

/*   const myPostRequest = new Request('http://localhost:3010/', { */
/*     method: 'POST', */
/*     headers: myHeaders, */
/*     mode: 'cors', */
/*     cache: 'default', */
/*     body: JSON.stringify(data) // body data type must match "Content-Type" header */
/*   }); */

/*   data = await fetch(myPostRequest) */
/*   .then(response => response.json()) */
/*   console.log(">>>data [2]", data) */
/* })() */

const xpayload = [
  { type: 'weekOfPeriod', 
    name: 'weekOfPeriod', 
    value: '1',
  },
  { type: 'dayOfWeek', 
    name: 'dayOfWeek', 
    value: 'Mon',
  },
  { type: 'positiveFoods', 
    name: 'positiveFoods', 
    title: 'Positive Foods',
    selectedId: "0", 
    options: [
      {id: "0",  points: 0},
      {id: "1",  points: 1, name: ''},
      {id: "2",  points: 1, name: ''},
      {id: "3",  points: 1, name: ''},
      {id: "4",  points: 1, name: ''},
      {id: "5",  points: 1, name: ''},
    ],
    fruitsAndVegetables: {
      points: 10, 
      positiveFoodsPointsRequirement: 5,
      selectedId: "0", 
      options: [
        {id: "0",  points: 0},
        {id: "1",  points: 1, name: ''},
        {id: "2",  points: 1, name: ''},
        {id: "3",  points: 1, name: ''},
        {id: "4",  points: 1, name: ''},
        {id: "5",  points: 1, name: ''},
      ],
    },
  },
  { type: 'negativeFoods', 
    name: 'negativeFoods', 
    title: 'Negative Foods',
    selectedId: "0", 
    options: [
      {id: "0",  points: 0},
      {id: "1",  points: -1, name: ''},
      {id: "2",  points: -1, name: ''},
      {id: "3",  points: -1, name: ''},
      {id: "4",  points: -1, name: ''},
      {id: "5",  points: -1, name: ''},
      {id: "6",  points: -1, name: ''},
      {id: "7",  points: -1, name: ''},
      {id: "8",  points: -1, name: ''},
      {id: "9",  points: -1, name: ''},
      {id: "10", points: -1, name: ''},
    ],
  },
  { type: 'water', 
    name: 'water', 
    title: 'Water',
    points: 10, 
    selectedId: "0", 
    rules: [
      {week: "1", cups: 4},
      {week: "2", cups: 5},
      {week: "3", cups: 6},
      {week: "4", cups: 7},
      {week: "default", cups: 8},
    ],
    options: [
      {id: "0", cups: 0},
      {id: "1", cups: 1},
      {id: "2", cups: 1},
      {id: "3", cups: 1},
      {id: "4", cups: 1},
      {id: "5", cups: 1},
      {id: "6", cups: 1},
      {id: "7", cups: 1},
      {id: "8", cups: 1},
    ]
  },
  { type: 'afterEight', 
    name: 'afterEight', 
    title: 'After 8:00 pm',
    points: 5,
    options: [
      {name: 'nothingEaten', label: 'Nothing consumed?', value: false},
      {name: 'fruitOrVegetable', label: 'Ate 1 serving fruit/vegetable?', value: false},
    ],
  },
  { type: 'exercise', 
    name: 'exercise', 
    title: 'Exercise',
    selectedId: '0',
    rules: [
      {name: "exerciseOnRestDay", requiredOption: '31_plus', points: 10},
    ],
    options: [
      {
        id: "0",
        label: 'None',
        name: 'none',
        points: 0,
      },
      {
        id: "1",
        label: '15 - 20 min',
        name: '15_20',
        points: 10,
      },
      {
        id: "2",
        label: '20 - 30 min',
        name: '20_30',
        points: 15,
      },
      {
        id: "3",
        label: '31 min',
        name: '31_plus',
        points: 20,
      },
    ],
  },
  { type: 'simple-checkbox', 
    name: 'dailyGreatness', 
    title: 'Daily Greatness',
    points: 5,
    options: [
      {
        name: 'dailyGreatness',
        label: 'Daily greatness achieved',
        description: '',
        performed: false,
      }
    ]
  },
  { type: 'simple-checkbox', 
    name: 'personalPrayer', 
    title: 'Personal Prayer',
    points: 5,
    options: [
      {
        name: 'personalPrayer',
        label: 'Personal prayer, meditation or reflection',
        description: '',
        performed: false,
      }
    ]
  },
  { type: 'simple-checkbox', 
    name: 'scriptureStudy', 
    title: 'Scripture Study',
    points: 5,
    options: [
      {
        name: 'scriptureStudy',
        label: 'Uplifting reading',
        description: '',
        performed: false,
      }
    ]
  },
]

import DayTally from './DayTally.vue'
import { calculateWeeklyPoints } from "../assets/js/points-calculator";

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
    }
  },
  data() {
    return {
      payload: [], 
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
    save() {
      (async () => {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const myPostRequest = new Request('http://localhost:3010/', {
          method: 'POST',
          headers: myHeaders,
          mode: 'cors',
          cache: 'default',
          body: JSON.stringify(this.days) // body data type must match "Content-Type" header
        });

        const data = await fetch(myPostRequest)
        .then(response => response.json())
        console.log(">>>data [2]", data)
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

      const myGetRequest = new Request('http://localhost:3010/', {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
      });

      this.days = (await fetch(myGetRequest)
      .then(response => response.json())).data
      console.log(">>>data", this.days)

      /* this.days = [ */
      /*   {name: "Mon", selected: true, data: JSON.parse(JSON.stringify(this.payload))}, */
      /*   {name: "Tue", selected: false, data: JSON.parse(JSON.stringify(this.payload))}, */
      /*   {name: "Wed", selected: false, data: JSON.parse(JSON.stringify(this.payload))}, */
      /*   {name: "Thu", selected: false, data: JSON.parse(JSON.stringify(this.payload))}, */
      /*   {name: "Fri", selected: false, data: JSON.parse(JSON.stringify(this.payload))}, */
      /*   {name: "Sat", selected: false, data: JSON.parse(JSON.stringify(this.payload))}, */
      /*   {name: "Sun", selected: false, data: JSON.parse(JSON.stringify(this.payload))}, */
      /* ] */

      this.loadDayTally("Mon")

      this.loaded = true

      // const myPostRequest = new Request('http://localhost:3010/', {
      //   method: 'POST',
      //   headers: myHeaders,
      //   mode: 'cors',
      //   cache: 'default',
      //   body: JSON.stringify(data) // body data type must match "Content-Type" header
      // });

      // data = await fetch(myPostRequest)
      // .then(response => response.json())
      // console.log(">>>data [2]", data)
    })()
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
