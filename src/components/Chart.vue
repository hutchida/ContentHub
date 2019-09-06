<template>
  <div class="chartElem">    
    <h2><b>Under Review Summary</b></h2>
    <hr />
    <div><p>This report is refreshed every Monday afternoon. Last refreshed: {{ this.stats.Date }}</p>
      <vue-json-to-csv 
        :json-data="exportData"
        :csv-title="'UnderReview'" >
        <button type="button" class="btn btn-light">Download data</button>
         
      </vue-json-to-csv>
      <br /><br />
    </div>
  
    <div>
      <h2>across all UK PSL</h2>
      <div style="max-width: 310px;">
        <table class="table table-bordered ">
          <thead>
              <tr>
                  <th scope="col">under review</th>
                  <th scope="col">not under review</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td>{{ this.stats.underReviewTotal }} docs</td>
                  <td>{{ this.stats.notUnderReviewTotal }} docs</td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>
<div>
  <h2>across individual practice areas</h2>
  <p>Click on the bars below to expand the practice area.</p></div>
  <highcharts class="chart" :options="chartOptions" :updateArgs="updateArgs"></highcharts>
      
</div>
</template>

<script>
  import axios from "axios";
  
  export default {
  data () {
  return {
  exportData: [],
  stats:
    {
      Date: '',
      underReviewTotal: 0,
      notUnderReviewTotal: 0
    },
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
    const { data : underReviewMainChartData } = await axios.get('http://hutchida.com/lnpsl/ContentHub/json/underReviewMainChart.json')    
    const { data : underReviewFullData } = await axios.get('http://hutchida.com/lnpsl/ContentHub/json/UR.json')
    const { data : underReviewStats } = await axios.get('http://hutchida.com/lnpsl/ContentHub/json/underReviewStats.json')
    
    this.chartOptions.series[0].data  = underReviewMainChartData.map(item => item.Total)
    this.chartOptions.xAxis.categories = underReviewMainChartData.map(item => item.PA)

    underReviewStats.forEach((x) => 
    {
      if (x.key == 'Date'){ this.stats.Date = x.value; }
      if (x.key == 'underReviewTotal'){ this.stats.underReviewTotal = x.value; }
      if (x.key == 'notUnderReviewTotal'){ this.stats.notUnderReviewTotal = x.value; }  
    })
    
    this.exportData = underReviewFullData
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
  .table-condensed {
  font-size: 10px;
  }
    
</style>