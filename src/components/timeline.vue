<template>
  <div class="chartElem">

    <div>
      <h2>Historical timeline of how current documents are</h2>
    </div>
    <highcharts
      class="timeline"
      :options="timelineChartOptions"
      :updateArgs="updateArgs"
    ></highcharts>
  </div>
</template>

<script>
import axios from "axios";

const PracticeArea = "Arbitration";
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


      timelineChartOptions: {
        chart: {
          type: "line",
          height: 700,
          width: 700
        },

        title: {
          text: "Documents last reviewed"
        },
        xAxis: {
          type: "datetime"
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
    
    const { data: LRD3Timeline1 } = await axios.get(
      "http://hutchida.com/lnpsl/ContentHub/json/aicer-LRD3-log-datecat1.json"
    );
    let timeline = [];
    LRD3Timeline1.forEach(function(obj) {
      let stringDate = obj.Date;
      var RegEx = /(\d\d)\/(\d\d)\/(\d\d\d\d)/g;
      var match = RegEx.exec(stringDate);

      let PracticeAreaValue = obj[PracticeArea];
      timeline.push({
        x: Date.UTC(
          parseInt(match[3]),
          parseInt(match[2]) - 1,
          parseInt(match[1])
        ),
        y: obj[PracticeArea]
      });
    });
    timeline.sort(function(obj1, obj2) {
      // Ascending: first age less than the previous
      return obj1.x - obj2.x;
    });

    console.log(timeline);
    this.timelineChartOptions.series[0].data = timeline;
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