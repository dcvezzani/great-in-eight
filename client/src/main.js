import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

require('@/assets/css/main.scss');

Vue.config.productionTip = false

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
            this.tabs.forEach(tab => tab.isActive = false)
            const tab = this.tabs.find(tab => tab.name == selectedTab.name)
            if (tab) {
              tab.isActive = true
              tab.click()
            }
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

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
