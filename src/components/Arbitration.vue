<template>
  <div class="chartElem">    
    <h2><b>Arbitration</b></h2>
    <hr />
       
<div>
  <h2>General Currency</h2>
  <p>Based on date of last legal review/major update to the document.</p></div>
    <highcharts class="ArbitrationPie" :options="pieChartOptions" :updateArgs="updateArgs"></highcharts>
    <highcharts class="ArbitrationTimeline" :options="timelineChartOptions" :updateArgs="updateArgs"></highcharts>
      
</div>
</template>
