<template>
  <div class="day-tally" id="day-tally" v-if="loaded">

<!-- <div style="display: none; "> -->
<!--   <input type="range" id="volume" name="volume" -->
<!--          min="0" max="11" v-model="volume" @change="onChangeVolume"> -->
<!--   <label for="volume">Volume</label> -->
<!--   <div> {{ volume }} </div> -->
<!-- </div> -->

    <div v-for="(component, index) in data" :key="index">

      <!-- <div v-if="component.type == 'dayOfWeek'"> -->
      <!--   <h3>{{component.value}} ({{totalPoints}})</h3> -->
      <!-- </div> -->

      <div v-if="component.type == 'positiveFoods'">
        <h3>{{component.title}}</h3>
        <!-- <ul style="display: none; "> -->
        <!--   <li v-for="entry in component.options" :key="entry.id"> -->
        <!--     <input type="text" name="points" v-model="entry.points"> <br/> -->
        <!--     <input type="text" name="name" v-model="entry.name"> <br/> -->

        <!--     <input type="checkbox" :id="labelId(component.name, entry.id)" v-model="entry.isFruitVegetable"> <label :for="labelId(component.name, entry.id)">is fruit or vegetable?</label> <br/> -->
        <!--   </li> -->
        <!-- </ul> -->

        <div class="slider">
          <slider
            :name="positiveFoodsSliderId"
            :values="positiveFoodsSliderValues"
            min="0"
            max="100"
            raising
            v-model="positiveFoods.selectedId"
            @change="onChange"
          ></slider>
          <!-- remember to set v-model -->
          <!-- {{ positiveFoodsSlider }} -->
        </div>

        <div class="slider">
          <slider
            :name="fruitsVegetablesSliderId"
            :values="fruitsVegetablesSliderValues"
            min="0"
            max="100"
            raising
            v-model="fruitsVegetables.selectedId"
            @change="onChange"
          ></slider>
          <!-- remember to set v-model -->
          <!-- {{ fruitsVegetablesSlider }} -->
        </div>
      </div>

      <div v-if="component.type == 'negativeFoods'">
        <h3>{{component.title}}</h3>
        <!-- <ul style="display: none; "> -->
        <!--   <li v-for="entry in component.options" :key="entry.id"> -->
        <!--     <input type="text" name="points" v-model="entry.points"> <br/> -->
        <!--     <input type="text" name="name" v-model="entry.name"> <br/> -->
        <!--   </li> -->
        <!-- </ul> -->

        <div class="slider">
          <slider
            :name="negativeFoodsSliderId"
            :values="negativeFoodsSliderValues"
            min="0"
            max="100"
            raising
            v-model="negativeFoods.selectedId"
            @change="onChange"
          ></slider>
          <!-- remember to set v-model -->
          <!-- {{ negativeFoodsSlider }} -->
        </div>
      </div>
      
      <div v-if="component.type == 'water'">
        <h3>{{component.title}}</h3>
        <!-- <ul style="display: none; "> -->
        <!--   <li v-for="entry in component.options" :key="entry.id"> -->
        <!--     <input type="checkbox" :id="labelId(component.name, entry.id)" v-model="entry.consumed"> <label :for="labelId(component.name, entry.id)">1 cup</label> <br/> -->

        <!--   </li> -->
        <!-- </ul> -->

        <div class="slider">
          <slider
            :name="waterSliderId"
            :values="waterSliderValues"
            min="0"
            max="100"
            raising
            v-model="water.selectedId"
            @change="onChange"
          ></slider>
          <!-- remember to set v-model -->
          <!-- {{ waterSlider }} -->
        </div>
      </div>
      
      <div v-if="component.type == 'afterEight'">
        <h3>{{component.title}}</h3>
        <ul>
          <li v-for="entry in component.options" :key="entry.id">
            <div>
              <input type="checkbox" :id="entry.name" v-model="entry.value" :value="entry.name" @change="onChange"> <label :for="entry.name">{{entry.label}}</label>
            </div>
          </li>
        </ul>
      </div>
      
      <div v-if="component.type == 'exercise'">
        <h3>{{component.title}}</h3>
        <!-- <ul style="display: none; "> -->
        <!--   <li v-for="entry in component.options" :key="entry.id"> -->
        <!--     <input type="radio" :id="entry.name" v-model="component.selectedOption" :value="entry.name"> <label :for="entry.name">{{entry.label}}</label> <br/> -->
        <!--   </li> -->
        <!-- </ul> -->

        <div class="slider">
          <slider
            :name="exerciseSliderId"
            :values="exerciseSliderValues"
            min="0"
            max="100"
            raising
            v-model="exercise.selectedId"
            @change="onChange"
          ></slider>
          <!-- remember to set v-model -->
          <!-- {{ exerciseSlider }} -->
        </div>
      </div>
      
      <div v-if="component.type == 'simple-checkbox'">
        <h3>{{component.title}}</h3>
        <ul>
          <li v-for="entry in component.options" :key="entry.id">
            <input type="checkbox" :id="entry.name" v-model="entry.performed" @change="onChange"> <label :for="entry.name">{{entry.label}}</label> <br/>
          </li>
        </ul>
      </div>

    </div>

      <div class="footer-spacer"></div>
    
  </div>
