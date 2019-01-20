<template>
  <div>
    <h6>{{ title }}</h6>
    <svg id="bar-chart" />
  </div>
</template>

<script>
  import * as d3 from 'd3';
  import {scaleLinear} from 'd3-scale';

  export default {
    name: "LvBarChart",
    props: {
      /**
       * Horizontal bar height, in pixels.
       */
      barHeight: {
        type: Number,
        default: 25,
      },
      items: {
        type: Array,
        default: () => ([]),
      },
      /**
       * Chart padding, in pixels.
       */
      padding: {
        type: Number,
        default: 30,
      },
      title: {
        type: String,
        default: '',
      },
      /**
       * Chart width, in pixels.
       */
      width: {
        type: Number,
        default: 500,
      },
    },
    data() {
      return {
        barChart: {},
        barCssClass: 'lv-chart-bar',
        chart: null,
        colors: ['#ff7657', '#ffba5a', '#005792', '#a6aa9c', '#be3737', '#57a99a', '#774898', '#5c8d89'],
        container: '#bar-chart',
      };
    },
    computed: {
      barCount() {
        return this.items.length;
      },
      height() {
        return this.barHeight * this.barCount;
      },
      paddingLeft() {
        return this.padding;
      },
      paddingRight() {
        return this.paddingLeft + 50;
      },
      xScaleDomain() {
        const mappedValues = this.items.map(v => v.value);

        return [0, d3.max(mappedValues)];
      },
      xScaleRange() {
        return [0, this.width - this.paddingRight];
      }
    },
    mounted() {
      const vm = this;

      vm.$nextTick()
        .then(() => vm.init());
    },
    methods: {
      init() {
        this.chart = d3.select(this.container)
          .attr('width', this.width)
          .attr('height', this.height);

        const xScale = scaleLinear()
          .domain(this.xScaleDomain)
          // add some padding on the right so that labels can fit inside the chart container
          .rangeRound(this.xScaleRange);

        this.barChart = this.chart
          .selectAll('g')
          .data(this.items)
          .enter()
          .append('g')
          .attr('transform', (d, i) => `translate(${this.paddingLeft}, ${i * this.barHeight})`);

        // set chart bars
        this.setBars(xScale);
        // set bar X-axis text (i.e. bar domain value)
        this.setXAxisText();
        // set bar Y-axis text (i.e. bar range value)
        this.setYAxisText(xScale);
      },
      setBars(xScale) {
        this.barChart.append('rect')
          .attr('class', this.barCssClass)
          // compute bar color based on provided color scheme and bar index
          .style('fill', (d, i) => this.colors[i % this.colors.length])
          .style('width', (d) => xScale(d.value))
          .style('height', this.barHeight - 3);
      },
      setXAxisText() {
        // offset relative to bar start, in pixels
        const offset = -this.paddingLeft;

        this.barChart.append('text')
          .attr('x', offset)
          .attr('y', this.barHeight / 2)
          .attr('dy', '.35em')
          .attr('text-anchor', 'start')
          .attr('class', 'lv-chart-label')
          .text(d => d.text);
      },
      setYAxisText(xScale) {
        // offset relative to bar end, in pixels
        const offset = 10;

        this.barChart.append('text')
          .attr('x', d => xScale(d.value) + offset)
          .attr('y', this.barHeight / 2)
          .attr('dy', '.35em')
          .attr('text-anchor', 'start')
          .attr('class', 'lv-chart-label')
          .text(d => d.value);
      },
    },
  }
</script>

<style lang="scss">
  @import "~@/assets/scss/variables.scss";

  svg {
    background: transparent;
  }

  .lv-chart-bar {
    cursor: pointer;
  }

  .lv-chart-label {
    fill: $blue-38;
    font-size: 12px;
    font-weight: 400;
  }
</style>
