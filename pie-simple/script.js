// Component Definitions
Vue.component('chart', {
  template: '#chart',
  props: [
  'size',
  'sectors'],

  data() {
    return {
      styleObj: {
        width: `${this.size * 1.1}px`,
        height: `${this.size * 1.1}px` },

      processedSectors: [],
      text: '',
      value: '' };

  },
  computed: {
    total() {
      return this.sectors.reduce((t, s) => t + s.value, 0);
    } },

  watch: {
    sectors: {
      handler(val) {
        this.calculateSectors();
      },
      deep: true,
      immediate: true } },


  methods: {
    calculateSectors() {
      // This function calculates circle segments for each sector
      // The segments go all the way to the center, but the circle mask cuts the center out
      let l = this.size / 2;
      let rotation = 0;

      if (this.sectors.length === 1) {
        let item = this.sectors[0];
        this.processedSectors.push({
          value: item.value,
          percentage: 1,
          label: item.label,
          color: item.color,
          d: `M${l},0 A${l},${l} 0 ${arcSweep},1 ${x}, ${y} z`,
          transform: `translate(${this.size * 0.05}, ${this.size * 0.05}) rotate(${rotation}, ${l}, ${l})` });

      } else {
        this.sectors.forEach((item, key) => {
          let angle = 360 * item.value / this.total;
          let aCalc = angle > 180 ? 360 - angle : angle;
          let angleRad = aCalc * Math.PI / 180;
          let sizeZ = Math.sqrt(2 * l * l - 2 * l * l * Math.cos(angleRad));

          let sideX;
          if (aCalc <= 90) {
            sideX = l * Math.sin(angleRad);
          } else {
            sideX = l * Math.sin((180 - aCalc) * Math.PI / 180);
          }

          let sideY = Math.sqrt(sizeZ * sizeZ - sideX * sideX);
          let y = sideY;

          let x;
          let arcSweep;
          if (angle <= 180) {
            x = l + sideX;
            arcSweep = 0;
          } else {
            x = l - sideX;
            arcSweep = 1;
          }

          this.processedSectors.push({
            value: item.value,
            percentage: item.value / this.total,
            label: item.label,
            color: item.color,
            d: `M${l},${l} L${l},0 A${l},${l} 0 ${arcSweep},1 ${x}, ${y} z`,
            transform: `translate(${this.size * 0.05}, ${this.size * 0.05}) rotate(${rotation}, ${l}, ${l})` });


          rotation = rotation + angle;
        });
      }
    } } });



// Point of entry
new Vue({
  el: '#app',
  data() {
    return {
      size: 400,
      sectors: [{
        value: 43,
        label: 'Thing 1',
        color: '#61C0BF' },
      {
        value: 22,
        label: 'Thing Two',
        color: '#DA507A' },
      {
        value: 18,
        label: 'Another Thing',
        color: '#BB3D49' },
      {
        value: 32,
        label: 'Pineapple',
        color: '#DB4547' }] };


  } });