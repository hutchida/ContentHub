<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h1>ContentHub: Under Review Summary</h1>
        <p><a href="Currency.html">Currency Report</a> | <a href="Top200Currency.html">Top 200 Currency Report</a> | <a href="ZeroCurrency.html">Zero Views Report</a> | <a href="ECC_Currency.html">Externally Commissioned Currency Report</a> | <a href="Newcontentreport.html">New Content Report</a> | <a href="underreviewsummary.html">Under Review summary</a> | <a href="file://///atlas/Knowhow/LinkHub/linkhub.html">LinkHub</a></p>
        <hr /><div class="container"><p>This report is refreshed every Monday afternoon. Last refreshed: 23/07/2019</p><p><a href="UR.csv" target="_blank">download</a> csv of data that drives the charts below</p></div>
      </div>
      
      <div class="container">
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
                <td>153 docs</td>
                <td>35154 docs</td>
              </tr>
            </tbody>
          </table>
        </div></div>
        
      </div>
      
    <highcharts :options="chartOptions"></highcharts>
    
    
      </div>
      
    </div>  
  </div>
</template>

<script>
  
</script>

