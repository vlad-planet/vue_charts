function sync(vm, event, type) {
  vm.$refs.highcharts.forEach(({ chart }) => {
    if (chart === this.series.chart) return;
    chart.series.forEach((series) => {
      series.data.forEach((point) => {
        if (point.x === this.x) {
          if (type === 'over') {
            point.setState('hover');
            chart.tooltip.refresh(point);
            chart.xAxis[0].drawCrosshair(event, point);
          } else {
            point.setState();
            chart.tooltip.hide();
            chart.xAxis[0].hideCrosshair();
          }
        }
      });
    });
  });
}

function genOptions(vm, dataset) {
  return {
    chart: {
      marginLeft: 40, // Keep all charts left aligned
      spacingTop: 20,
      spacingBottom: 20
    },
    title: {
      text: dataset.name,
      align: 'left',
      margin: 0,
      x: 30
    },
    credits: {
      enabled: false
    },
    legend: {
      enabled: false
    },
    xAxis: {
      crosshair: true,
      labels: {
        format: '{value} km'
      }
    },
    yAxis: {
      title: {
        text: null
      }
    },
    tooltip: {
      positioner: function() {
        return {
          // right aligned
          x: this.chart.chartWidth - this.label.width,
          y: 10 // align to title
        };
      },
      borderWidth: 0,
      backgroundColor: 'none',
      pointFormat: '{point.y}',
      headerFormat: '',
      shadow: false,
      style: {
        fontSize: '18px'
      },
      valueDecimals: dataset.valueDecimals
    },
    plotOptions: {
      series: {
        point: {
          events: {
            mouseOver: function(event) {
              sync.call(this, vm, event, 'over');
            },
            mouseOut: function(event) {
              sync.call(this, vm, event, 'out');
            }
          }
        }
      }
    },
    series: [{
      data: dataset.data,
      name: dataset.name,
      type: dataset.type,
      color: dataset.color,
      fillOpacity: 0.3,
      tooltip: {
        valueSuffix: ' ' + dataset.unit
      }
    }]
  };
}

const vm = new Vue({
  el: '#app',
  data: {
    optionsList: []
  },
  mounted() {
    this.fetchData();
  },
  methods: {
  	fetchData() {
      fetch('https://cdn.jsdelivr.net/gh/highcharts/highcharts@v6.0.4/samples/data/activity.json')
        .then(res => res.json())
        .then((activity) => {
          this.optionsList = activity.datasets.map((dataset, i) => {
            dataset.data = dataset.data.map((val, j) => [activity.xData[j], val]);
            dataset.color = Highcharts.getOptions().colors[i];
            return genOptions(vm, dataset);
          })
        })
    }
  }
});