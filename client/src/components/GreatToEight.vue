<template>
  <div class="great-to-eight" v-if="loaded">
  <h3>Positive Foods</h3>
  <ul>
    <li v-for="entry in data.positiveFoods" :key="entry.id">
      <input type="text" name="points" v-model="entry.points"> <br/>
      <input type="text" name="points" v-model="entry.name"> <br/>

      <input type="checkbox" :id="labelId('positive-food', entry.id)" v-model="entry.isFruitVegetable"> <label :for="labelId('positive-food', entry.id)">is fruit or vegetable?</label> <br/>
    </li>
  </ul>

  <h3>Negative Foods</h3>
  <ul>
    <li v-for="entry in data.negativeFoods" :key="entry.id">
      <input type="text" name="points" v-model="entry.points"> <br/>
      <input type="text" name="points" v-model="entry.name"> <br/>
    </li>
  </ul>

  <h3>Water</h3>
  <ul>
    <li v-for="entry in data.water.cups" :key="entry.id">
      <input type="checkbox" :id="labelId('water', entry.id)" v-model="entry.consumed"> <label :for="labelId('water', entry.id)">1 cup</label> <br/>

    </li>
  </ul>

  <h3>After 8:00pm</h3>
  <ul>
    <li v-for="entry in data.afterEight.options" :key="entry.id">
      <input type="checkbox" :id="entry.name" v-model="entry.consumed" :value="entry.name"> <label :for="entry.name">{{entry.label}}</label> <br/>


    </li>
  </ul>

  <h3>Exercise</h3>
  <ul>
    <li v-for="entry in data.exercise.options" :key="entry.id">
      <input type="radio" :id="entry.name" v-model="data.exercise.selectedOption" :value="entry.name"> <label :for="entry.name">{{entry.label}}</label> <br/>

    </li>
  </ul>

  <h3>Daily Greatness</h3>
  <ul>
    <li v-for="entry in data.dailyGreatness.options" :key="entry.id">
      <input type="checkbox" :id="entry.name" v-model="entry.performed"> <label :for="entry.name">{{entry.label}}</label> <br/>

    </li>
  </ul>

  <h3>Personal Prayer</h3>
  <ul>
    <li v-for="entry in data.personalPrayer.options" :key="entry.id">
      <input type="checkbox" :id="entry.name" v-model="entry.performed"> <label :for="entry.name">{{entry.label}}</label> <br/>

    </li>
  </ul>

  <h3>Scripture Study</h3>
  <ul>
    <li v-for="entry in data.scriptureStudy.options" :key="entry.id">
      <input type="checkbox" :id="entry.name" v-model="entry.performed"> <label :for="entry.name">{{entry.label}}</label> <br/>

    </li>
  </ul>

  </div>
</template>

<script>

const payload = {
  positiveFoods: [
    {id: 1,  points: 1, name: '', isFruitVegetable: false},
    {id: 2,  points: 1, name: '', isFruitVegetable: false},
    {id: 3,  points: 1, name: '', isFruitVegetable: false},
    {id: 4,  points: 1, name: '', isFruitVegetable: false},
    {id: 5,  points: 1, name: '', isFruitVegetable: false},
    {id: 6,  points: 1, name: '', isFruitVegetable: false},
    {id: 7,  points: 1, name: '', isFruitVegetable: false},
    {id: 8,  points: 1, name: '', isFruitVegetable: false},
    {id: 9,  points: 1, name: '', isFruitVegetable: false},
    {id: 10, points: 1, name: '', isFruitVegetable: false},
  ],
  fruitsAndVegetables: {
    points: 10, 
    positiveFoodsPointsRequirement: 5,
  },
  negativeFoods: [
    {id: 1,  points: -1, name: ''},
    {id: 2,  points: -1, name: ''},
    {id: 3,  points: -1, name: ''},
    {id: 4,  points: -1, name: ''},
    {id: 5,  points: -1, name: ''},
    {id: 6,  points: -1, name: ''},
    {id: 7,  points: -1, name: ''},
    {id: 8,  points: -1, name: ''},
    {id: 9,  points: -1, name: ''},
    {id: 10, points: -1, name: ''},
  ],
  water: {
    points: 10, 
    cups: [
      {id: 1, consumed: false},
      {id: 2, consumed: false},
      {id: 3, consumed: false},
      {id: 4, consumed: false},
      {id: 5, consumed: false},
      {id: 6, consumed: false},
      {id: 7, consumed: false},
      {id: 8, consumed: false},
    ]
  },
  afterEight: {
    points: 5,
    options: [
      {name: 'nothingEaten', label: 'Nothing consumed?', consumed: false},
      {name: 'fruitOrVegetable', label: '1 serving fruit/vegetable?', consumed: false},
    ],
  },
  exercise: {
    selectedOption: '15_20',
    options: [
      {
        id: 1,
        label: '15 - 20 min',
        name: '15_20',
        points: 10,
      },
      {
        id: 2,
        label: '20 - 30 min',
        name: '20_30',
        points: 15,
      },
      {
        id: 3,
        label: '31 min',
        name: '31_plus',
        points: 20,
      },
    ],
  },
  dailyGreatness: {
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
  personalPrayer: {
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
  scriptureStudy: {
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
}

export default {
  name: 'GreatToEight',
  props: {
    msg: String
  },
  data() {
    return {
      data: {},
      loaded: false,
    }
  },
  methods: {
    labelId(label, id) {
      return `${label}-${id}`
    },
  },
  mounted() {
    this.data = payload
    this.loaded = true
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
