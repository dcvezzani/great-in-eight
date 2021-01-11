import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import GreatToEight from '../components/GreatToEight.vue'
import GreatToEight2 from '../components/GreatToEight2.vue'

Vue.use(VueRouter)

Vue.component('tabs', {
    template: `
        <div>
            <div class="tabs">
              <ul>
                <li v-for="tab in tabs" :class="{ 'is-active': tab.isActive }">
                    <a :href="tab.href" @click="selectTab(tab)">{{ tab.name }}</a>
                </li>
              </ul>
            </div>

            <div class="tabs-details">
                <slot></slot>
            </div>
        </div>
    `,
    
    data() {
        return {tabs: [] };
    },
    
    created() {
        
        this.tabs = this.$children;
        
    },
    methods: {
        selectTab(selectedTab) {
            this.tabs.forEach(tab => {
                tab.isActive = (tab.name == selectedTab.name);
                if (tab.isActive) tab.click()
            });
        }
    }
});

Vue.component('tab', {
    
    template: `

        <div v-show="isActive"><slot></slot></div>

    `,
    
    props: {
        name: { required: true },
        selected: { default: false},
        click: { default: () => {}}
    },
    
    data() {
        
        return {
            isActive: false
        };
        
    },
    
    computed: {
        
        href() {
            return '#' + this.name.toLowerCase().replace(/ /g, '-');
        }
    },
    
    mounted() {
        
        this.isActive = this.selected;
        
    }
});

const routes = [
  {
    path: '/',
    name: 'Home',
    component: GreatToEight2,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
