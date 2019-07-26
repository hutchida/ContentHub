<template>
  <div class="chartElem">
    <div class="row">
      <highcharts class="chart" :options="chartOptions" :updateArgs="updateArgs"></highcharts>
      
    </div>
    
  </div>
</template>

<script>
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
  text: 'Number of documents currently under review'
  },
  xAxis: {
  categories: ['ALL PSL', 'Arbitration', 'Banking and Finance', 'Commercial', 'Competition', 'Construction', 'Corporate', 'Corporate Crime', 'Dispute Resolution', 'Employment', 'Energy', 'Environment', 'Family', 'Financial Services', 'Immigration', 'Information Law', 'In-House Advisor', 'Insurance', 'IP', 'Life Sciences and Pharmaceuticals', 'Local Government', 'Pensions', 'Personal Injury', 'Planning', 'Practice Compliance', 'Practice Management', 'Private Client', 'Property', 'Property Disputes', 'Public Law', 'Restructuring and Insolvency', 'Risk and Compliance', 'Share Schemes', 'Tax', 'TMT', 'Wills and Probate'],
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
  enabled: false,
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
  data: [153, 4, 0, 2, 2, 7, 22, 4, 17, 6, 1, 2, 0, 44, 0, 7, 0, 1, 1, 0, 5, 3, 1, 0, 0, 0, 3, 6, 0, 3, 0, 3, 0, 8, 1, 0]}]
  
  }
  }
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