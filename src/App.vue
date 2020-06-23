<template>
  <div id="app">
    <div class="logos">
      <img class="logo-hc" src="./assets/contenthub_logo.png" alt="Contenthub Logo" />
    </div>

    <div class="button-grp">
      <button
        @click="select('Arbitration')"
        :class="{btnActive: selected === 'Arbitration'}"
      >Arbitration</button>
      <button @click="select('Pensions')" :class="{btnActive: selected === 'Pensions'}">Pensions</button>
      <app-pie id="$route.params.id"></app-pie>
      <app-timeline></app-timeline>
    </div>
    <keep-alive>
      <component :is="currentView"></component>
    </keep-alive>
  </div>
</template>

<script>
const cat = $route.params.id;
import Arbitration from "./components/Arbitration.vue";
import Pie from "./components/pie.vue";
import Timeline from "./components/timeline.vue";

export default {
  name: "app",
  data() {
    return {
      selected: "Arbitration",
      currentView: "Arbitration"
    };
  },
  components: {
    Arbitration: Arbitration,
    "app-pie": Pie,
    "app-timeline": Timeline
  },
  methods: {
    activate(elem) {
      this.selected = elem;
    },
    handler() {
      var args = arguments;
      for (var arg of args) {
        if (arg instanceof Function) {
          arg();
        }
      }
    },
    select(elem) {
      this.currentView = elem;
      this.activate(elem);
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin: 0 auto;
  margin-top: 60px;
  width: 70%;
}
h1,
h2 {
  font-weight: normal;
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
.row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.row > * {
  padding: 0 20px;
}
.logos {
  margin: 0 auto;
  width: 100%;
}
.logo-hc {
  width: 70%;
  height: auto;
}
.logo-vue {
  width: 15%;
  height: auto;
}
.button-grp {
  margin: 20px 0;
}
button {
  padding: 10px 20px;
  outline: none;
  background: #828ea0;
  color: #fff;
  font-size: 16px;
  margin: 5px;
  border: 0px;
}
button:hover {
  background: #a7aeb8;
  transition: background 0.2s;
}
button:active {
  color: rgb(117, 117, 117);
}
.btnActive {
  color: #6fcd98;
}
</style>