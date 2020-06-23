<template>
  <div class="chartElem">
    <div>
      <h2>Breakdown of how current documents are into 4 time periods</h2>
    </div>
    <highcharts class="pie" :options="pieChartOptions" :updateArgs="updateArgs"></highcharts>
  </div>
</template>

<script>
import axios from "axios";

const PracticeArea =  'Arbitration' //$route.params.id;
export default {
  data() {
    return {
      exportData: [],
      stats: {
        Date: ""
      },
      title: "",
      chartType: "Spline",
      seriesColor: "#6fcd98",
      colorInputIsSupported: null,
      animationDuration: 1000,
      updateArgs: [true, true, { duration: 1000 }],

      pieChartOptions: {
        chart: {
          type: "pie",
          height: 700,
          width: 700
        },

        title: {
          text: "Documents last reviewed"
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
            text: "number of docs",
            align: "high"
          },
          labels: {
            overflow: "justify"
          }
        },
        tooltip: {
          formatter: function() {
            return this.y + " docs ";
          }
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
              enabled: true,
              format: "<b>{point.percentage:.1f} %</b>"
            },
            showInLegend: true
          },
          series: {
            innerSize: "50%",
            cursor: "pointer",
            point: {
              events: {
                click: function() {
                  var x = document.getElementById(this.category);
                  if (x.classList.contains("collapse")) {
                    x.className = "collapse.show";
                  } else {
                    x.className = "collapse";
                  }
                }
              }
            }
          }
        },
        legend: {
          title: "Last reviewed",
          enabled: true,
          layout: "vertical",
          align: "center",
          verticalAlign: "center",
          x: 0,
          y: 300,
          floating: true,
          borderWidth: 1,
          backgroundColor: "#FFFFFF",
          shadow: true
        },
        credits: {
          enabled: false
        },
        series: [
          {
            name: "",
            data: []
          }
        ]
      }
    };
  },

  async mounted() {
    const { data: LRD3Overview } = await axios.get(
      "http://hutchida.com/lnpsl/ContentHub/json/LRD3-overview.json"
    );
    console.log(
      LRD3Overview.filter(function(obj) {
        return obj.PA == PracticeArea;
      })[0].PAcat1total,
      PracticeArea
    );

    const seriesOV = [
      {
        name: "within the last 6 months",
        y: LRD3Overview.filter(function(obj) {
          return obj.PA == PracticeArea;
        })[0].PAcat1total,
        color: "#99ff99"
      },
      {
        name: "between 6-12 months ago",
        y: LRD3Overview[1].PAcat2total,
        color: "#ffff80"
      },
      {
        name: "between 12 months to 24 months ago",
        y: LRD3Overview[1].PAcat3total,
        color: "#ffc299"
      },
      {
        name: "more than 2 years ago",
        y: LRD3Overview[1].PAcat4total,
        color: "#ff9999"
      }
    ];
    this.pieChartOptions.series[0].data = seriesOV;
  }
};
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