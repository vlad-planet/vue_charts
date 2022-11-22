Vue.use(VueApexCharts);

const apiResponse = {
  series: {
    wideContacts: [0, 1, 0, 2, 0, 4, 0],
    narrowContacts: [0, 0, 0, 0, 0, 0, 0],
    applications: [0, 0, 0, 0, 0, 0, 0],
    contracts: [0, 0, 0, 0, 0, 0, 0],
    netValue: [0, 0, 0, 0, 1, 0, 0],
    nominalValue: [0, 0, 0, 0, 0, 0, 0] },

  timeline: ['2019-03-10T00:00:00', '2019-03-11T00:00:00', '2019-03-12T00:00:00', '2019-03-13T00:00:00', '2019-03-14T00:00:00', '2019-03-15T00:00:00', '2019-03-16T00:00:00'] };


const colors = ['#E63946', '#3A3042', '#B8B42D', '#F7B32B', '#6DAEDB', '#006BA6'];

const initialYaxis = [
{ seriesName: 'wideContacts', show: true, showAlways: true, decimalsInFloat: false },
{ seriesName: 'wideContacts', show: false },
{ seriesName: 'wideContacts', show: false },
{ seriesName: 'wideContacts', show: false },
{ seriesName: 'netValue', opposite: true, show: true, decimalsInFloat: false, showAlways: true },
{ seriesName: 'netValue', opposite: true, show: false }];


app = new Vue({
  el: '#app',
  components: {
    apexchart: VueApexCharts },

  data() {
    return {
      loaded: false,
      chartOptions: {
        grid: {
          padding: {
            top: 0,
            right: 10,
            bottom: 0,
            left: 10 } },


        markers: {
          size: 0,
          strokeColor: [colors[0], colors[1], colors[2], colors[3], colors[4], colors[5]],
          colors: ['white', 'white', 'white', 'white', 'white', 'white'] },

        chart: {
          id: 'stats',
          height: 350,
          type: 'area',
          toolbar: {
            show: false },

          zoom: {
            enabled: false } },


        colors: colors,
        stroke: {
          curve: 'smooth',
          colors: colors },

        fill: {
          type: 'gradient',
          colors: colors,
          gradient: {
            opacityFrom: 0.4,
            opacityTo: 0 } },


        dataLabels: {
          enabled: false },

        legend: {
          show: false },

        xaxis: {
          crosshairs: {
            show: true,
            position: 'back',
            stroke: {
              color: '#e2e2e2',
              width: 1,
              dashArray: 0 } },


          labels: {
            minHeight: 40,
            offsetY: 10 },

          type: 'datetime',
          axisTicks: {
            height: 20 },

          tooltip: {
            enabled: false } },


        yaxis: initialYaxis },

      series: [] };

  },

  mounted() {
    Object.keys(apiResponse.series).forEach(key => {
      this.series.push({ name: key, data: apiResponse.series[key] });
    });

    let xaxis = { ...this.chartOptions.xaxis, categories: apiResponse.timeline };
    this.chartOptions = { ...this.chartOptions, ...{ xaxis: xaxis } };

    this.loaded = true;
  } });