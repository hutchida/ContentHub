<template>
  <div class="chartElem">
    <div class="row">
      <highcharts class="chart" :options="chartOptions" :updateArgs="updateArgs"></highcharts>
      
    </div>
    
  </div>
</template>

<script>
  import axios from "axios";
  var Data = [153, 4, 0, 2, 2, 7, 22, 4, 17, 6, 1, 2, 0, 44, 0, 7, 0, 1, 1, 0, 5, 3, 1, 0, 0, 0, 3, 6, 0, 3, 0, 3, 0, 8, 1, 0];
  
  
  export default {
  data () {
  return {
  todosList: [],
  updateArgs: [true, true, {duration: 1000}],
  chartOptions: {
  chart: {
  type: 'bar',
  height: 1200,
  width: 800,
  },
  
  
  series: [{
  name: 'Number of Documents Currently Under Review',
  
  data: Totals
  }]
  
  
  }
  }
  
  
  },
  async mounted() {
  const url = 'http://hutchida.com/lnpsl/ContentHub/json/data.json'
  const { data } = await axios.get(url)
  this.todosList = [...data].slice(0, 10)
  var i = 0
  var PAs = [];
  var Totals = [];
  for (i = 0; i < data.length; i++){
  PAs.push(data[i].PA);
  Totals.push(data[i].Total);
  }
  console.log(data.length)
  console.log(PAs)
  console.log(Totals)
  console.log(Data)
  return Totals
  }
  }  

</script>

<style scoped>
  input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
  }
  #colorPicker {
  border: 0;
  padding: 0;
  margin: 0;
  width: 30px;
  height: 30px;
  }
  .numberInput {
  width: 30px;
  }
</style>