<template>
  <div class="chartElem">    
  <h2><b>Under Review Summary</b></h2>
  <hr />
  <div class="container"><p>Click on the bars below to expand the practice area.</p></div>
    <div class="row">
      

<vue-json-to-csv 
    :json-data="[ { name: 'Joe', surname: 'Roe' }, { name: 'John', surname: 'Doé' } ]"
    :csv-title="'UnderReview'" >
    <button> 
      Download data
    </button> 
</vue-json-to-csv>

      <highcharts class="chart" :options="chartOptions" :updateArgs="updateArgs"></highcharts>
      
    </div>
    
  </div>
</template>

<script>
  import axios from "axios";
  //var Data = [153, 4, 0, 2, 2, 7, 22, 4, 17, 6, 1, 2, 0, 44, 0, 7, 0, 1, 1, 0, 5, 3, 1, 0, 0, 0, 3, 6, 0, 3, 0, 3, 0, 8, 1, 0];
//const apples="[ { name: 'Joe', surname: 'Roe' }, { name: 'John', surname: 'Doé' } ]"
  export default {
  data () {
  return {
  title: '',
  chartType: 'Spline',
  seriesColor: '#6fcd98',
  colorInputIsSupported: null,
  animationDuration: 1000,
  updateArgs: [true, true, {duration: 1000}],
  chartOptions: {
  chart: {
  type: 'bar',
  height: 1200,
  width: 800,
  },
  
  title: {
  text: ''
  },
  xAxis: {
  categories: [],
  title: {
  text: null
  }
  },
  yAxis: {
  min: 0,
  title: {
  text: 'number of docs',
  align: 'high'
  },
  labels: {
  overflow: 'justify'
  }
  },
  tooltip: {
  valueSuffix: ' docs'
  },
  plotOptions: {
  bar: {
  dataLabels: {
  enabled: true
  }
  },
  series: {
  cursor: 'pointer',
  point: {
  events: {
  click: function () {
  var x = document.getElementById(this.category);
  if (x.classList.contains('collapse'))  {
  x.className = 'collapse.show';
  } else {
  x.className = 'collapse';
  }
  }
  }
  }
  }
  },
  legend: {
    title: 'Number of documents currently under review',
  enabled: true,
  layout: 'vertical',
  align: 'right',
  verticalAlign: 'top',
  x: -40,
  y: 80,
  floating: true,
  borderWidth: 1,
  backgroundColor: ('#FFFFFF'),
  shadow: true
  },
  credits: {
  enabled: false
  },
  series: [{
  name: 'Number of Documents Currently Under Review',
  data: []}]
  
  }
  }
  
  
  },
  async mounted() {
    const { data } = await axios.get('http://hutchida.com/lnpsl/ContentHub/json/data.json')
    this.todosList = [...data].slice(0, 10)
    //this.chartOptions.series.data = data.map(item => item.Total)

    this.chartOptions.series[0].data  = data.map(item => item.Total)
    this.chartOptions.xAxis.categories = data.map(item => item.PA)
    
    //jsonData = [data]
  }, 
  
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