</template>

<script>
import Slider from "./CustomRangeSlider";
import "../assets/css/vue-custom-range-slider.scss";
import { calculatePoints } from "../assets/js/points-calculator";

export default {
  name: 'DayTally',
  components: {
    Slider,
  },
  props: {
    id: String,
    data: { default: {}}
  },
  computed: {
    totalPoints() {
        return (this.data) ? calculatePoints(this.data) : 0
    },
    positiveFoods() {
      return this.data.find(entry => entry.name == 'positiveFoods')
    },
    fruitsVegetables() {
      return this.data.find(entry => entry.name == 'positiveFoods').fruitsAndVegetables
    },
    negativeFoods() {
      return this.data.find(entry => entry.name == 'negativeFoods')
    },
    water() {
      return this.data.find(entry => entry.name == 'water')
    },
    exercise() {
      return this.data.find(entry => entry.name == 'exercise')
    },

    positiveFoodsSliderId() {
      return `${(this.$parent.name || this.id || '').toLowerCase()}-positiveFoodsSlider`
    },
    fruitsVegetablesSliderId() {
      return `${(this.$parent.name || this.id || '').toLowerCase()}-fruitsVegetablesSlider`
    },
    negativeFoodsSliderId() {
      return `${(this.$parent.name || this.id || '').toLowerCase()}-negativeFoodsSlider`
    },
    waterSliderId() {
      return `${(this.$parent.name || this.id || '').toLowerCase()}-waterSlider`
    },
    exerciseSliderId() {
      return `${(this.$parent.name || this.id || '').toLowerCase()}-exerciseSlider`
    },
  },
  data() {
    return {
      volume: 3,
      loaded: false,
      dailyTally: null,

      positiveFoodsSlider: "0",
      fruitsVegetablesSlider: "0",
      negativeFoodsSlider: "0",
      waterSlider: "0",
      exerciseSlider: "0",

      // sliderValues: [
      //   {
      //     label: "Not at all",
      //     value: "0"
      //   },
      //   {
      //     label: "A tiny bit",
      //     value: "1"
      //   },
      //   { 
      //     label: "Its ok",
      //     value: "2"
      //   },
      //   {
      //     label: "Its very good",
      //     value: "3"
      //   },
      //   {
      //     label: "Its AMAZING!",
      //     value: "4"
      //   }
      // ],
    
    }
  },
  methods: {
    labelId(label, id) {
      return `${label}-${id}`
    },
    onChangeVolume(event) {
      document.getElementById('volume').value = event.target.value
    },
    onChange(event) {
      console.log(">>>change detected", calculatePoints(this.data))
    },
    load() {
      this.positiveFoodsSlider = this.positiveFoods.selectedId.toString()
      this.fruitsVegetablesSlider = this.fruitsVegetables.selectedId.toString()
      this.negativeFoodsSlider = this.negativeFoods.selectedId.toString()
      this.waterSlider = this.water.selectedId.toString()
      this.exerciseSlider = this.exercise.selectedId.toString()

      this.positiveFoodsSliderValues = this.positiveFoods.options.map((option, index) => {
        return {
          label: `${index} Pos Food`,
          value: `${option.id}`,
        }
      })

      this.fruitsVegetablesSliderValues = this.fruitsVegetables.options.map((option, index) => {
        return {
          label: `${index} Frt/Veg`,
          value: `${option.id}`,
        }
      })

      this.negativeFoodsSliderValues = this.negativeFoods.options.map((option, index) => {
        return {
          label: `${index} Neg Food`,
          value: `${option.id}`,
        }
      })

      this.waterSliderValues = this.water.options.map((option, index) => {
        return {
          label: `${index} Cups Water`,
          value: `${option.id}`,
        }
      })

      this.exerciseSliderValues = this.exercise.options.map((option, index) => {
        return {
          label: option.label,
          value: `${option.id}`,
        }
      })
    }
  },
  mounted() {
    this.load()
    this.loaded = true

    setTimeout(() => {
    this.dailyTally = document.querySelector('#day-tally')
    this.dailyTally.addEventListener("load", this.load);
    }, 1000)

    /*
dailyTally = document.querySelector('#day-tally')
dailyTally.dispatchEvent( customEvent = new CustomEvent("load") )

element.addEventListener('load', e => console.log(e.detail.text()));
    */
    
  },
  beforeDestroy() {
    this.dailyTally.removeEventListener("load", this.load);
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 20px 0 0;
  font-size: 12pt;
  font-weight: 600;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.slider {
  width: 80%;
  margin: 0 auto;
  margin-top: 1em;
}

</style>
