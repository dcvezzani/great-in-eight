(function(e){function t(t){for(var a,n,o=t[0],l=t[1],d=t[2],u=0,p=[];u<o.length;u++)n=o[u],Object.prototype.hasOwnProperty.call(r,n)&&r[n]&&p.push(r[n][0]),r[n]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(e[a]=l[a]);c&&c(t);while(p.length)p.shift()();return i.push.apply(i,d||[]),s()}function s(){for(var e,t=0;t<i.length;t++){for(var s=i[t],a=!0,n=1;n<s.length;n++){var l=s[n];0!==r[l]&&(a=!1)}a&&(i.splice(t--,1),e=o(o.s=s[0]))}return e}var a={},r={app:0},i=[];function n(e){return o.p+"js/"+({about:"about"}[e]||e)+"."+{about:"b47ac6a2"}[e]+".js"}function o(t){if(a[t])return a[t].exports;var s=a[t]={i:t,l:!1,exports:{}};return e[t].call(s.exports,s,s.exports,o),s.l=!0,s.exports}o.e=function(e){var t=[],s=r[e];if(0!==s)if(s)t.push(s[2]);else{var a=new Promise((function(t,a){s=r[e]=[t,a]}));t.push(s[2]=a);var i,l=document.createElement("script");l.charset="utf-8",l.timeout=120,o.nc&&l.setAttribute("nonce",o.nc),l.src=n(e);var d=new Error;i=function(t){l.onerror=l.onload=null,clearTimeout(u);var s=r[e];if(0!==s){if(s){var a=t&&("load"===t.type?"missing":t.type),i=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+a+": "+i+")",d.name="ChunkLoadError",d.type=a,d.request=i,s[1](d)}r[e]=void 0}};var u=setTimeout((function(){i({type:"timeout",target:l})}),12e4);l.onerror=l.onload=i,document.head.appendChild(l)}return Promise.all(t)},o.m=e,o.c=a,o.d=function(e,t,s){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(o.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)o.d(s,a,function(t){return e[t]}.bind(null,a));return s},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/",o.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],d=l.push.bind(l);l.push=t,l=l.slice();for(var u=0;u<l.length;u++)t(l[u]);var c=d;i.push([0,"chunk-vendors"]),s()})({0:function(e,t,s){e.exports=s("56d7")},"034f":function(e,t,s){"use strict";s("85ec")},"066e":function(e,t,s){},"10e9":function(e,t){class s{constructor(e={}){const{day:t,rules:s}=e;this.data=t,this.rules=s}get weekOfPeriod(){return this.data.find(e=>"weekOfPeriod"==e.name)}get week(){return parseInt(this.weekOfPeriod.value)}get scriptureStudy(){return this.data.find(e=>"scriptureStudy"==e.name)}get personalPrayer(){return this.data.find(e=>"personalPrayer"==e.name)}get dailyGreatness(){return this.data.find(e=>"dailyGreatness"==e.name)}get exercise(){return this.data.find(e=>"exercise"==e.name)}get afterEight(){return this.data.find(e=>"afterEight"==e.name)}get water(){return this.data.find(e=>"water"==e.name)}get negativeFoods(){return this.data.find(e=>"negativeFoods"==e.name)}get positiveFoods(){return this.data.find(e=>"positiveFoods"==e.name)}get fruitsVegetables(){return this.data.find(e=>"positiveFoods"==e.name).fruitsAndVegetables}get exercisedAtLeast30Min(){const e=this.rules.exerciseOnRestDay,t=this.exercise.options.find(e=>e.id===this.exercise.selectedId);return t.name===e.requiredOption}get exercisePts(){const e=this.exercise.options.find(e=>e.id===this.exercise.selectedId);return e&&e.points||0}get scriptureStudyPts(){const e=this.scriptureStudy.options.find(e=>"scriptureStudy"===e.name);return e.performed?this.rules.scriptureStudyDaily.points:0}get personalPrayerPts(){const e=this.personalPrayer.options.find(e=>"personalPrayer"===e.name);return e.performed?this.rules.personalPrayerDaily.points:0}get dailyGreatnessPts(){const e=this.dailyGreatness.options.find(e=>"dailyGreatness"===e.name);return e.performed?this.rules.dailyGreatnessDaily.points:0}get afterEightPts(){const e=this.afterEight.options.find(e=>"nothingEaten"===e.name);return e.value?this.rules.afterEightDaily.points:0}get waterPts(){let e=!1;const t=this.rules.currentWaterRequirement(this.week),s=this.water.options.reduce((t,s)=>e?t:(e=s.id===this.water.selectedId,t+s.cups),0);return s>=t.cups?this.rules.waterDaily.points:0}get negativeFoodsPts(){let e=!1;return this.negativeFoods.options.reduce((t,s)=>e?t:(e=s.id===this.negativeFoods.selectedId,t+s.points),0)}get positiveFoodsPts(){let e=!1;return this.positiveFoods.options.reduce((t,s)=>e?t:(e=s.id===this.positiveFoods.selectedId,t+s.points),0)}get fruitsVegetablesPts(){let e=!1;const t=this.fruitsVegetables.options.reduce((t,s)=>e?t:(e=s.id===this.fruitsVegetables.selectedId,t+s.points),0),s=t>=this.fruitsVegetables.positiveFoodsPointsRequirement?this.fruitsVegetables.points:0;return{pts:t,bonus:s}}calculate(e={}){const t=e.exclude||[];let s=this.positiveFoodsPts+this.fruitsVegetablesPts.pts;s>10&&(s=10),s+=this.fruitsVegetablesPts.bonus;const a=[s,this.negativeFoodsPts,this.waterPts,this.afterEightPts,this.dailyGreatnessPts,this.personalPrayerPts,this.scriptureStudyPts];return t.includes("exercise")||a.push(this.exercisePts),a.reduce((e,t)=>e+t,0)}}class a{constructor(e){this.rules=e}get exercise(){return this.rules.find(e=>"exercise"===e.name)}get exerciseOnRestDay(){return this.exercise.rules.find(e=>"exerciseOnRestDay"===e.name)}get exerciseRestDay(){return this.exercise.rules.find(e=>"restDay"===e.name)}get exerciseMaxWeeklyPoints(){return this.exercise.rules.find(e=>"maxWeeklyPoints"===e.name)}get water(){return this.rules.find(e=>"water"===e.name)}get waterDaily(){return this.water.rules.find(e=>"dailyPoints"===e.name)}currentWaterRequirement(e){let t=this.water.rules.find(t=>t.week===e);return t||(t=this.water.rules.find(e=>e.isDefault)),t}get afterEight(){return this.rules.find(e=>"afterEight"===e.name)}get afterEightDaily(){return this.afterEight.rules.find(e=>"dailyPoints"===e.name)}get dailyGreatness(){return this.rules.find(e=>"dailyGreatness"===e.name)}get dailyGreatnessDaily(){return this.dailyGreatness.rules.find(e=>"dailyPoints"===e.name)}get personalPrayer(){return this.rules.find(e=>"personalPrayer"===e.name)}get personalPrayerDaily(){return this.personalPrayer.rules.find(e=>"dailyPoints"===e.name)}get scriptureStudy(){return this.rules.find(e=>"scriptureStudy"===e.name)}get scriptureStudyDaily(){return this.scriptureStudy.rules.find(e=>"dailyPoints"===e.name)}}t.calculatePoints=e=>{let{day:t,rules:r}=e;const i=new a(r);return new s({day:t,rules:i}).calculate()},t.calculateWeeklyPoints=(e={})=>{let{week:t,rules:r}=e;t||(t=[]);const i=new a(r),n={exercisedExtraDays:!1,exercised30MinOneDay:!1,exercisePoints:[],exerciseRequiredDays:5,exerciseAwardPoints:i.exerciseOnRestDay.points,exerciseRestRule:i.exerciseRestDay,maxWeeklyPointsRule:i.exerciseMaxWeeklyPoints};let o=t.reduce((e,t)=>{if(t.data){const a=new s({day:t.data,rules:i});return a.exercisedAtLeast30Min&&(n.exercised30MinOneDay=!0),n.exercisePoints.push(a.exercisePts),e+a.calculate({exclude:["exercise"]})}return e},0);const l=(n.exercisePoints||[]).filter(e=>e>0).length;n.exercisedExtraDays=l>n.exerciseRequiredDays;const d=n.exerciseRestRule.points*n.exerciseRestRule.maxCount;return o+=n.exercisePoints.reduce((e,t)=>e+t)+d,n.exercisedExtraDays&&n.exercised30MinOneDay&&(o+=n.exerciseAwardPoints),o>n.maxWeeklyPointsRule.points&&(o=n.maxWeeklyPointsRule.points),o}},"272f":function(e,t,s){"use strict";s("f907")},"2b9e":function(e,t,s){},"305a":function(e,t){const s="https://great-in-eight.vezzaniphotography.com/api",a=({userId:e,weekId:t})=>`${r({userId:e})}/week/${t}`,r=({userId:e})=>`${s}/user/${e}`;t.saveUserData=(e,t)=>{const{userId:s}=e.$store.state;(async()=>{const r=new Headers;r.append("Content-Type","application/json");const i=e.currentWeek||"1",n=a({userId:s,weekId:i}),o=new Request(n,{method:"POST",headers:r,mode:"cors",cache:"default",body:JSON.stringify({days:e.days,userId:e.$store.state.userId})}),l=await fetch(o).then(e=>e.json()).catch(t=>(console.error(`${t}: ${n}`),e.message=`${t}: ${n}`,{ok:!1}));t&&t(l)})()},t.deleteUserData=(e,t)=>{const{userId:s}=e.$store.state;(async()=>{const a=new Headers;a.append("Content-Type","application/json");const i=r({userId:s}),n=new Request(i,{method:"DELETE",headers:a,mode:"cors",cache:"default"}),o=await fetch(n).then(e=>e.json()).catch(t=>(console.error(`${t}: ${i}`),e.message=`${t}: ${i}`,e.loaded=!0,{ok:!1}));t&&t(o)})()},t.loadUserData=(e,t={},s)=>{t.dayOfWeek;const r=t.weekId||"1",i=e.$store.state.userId;(async()=>{const t=new Headers;t.append("Content-Type","application/json");const n=a({userId:i,weekId:r}),o=new Request(n,{method:"GET",headers:t,mode:"cors",cache:"default"}),l=await fetch(o).then(e=>e.json()).catch(t=>(console.error(`${t}: ${n}`),e.message=`${t}: ${n}`,e.loaded=!0,{data:[]}));s&&s(l)})()},t.loadNewFormData=(e,t={},a)=>{const r=t.weekId||"1";(async()=>{const t=new Headers;t.append("Content-Type","application/json");const i=s,n=new Request(i,{method:"GET",headers:t,mode:"cors",cache:"default"}),o=await fetch(n).then(e=>e.json()).catch(t=>(console.error(`${t}: ${i}`),e.message=`${t}: ${i}`,e.loaded=!0,{data:[]})),l=o.userTemplate,d=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];let u=!0;const c=d.map(e=>{let t=JSON.parse(JSON.stringify(l));return t.find(e=>"weekOfPeriod"===e.type).value=r,t.find(e=>"dayOfWeek"===e.type).value=e,t={name:e,selected:u,data:t},u=!1,t});a&&a({days:c,rules:o.rules})})()}},"3c95":function(e,t,s){"use strict";s("066e")},5166:function(e,t,s){},"56d7":function(e,t,s){"use strict";s.r(t);var a=s("a026"),r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{attrs:{id:"app"}},[s("div",{attrs:{id:"nav"}},[e.$store.getters.isLoggedIn?s("span",[s("router-link",{attrs:{to:"/"}},[e._v("Home")]),e._v(" | ")],1):e._e(),s("router-link",{attrs:{to:"/about"}},[e._v("About")]),e._v(" | "),e.$store.getters.isLoggedIn?s("span",[s("router-link",{attrs:{to:"/deleteMyData"}},[e._v("Delete My Data")]),e._v(" | "),s("a",{attrs:{href:"#logout",onclick:"facebookExpireAccessToken()"}},[e._v("Logout")])],1):e._e(),e.$store.getters.isLoggedIn?e._e():s("span",[s("a",{attrs:{href:"#login",onclick:"facebookLogin({forwardRequest: '/'})"}},[e._v("Login")])])],1),s("router-view")],1)},i=[],n={name:"App",props:{},methods:{setUserId(e){e&&this.$store.commit("setUserId",e)},clearUserId(){this.$store.commit("clearUserId")},restoreSessionHandler(e){this.setUserId((e.detail||{}).userId)},loginHandler(e){this.setUserId((e.detail||{}).userId);const{forwardRequest:t}=e.detail;t&&this.$router.push(t).catch(()=>{})},logoutHandler(e){this.clearUserId();const{forwardRequest:t}=e.detail;this.$router.push(t||"/login")}},mounted(){window.addEventListener("restoreSession",this.restoreSessionHandler),window.addEventListener("login",this.loginHandler),window.addEventListener("logout",this.logoutHandler)},beforeDestroy(){window.removeEventListener("restoreSession",this.restoreSessionHandler),window.removeEventListener("login",this.loginHandler),window.removeEventListener("logout",this.logoutHandler)}},o=n,l=(s("034f"),s("2877")),d=Object(l["a"])(o,r,i,!1,null,null,null),u=d.exports,c=s("8c4f"),p=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"home"},[a("img",{attrs:{alt:"Vue logo",src:s("cf05")}}),a("HelloWorld",{attrs:{msg:"Welcome to Your Vue.js App"}})],1)},m=[],h=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"hello"},[s("h1",[e._v(e._s(e.msg))]),e._m(0),s("h3",[e._v("Installed CLI Plugins")]),e._m(1),s("h3",[e._v("Essential Links")]),e._m(2),s("h3",[e._v("Ecosystem")]),e._m(3)])},v=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("p",[e._v(" For a guide and recipes on how to configure / customize this project,"),s("br"),e._v(" check out the "),s("a",{attrs:{href:"https://cli.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("vue-cli documentation")]),e._v(". ")])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ul",[s("li",[s("a",{attrs:{href:"https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-router",target:"_blank",rel:"noopener"}},[e._v("router")])]),s("li",[s("a",{attrs:{href:"https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-vuex",target:"_blank",rel:"noopener"}},[e._v("vuex")])])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ul",[s("li",[s("a",{attrs:{href:"https://vuejs.org",target:"_blank",rel:"noopener"}},[e._v("Core Docs")])]),s("li",[s("a",{attrs:{href:"https://forum.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("Forum")])]),s("li",[s("a",{attrs:{href:"https://chat.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("Community Chat")])]),s("li",[s("a",{attrs:{href:"https://twitter.com/vuejs",target:"_blank",rel:"noopener"}},[e._v("Twitter")])]),s("li",[s("a",{attrs:{href:"https://news.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("News")])])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ul",[s("li",[s("a",{attrs:{href:"https://router.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("vue-router")])]),s("li",[s("a",{attrs:{href:"https://vuex.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("vuex")])]),s("li",[s("a",{attrs:{href:"https://github.com/vuejs/vue-devtools#vue-devtools",target:"_blank",rel:"noopener"}},[e._v("vue-devtools")])]),s("li",[s("a",{attrs:{href:"https://vue-loader.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("vue-loader")])]),s("li",[s("a",{attrs:{href:"https://github.com/vuejs/awesome-vue",target:"_blank",rel:"noopener"}},[e._v("awesome-vue")])])])}],f={name:"HelloWorld",props:{msg:String}},g=f,y=(s("272f"),Object(l["a"])(g,h,v,!1,null,"df2aa6b2",null)),b=y.exports,_={name:"Home",components:{HelloWorld:b}},w=_,k=Object(l["a"])(w,p,m,!1,null,null,null),x=(k.exports,function(){var e=this,t=e.$createElement,s=e._self._c||t;return e.loaded?s("div",{staticClass:"great-to-eight"},[s("h3",[e._v("Positive Foods")]),s("ul",e._l(e.data.positiveFoods,(function(t){return s("li",{key:t.id},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.points,expression:"entry.points"}],attrs:{type:"text",name:"points"},domProps:{value:t.points},on:{input:function(s){s.target.composing||e.$set(t,"points",s.target.value)}}}),e._v(" "),s("br"),s("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"entry.name"}],attrs:{type:"text",name:"points"},domProps:{value:t.name},on:{input:function(s){s.target.composing||e.$set(t,"name",s.target.value)}}}),e._v(" "),s("br"),s("input",{directives:[{name:"model",rawName:"v-model",value:t.isFruitVegetable,expression:"entry.isFruitVegetable"}],attrs:{type:"checkbox",id:e.labelId("positive-food",t.id)},domProps:{checked:Array.isArray(t.isFruitVegetable)?e._i(t.isFruitVegetable,null)>-1:t.isFruitVegetable},on:{change:function(s){var a=t.isFruitVegetable,r=s.target,i=!!r.checked;if(Array.isArray(a)){var n=null,o=e._i(a,n);r.checked?o<0&&e.$set(t,"isFruitVegetable",a.concat([n])):o>-1&&e.$set(t,"isFruitVegetable",a.slice(0,o).concat(a.slice(o+1)))}else e.$set(t,"isFruitVegetable",i)}}}),e._v(" "),s("label",{attrs:{for:e.labelId("positive-food",t.id)}},[e._v("is fruit or vegetable?")]),e._v(" "),s("br")])})),0),s("h3",[e._v("Negative Foods")]),s("ul",e._l(e.data.negativeFoods,(function(t){return s("li",{key:t.id},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.points,expression:"entry.points"}],attrs:{type:"text",name:"points"},domProps:{value:t.points},on:{input:function(s){s.target.composing||e.$set(t,"points",s.target.value)}}}),e._v(" "),s("br"),s("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"entry.name"}],attrs:{type:"text",name:"points"},domProps:{value:t.name},on:{input:function(s){s.target.composing||e.$set(t,"name",s.target.value)}}}),e._v(" "),s("br")])})),0),s("h3",[e._v("Water")]),s("ul",e._l(e.data.water.cups,(function(t){return s("li",{key:t.id},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.consumed,expression:"entry.consumed"}],attrs:{type:"checkbox",id:e.labelId("water",t.id)},domProps:{checked:Array.isArray(t.consumed)?e._i(t.consumed,null)>-1:t.consumed},on:{change:function(s){var a=t.consumed,r=s.target,i=!!r.checked;if(Array.isArray(a)){var n=null,o=e._i(a,n);r.checked?o<0&&e.$set(t,"consumed",a.concat([n])):o>-1&&e.$set(t,"consumed",a.slice(0,o).concat(a.slice(o+1)))}else e.$set(t,"consumed",i)}}}),e._v(" "),s("label",{attrs:{for:e.labelId("water",t.id)}},[e._v("1 cup")]),e._v(" "),s("br")])})),0),s("h3",[e._v("After 8:00pm")]),s("ul",e._l(e.data.afterEight.options,(function(t){return s("li",{key:t.id},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.consumed,expression:"entry.consumed"}],attrs:{type:"checkbox",id:t.name},domProps:{value:t.name,checked:Array.isArray(t.consumed)?e._i(t.consumed,t.name)>-1:t.consumed},on:{change:function(s){var a=t.consumed,r=s.target,i=!!r.checked;if(Array.isArray(a)){var n=t.name,o=e._i(a,n);r.checked?o<0&&e.$set(t,"consumed",a.concat([n])):o>-1&&e.$set(t,"consumed",a.slice(0,o).concat(a.slice(o+1)))}else e.$set(t,"consumed",i)}}}),e._v(" "),s("label",{attrs:{for:t.name}},[e._v(e._s(t.label))]),e._v(" "),s("br")])})),0),s("h3",[e._v("Exercise")]),s("ul",e._l(e.data.exercise.options,(function(t){return s("li",{key:t.id},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.data.exercise.selectedOption,expression:"data.exercise.selectedOption"}],attrs:{type:"radio",id:t.name},domProps:{value:t.name,checked:e._q(e.data.exercise.selectedOption,t.name)},on:{change:function(s){return e.$set(e.data.exercise,"selectedOption",t.name)}}}),e._v(" "),s("label",{attrs:{for:t.name}},[e._v(e._s(t.label))]),e._v(" "),s("br")])})),0),s("h3",[e._v("Daily Greatness")]),s("ul",e._l(e.data.dailyGreatness.options,(function(t){return s("li",{key:t.id},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.performed,expression:"entry.performed"}],attrs:{type:"checkbox",id:t.name},domProps:{checked:Array.isArray(t.performed)?e._i(t.performed,null)>-1:t.performed},on:{change:function(s){var a=t.performed,r=s.target,i=!!r.checked;if(Array.isArray(a)){var n=null,o=e._i(a,n);r.checked?o<0&&e.$set(t,"performed",a.concat([n])):o>-1&&e.$set(t,"performed",a.slice(0,o).concat(a.slice(o+1)))}else e.$set(t,"performed",i)}}}),e._v(" "),s("label",{attrs:{for:t.name}},[e._v(e._s(t.label))]),e._v(" "),s("br")])})),0),s("h3",[e._v("Personal Prayer")]),s("ul",e._l(e.data.personalPrayer.options,(function(t){return s("li",{key:t.id},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.performed,expression:"entry.performed"}],attrs:{type:"checkbox",id:t.name},domProps:{checked:Array.isArray(t.performed)?e._i(t.performed,null)>-1:t.performed},on:{change:function(s){var a=t.performed,r=s.target,i=!!r.checked;if(Array.isArray(a)){var n=null,o=e._i(a,n);r.checked?o<0&&e.$set(t,"performed",a.concat([n])):o>-1&&e.$set(t,"performed",a.slice(0,o).concat(a.slice(o+1)))}else e.$set(t,"performed",i)}}}),e._v(" "),s("label",{attrs:{for:t.name}},[e._v(e._s(t.label))]),e._v(" "),s("br")])})),0),s("h3",[e._v("Scripture Study")]),s("ul",e._l(e.data.scriptureStudy.options,(function(t){return s("li",{key:t.id},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.performed,expression:"entry.performed"}],attrs:{type:"checkbox",id:t.name},domProps:{checked:Array.isArray(t.performed)?e._i(t.performed,null)>-1:t.performed},on:{change:function(s){var a=t.performed,r=s.target,i=!!r.checked;if(Array.isArray(a)){var n=null,o=e._i(a,n);r.checked?o<0&&e.$set(t,"performed",a.concat([n])):o>-1&&e.$set(t,"performed",a.slice(0,o).concat(a.slice(o+1)))}else e.$set(t,"performed",i)}}}),e._v(" "),s("label",{attrs:{for:t.name}},[e._v(e._s(t.label))]),e._v(" "),s("br")])})),0)]):e._e()}),P=[];const F={positiveFoods:[{id:1,points:1,name:"",isFruitVegetable:!1},{id:2,points:1,name:"",isFruitVegetable:!1},{id:3,points:1,name:"",isFruitVegetable:!1},{id:4,points:1,name:"",isFruitVegetable:!1},{id:5,points:1,name:"",isFruitVegetable:!1},{id:6,points:1,name:"",isFruitVegetable:!1},{id:7,points:1,name:"",isFruitVegetable:!1},{id:8,points:1,name:"",isFruitVegetable:!1},{id:9,points:1,name:"",isFruitVegetable:!1},{id:10,points:1,name:"",isFruitVegetable:!1}],fruitsAndVegetables:{points:10,positiveFoodsPointsRequirement:5},negativeFoods:[{id:1,points:-1,name:""},{id:2,points:-1,name:""},{id:3,points:-1,name:""},{id:4,points:-1,name:""},{id:5,points:-1,name:""},{id:6,points:-1,name:""},{id:7,points:-1,name:""},{id:8,points:-1,name:""},{id:9,points:-1,name:""},{id:10,points:-1,name:""}],water:{points:10,cups:[{id:1,consumed:!1},{id:2,consumed:!1},{id:3,consumed:!1},{id:4,consumed:!1},{id:5,consumed:!1},{id:6,consumed:!1},{id:7,consumed:!1},{id:8,consumed:!1}]},afterEight:{points:5,options:[{name:"nothingEaten",label:"Nothing consumed?",consumed:!1},{name:"fruitOrVegetable",label:"1 serving fruit/vegetable?",consumed:!1}]},exercise:{selectedOption:"15_20",options:[{id:1,label:"15 - 20 min",name:"15_20",points:10},{id:2,label:"20 - 30 min",name:"20_30",points:15},{id:3,label:"31 min",name:"31_plus",points:20}]},dailyGreatness:{points:5,options:[{name:"dailyGreatness",label:"Daily greatness achieved",description:"",performed:!1}]},personalPrayer:{points:5,options:[{name:"personalPrayer",label:"Personal prayer, meditation or reflection",description:"",performed:!1}]},scriptureStudy:{points:5,options:[{name:"scriptureStudy",label:"Uplifting reading",description:"",performed:!1}]}};var $={name:"GreatToEight",props:{msg:String},data(){return{data:{},loaded:!1}},methods:{labelId(e,t){return`${e}-${t}`}},mounted(){this.data=F,this.loaded=!0}},S=$,I=(s("845d"),Object(l["a"])(S,x,P,!1,null,"f9487af2",null)),V=(I.exports,function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"great-to-eight"},[e.loaded?s("div",[s("div",{staticClass:"header"},[s("tabs",e._l(e.weeks,(function(t){return s("tab",{key:t.id,attrs:{name:t.name,selected:t.selected,click:function(){return e.loadWeekData(t.id)}}})})),1),s("tabs",e._l(e.days,(function(t){return s("tab",{key:t.name,attrs:{name:t.name,selected:t.selected,click:function(){return e.loadDayTally(t.name)}}})})),1),s("div",{staticClass:"info"},[s("ul",[s("li",[s("div",[e._v("Points for the week: "+e._s(e.totalPoints))])]),s("li",[s("div",[e._v(e._s(e.currentDay)+": "+e._s(e.totalPointsForCurrentDay))])]),s("li",[s("button",{on:{click:e.save}},[e._v("Save")])])])]),s("div",[e._v(e._s(e.message))])],1),s("div",{staticClass:"content-pane"},[e.payload?s("DayTally",{attrs:{data:e.payload}}):e._e()],1),s("div",{staticClass:"info page-footer"},[s("ul",[e._m(0),e._m(1),s("li",[s("select",{attrs:{id:"pageFooterActions",name:"pageFooterActions"},on:{change:function(t){return e.handlePageFooterActions(t,"pageFooterActions")}}},[s("option",{attrs:{value:"do-nothing"}},[e._v("- Select action -")]),s("option",{attrs:{value:"reset-day-from-last-save"}},[e._v("Reset day from last save")]),s("option",{attrs:{value:"reset-week-from-last-save"}},[e._v("Reset week from last save")]),s("option",{attrs:{value:"reset-day"}},[e._v("Reset day as new")]),s("option",{attrs:{value:"reset-week"}},[e._v("Reset week as new")])]),s("button",{on:{click:function(t){return e.handlePageFooterActions(t,"pageFooterActions")}}},[e._v("Reset")])])])])]):e._e()])}),D=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("li",[s("div")])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("li",[s("div")])}],A=function(){var e=this,t=e.$createElement,s=e._self._c||t;return e.loaded?s("div",{staticClass:"day-tally",attrs:{id:"day-tally"}},[e._l(e.data,(function(t,a){return s("div",{key:a},["positiveFoods"==t.type?s("div",[s("h3",[e._v(e._s(t.title))]),s("div",{staticClass:"slider"},[s("slider",{attrs:{name:e.positiveFoodsSliderId,values:e.positiveFoodsSliderValues,min:"0",max:"100",raising:""},on:{change:e.onChange},model:{value:e.positiveFoods.selectedId,callback:function(t){e.$set(e.positiveFoods,"selectedId",t)},expression:"positiveFoods.selectedId"}})],1),s("div",{staticClass:"slider"},[s("slider",{attrs:{name:e.fruitsVegetablesSliderId,values:e.fruitsVegetablesSliderValues,min:"0",max:"100",raising:""},on:{change:e.onChange},model:{value:e.fruitsVegetables.selectedId,callback:function(t){e.$set(e.fruitsVegetables,"selectedId",t)},expression:"fruitsVegetables.selectedId"}})],1)]):e._e(),"negativeFoods"==t.type?s("div",[s("h3",[e._v(e._s(t.title))]),s("div",{staticClass:"slider"},[s("slider",{attrs:{name:e.negativeFoodsSliderId,values:e.negativeFoodsSliderValues,min:"0",max:"100",raising:""},on:{change:e.onChange},model:{value:e.negativeFoods.selectedId,callback:function(t){e.$set(e.negativeFoods,"selectedId",t)},expression:"negativeFoods.selectedId"}})],1)]):e._e(),"water"==t.type?s("div",[s("h3",[e._v(e._s(t.title))]),s("div",{staticClass:"slider"},[s("slider",{attrs:{name:e.waterSliderId,values:e.waterSliderValues,min:"0",max:"100",raising:""},on:{change:e.onChange},model:{value:e.water.selectedId,callback:function(t){e.$set(e.water,"selectedId",t)},expression:"water.selectedId"}})],1)]):e._e(),"afterEight"==t.type?s("div",[s("h3",[e._v(e._s(t.title))]),s("ul",e._l(t.options,(function(t){return s("li",{key:t.id},[s("div",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.value,expression:"entry.value"}],attrs:{type:"checkbox",id:t.name},domProps:{value:t.name,checked:Array.isArray(t.value)?e._i(t.value,t.name)>-1:t.value},on:{change:[function(s){var a=t.value,r=s.target,i=!!r.checked;if(Array.isArray(a)){var n=t.name,o=e._i(a,n);r.checked?o<0&&e.$set(t,"value",a.concat([n])):o>-1&&e.$set(t,"value",a.slice(0,o).concat(a.slice(o+1)))}else e.$set(t,"value",i)},e.onChange]}}),e._v(" "),s("label",{attrs:{for:t.name}},[e._v(e._s(t.label))])])])})),0)]):e._e(),"exercise"==t.type?s("div",[s("h3",[e._v(e._s(t.title))]),s("div",{staticClass:"slider"},[s("slider",{attrs:{name:e.exerciseSliderId,values:e.exerciseSliderValues,min:"0",max:"100",raising:""},on:{change:e.onChange},model:{value:e.exercise.selectedId,callback:function(t){e.$set(e.exercise,"selectedId",t)},expression:"exercise.selectedId"}})],1)]):e._e(),"simple-checkbox"==t.type?s("div",[s("h3",[e._v(e._s(t.title))]),s("ul",e._l(t.options,(function(t){return s("li",{key:t.id},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.performed,expression:"entry.performed"}],attrs:{type:"checkbox",id:t.name},domProps:{checked:Array.isArray(t.performed)?e._i(t.performed,null)>-1:t.performed},on:{change:[function(s){var a=t.performed,r=s.target,i=!!r.checked;if(Array.isArray(a)){var n=null,o=e._i(a,n);r.checked?o<0&&e.$set(t,"performed",a.concat([n])):o>-1&&e.$set(t,"performed",a.slice(0,o).concat(a.slice(o+1)))}else e.$set(t,"performed",i)},e.onChange]}}),e._v(" "),s("label",{attrs:{for:t.name}},[e._v(e._s(t.label))]),e._v(" "),s("br")])})),0)]):e._e()])})),s("div",{staticClass:"footer-spacer"})],2):e._e()},E=[],O=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"slider",attrs:{id:e.sliderId}},[s("div",{staticClass:"slider__wrapper"},[e.hideLabel?e._e():s("div",{staticClass:"slider__label xxx",style:{left:e.position}},[e._v(e._s(e.sliderLabel))]),s("div",{staticClass:"slider__track",class:{"slider__track--rectangular":!e.raising}},[e.raising?s("div",{staticClass:"slider__track-top",style:{"border-left-width":e.sliderWidth+"px"}}):e._e(),e.raising?s("div",{staticClass:"slider__track-bottom",style:{"border-right-width":e.sliderWidth+"px"}}):e._e()]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.sliderValue,expression:"sliderValue"}],ref:"slider",staticClass:"slider__input",attrs:{max:e.sliderMax,type:"range",min:e.sliderMin,step:e.step},domProps:{value:e.sliderValue},on:{input:e.update,change:e.change,__r:function(t){e.sliderValue=t.target.value}}})])])},C=[],j={props:{name:{type:String,required:!0},value:{type:String,required:!1,default:""},values:{type:Array,required:!1,default:()=>[]},min:{type:String,required:!1,default:"0"},max:{type:String,required:!1,default:"100"},step:{type:String,required:!1,default:"1"},hideLabel:{type:Boolean,required:!1,default:!1},raising:{type:Boolean,required:!1,default:!1}},data(){return{sliderWidth:0,sliderValues:[],sliderValue:null,sliderMax:null,sliderMin:null}},computed:{sliderId(){return"slider-"+this.name},sliderLabel(){return this.sliderValues.length?this.sliderValues[this.sliderValue-1].label:this.sliderValue},sliderOutputValue(){return this.sliderValues.length?this.sliderValues[this.sliderValue-1].value:this.sliderValue},position(){const e=this.sliderValue,t=this.sliderWidth-20,s=(e-this.sliderMin)/(this.sliderMax-this.sliderMin),a=-2,r=t*s+a;return r+"px"}},mounted(){this.changeValues(),this.$nextTick(()=>{this.resizeHandler()})},methods:{changeValues(){if(this.values.length){this.sliderValues=this.values,this.sliderMin="1",this.sliderMax=this.sliderValues.length;let e=0;this.values.map((t,s)=>(t.value===this.value&&(e=s),!0)),this.sliderValue=e+1}else this.sliderMin=this.min,this.sliderMax=this.max,this.sliderValue=this.value;this.update()},update(){this.$emit("input",this.sliderOutputValue)},change(){this.$emit("change",this.sliderOutputValue)},resizeHandler(){this.sliderWidth=this.$refs.slider.clientWidth}},created(){window.addEventListener("resize",this.resizeHandler)},destroyed(){window.removeEventListener("resize",this.resizeHandler)},watch:{values:{immediate:!0,handler(){this.changeValues()}},value:{immediate:!0,handler(e,t){this.changeValues()}}}},T=j,L=(s("6b61"),Object(l["a"])(T,O,C,!1,null,"6d646e23",null)),W=L.exports,R=(s("6640"),s("10e9")),M={name:"DayTally",components:{Slider:W},props:{id:String,data:{default:{}}},computed:{totalPoints(){return this.data?Object(R["calculatePoints"])({day:this.data,rules:this.$parent.rules}):0},positiveFoods(){return this.data.find(e=>"positiveFoods"==e.name)},fruitsVegetables(){return this.data.find(e=>"positiveFoods"==e.name).fruitsAndVegetables},negativeFoods(){return this.data.find(e=>"negativeFoods"==e.name)},water(){return this.data.find(e=>"water"==e.name)},exercise(){return this.data.find(e=>"exercise"==e.name)},positiveFoodsSliderId(){return(this.$parent.name||this.id||"").toLowerCase()+"-positiveFoodsSlider"},fruitsVegetablesSliderId(){return(this.$parent.name||this.id||"").toLowerCase()+"-fruitsVegetablesSlider"},negativeFoodsSliderId(){return(this.$parent.name||this.id||"").toLowerCase()+"-negativeFoodsSlider"},waterSliderId(){return(this.$parent.name||this.id||"").toLowerCase()+"-waterSlider"},exerciseSliderId(){return(this.$parent.name||this.id||"").toLowerCase()+"-exerciseSlider"}},data(){return{volume:3,loaded:!1,dailyTally:null,positiveFoodsSlider:"0",fruitsVegetablesSlider:"0",negativeFoodsSlider:"0",waterSlider:"0",exerciseSlider:"0"}},methods:{labelId(e,t){return`${e}-${t}`},onChangeVolume(e){document.getElementById("volume").value=e.target.value},onChange(e){console.log(">>>change detected",Object(R["calculatePoints"])({day:this.data,rules:this.$parent.rules}))},load(){this.positiveFoodsSlider=this.positiveFoods.selectedId.toString(),this.fruitsVegetablesSlider=this.fruitsVegetables.selectedId.toString(),this.negativeFoodsSlider=this.negativeFoods.selectedId.toString(),this.waterSlider=this.water.selectedId.toString(),this.exerciseSlider=this.exercise.selectedId.toString(),this.positiveFoodsSliderValues=this.positiveFoods.options.map((e,t)=>({label:t+" Pos Food",value:""+e.id})),this.fruitsVegetablesSliderValues=this.fruitsVegetables.options.map((e,t)=>({label:t+" Frt/Veg",value:""+e.id})),this.negativeFoodsSliderValues=this.negativeFoods.options.map((e,t)=>({label:t+" Neg Food",value:""+e.id})),this.waterSliderValues=this.water.options.map((e,t)=>({label:t+" Cups Water",value:""+e.id})),this.exerciseSliderValues=this.exercise.options.map((e,t)=>({label:e.label,value:""+e.id}))}},mounted(){this.load(),this.loaded=!0,setTimeout(()=>{this.dailyTally=document.querySelector("#day-tally"),this.dailyTally&&this.dailyTally.addEventListener("load",this.load)},1e3)},beforeDestroy(){this.dailyTally&&this.dailyTally.removeEventListener("load",this.load)}},q=M,N=(s("ae06"),Object(l["a"])(q,A,E,!1,null,"613e885a",null)),H=N.exports,U=s("305a");const G=()=>{var e=document.querySelector(".header"),t=e.offsetTop;function s(){window.pageYOffset>t?e.classList.add("sticky"):e.classList.remove("sticky")}window.onscroll=function(){s()}};var z={name:"GreatToEight",components:{DayTally:H},props:{msg:String},computed:{totalPoints(){const e=Object(R["calculateWeeklyPoints"])({week:this.days,rules:this.rules});return e},totalPointsForCurrentDay(){return Object(R["calculatePoints"])({day:this.payload,rules:this.rules})},currentDay(){const e=this.payload.find(e=>"dayOfWeek"===e.name);return e?e.value:null},currentWeek(){const e=this.payload.find(e=>"weekOfPeriod"===e.name);return e?e.value:null}},data(){return{weeks:[],payload:[],message:"",days:[{name:"Mon",selected:!0},{name:"Tue",selected:!1},{name:"Wed",selected:!1},{name:"Thu",selected:!1},{name:"Fri",selected:!1},{name:"Sat",selected:!1},{name:"Sun",selected:!1}],loaded:!1,rules:[]}},methods:{toast(e){this.message=e,console.log(">>>toast, message",e),setTimeout(()=>{this.message=null},3e3)},save(){Object(U["saveUserData"])(this,e=>{this.toast(e.ok?"Data was successfully saved!":"Data was not saved")})},loadWeekData(e){console.log(">>>loadWeekData(weekId)",e),Object(U["loadUserData"])(this,{weekId:e},({data:t,rules:s})=>{this.rules=s||[];const a=this.currentDay||"Mon",r=!!t[0].data;console.log(">>>days",t[0].data,r),r?(console.log(">>>Found user data!"),this.days=t,this.loadDayTally(a),this.loaded=!0):(console.log(">>>Loading new data"),this.loadNewFormData(null,e),this.loadDayTally(a))})},loadDayTally(e){this.payload=this.days.find(t=>t.name===e).data,this.payload.find(e=>"dayOfWeek"===e.name).value=e,setTimeout(()=>{const e=document.querySelector("#day-tally");e.dispatchEvent(new CustomEvent("load"))},150)},handlePageFooterActions(e,t){const s=document.getElementById(t),a=s.options[s.selectedIndex];switch(a.value){case"reset-week":this.loadNewFormData();break;case"reset-day":this.loadNewFormData(this.currentDay);break;case"reset-week-from-last-save":this.loadCurrentUserAndWeekData();break;case"reset-day-from-last-save":this.loadCurrentUserAndWeekData(this.currentDay);break}},loadNewFormData(e=null,t){Object(U["loadNewFormData"])(this,{weekId:t},({days:t,rules:s})=>{if(this.rules=s||[],e){const s=this.days.findIndex(t=>t.name===e);console.log(">>>idx",s),this.days[s]=t[s]}else this.days=t;this.loadDayTally("Mon"),this.loaded=!0})},loadCurrentUserAndWeekData(e=null,t){Object(U["loadUserData"])(this,{weekId:t},({data:t,rules:s})=>{if(this.rules=s||[],e){const s=this.days.findIndex(t=>t.name===e);this.days[s]=t[s]}else{if(!t[0].data)return console.log(">>>No user data found.  Resetting form."),this.loadNewFormData(e);console.log(">>>Found user data!"),this.days=t}this.loadDayTally("Mon"),this.loaded=!0,setTimeout(()=>{G()},150)})}},mounted(){this.message="loading current user...",this.loadCurrentUserAndWeekData(),this.message="build weeks...";this.weeks=[...new Array(8)].map((e,t)=>({id:""+(t+1),name:"w"+(t+1).toString(),selected:0===t})),this.toast("done with page initialization")}},B=z,J=(s("d257"),Object(l["a"])(B,V,D,!1,null,null,null)),Y=J.exports,K=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},Q=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"login"},[s("p",[e._v("You will need to login to a valid Facebook account in order to use this application.")]),s("p",[e._v("Click on the 'Login' link above.")])])}],X={name:"Login",props:{},mounted(){let e=new URLSearchParams(window.location.search);e.has("redirect")&&setTimeout(()=>this.$router.push({path:""+e.get("redirect")}).catch(()=>{}),150)}},Z=X,ee=(s("3c95"),Object(l["a"])(Z,K,Q,!1,null,"4ef844e2",null)),te=ee.exports,se=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"delete-my-data"},[s("p",[e._v("Sorry to see you go. You're welcome back anytime.")]),s("p",[e._v("If you click this button, your data will be removed and cannot be restored.")]),s("button",{on:{click:e.deleteMyData}},[e._v("Remove my data from this app")]),e.message?s("p",[e._v(e._s(e.message))]):e._e()])},ae=[],re={name:"DeleteMyData",props:{msg:String},data(){return{message:null}},methods:{deleteMyData(){Object(U["deleteUserData"])(this,e=>{console.log(">>>results",e),e.ok?(this.message="Your data has been succesfully removed from the system.  We hope you come back!",setTimeout(()=>{facebookExpireAccessToken({forwardRequest:"/about"})},5e3)):this.message="Sorry; something went wrong.  Please contact the developer and ask him to remove your data or fix this bug!"})}}},ie=re,ne=(s("c21a"),Object(l["a"])(ie,se,ae,!1,null,"004b9e4c",null)),oe=ne.exports,le=s("2f62");a["a"].use(le["a"]);var de=new le["a"].Store({state:{userId:null},getters:{isLoggedIn(e){return null!=e.userId}},mutations:{setUserId(e,t){e.userId=t},clearUserId(e){e.userId=null}},actions:{},modules:{}});a["a"].use(c["a"]);const ue=[{path:"/",name:"Home",component:Y,meta:{requiresAuth:!0}},{path:"/login",name:"Login",component:te},{path:"/deleteMyData",name:"DeleteMyData",component:oe,meta:{requiresAuth:!0}},{path:"/about",name:"About",component:function(){return s.e("about").then(s.bind(null,"f820"))}}],ce=new c["a"]({mode:"history",base:"/",routes:ue}),pe=(e,t,s)=>{if(!window.FB)return setTimeout(()=>pe(e,t,s),1e3);const a=null!=window.FB.getAccessToken();e.matched.some(e=>e.meta.requiresAuth)?a?s():s({name:"Login",query:{redirect:e.fullPath}}):s()};ce.beforeEach(pe);var me=ce;s("15f5"),s("7051");s("a0d8"),a["a"].config.productionTip=!1,a["a"].component("tabs",{template:'\n        <div>\n            <div class="tabs">\n              <ul>\n                <li v-for="tab in tabs" :class="{ \'is-active\': tab.isActive }">\n                    <a :href="tab.href" @click="selectTab(tab)">{{ tab.name }}</a>\n                </li>\n              </ul>\n            </div>\n\n            <div class="tabs-details">\n                <slot></slot>\n            </div>\n        </div>\n    ',data(){return{tabs:[]}},created(){this.tabs=this.$children},methods:{selectTab(e){this.tabs.forEach(e=>e.isActive=!1);const t=this.tabs.find(t=>t.name==e.name);t&&(t.isActive=!0,t.click())}}}),a["a"].component("tab",{template:'\n\n        <div v-show="isActive"><slot></slot></div>\n\n    ',props:{name:{required:!0},selected:{default:!1},click:{default:()=>{}}},data(){return{isActive:!1}},computed:{href(){return"#"+this.name.toLowerCase().replace(/ /g,"-")}},mounted(){this.isActive=this.selected}}),new a["a"]({router:me,store:de,render:function(e){return e(u)}}).$mount("#app")},"61ae":function(e,t,s){},6640:function(e,t,s){},"6b61":function(e,t,s){"use strict";s("e6c5")},"845d":function(e,t,s){"use strict";s("61ae")},"85ec":function(e,t,s){},a0d8:function(e,t,s){},ae06:function(e,t,s){"use strict";s("2b9e")},c21a:function(e,t,s){"use strict";s("db36")},cf05:function(e,t,s){e.exports=s.p+"img/logo.82b9c7a5.png"},d257:function(e,t,s){"use strict";s("5166")},db36:function(e,t,s){},e6c5:function(e,t,s){},f907:function(e,t,s){}});
//# sourceMappingURL=app.8be3489a.js.map