<template>
  <div>
    <h6>{{ title }}</h6>
    <svg id="line-chart" />
  </div>
</template>

<script>
  import * as d3 from 'd3';
  import {scaleLinear} from 'd3-scale';
  import statusCodes from "@/data/statusCodes";

  export default {
    name: "LvLineChart",
    data() {
      return {
        barColor: '4a667b',
        barHeight: 20,
        chart: null,
        title: 'HTTP status codes',
        values: statusCodes,
        width: 500,
      };
    },
    mounted() {
      this.chart = d3.select('#line-chart')
        .attr('width', this.width)
        .attr('height', this.barHeight * this.values.length);

      const mappedValues = this.values.map(v => v.value);

      const x = scaleLinear()
        .domain([0, d3.max(mappedValues)])
        .rangeRound([0, this.width - 20]);

      const barChart = this.chart
        .selectAll('g')
        .data(this.values)
        .enter()
        .append('g')
        .attr('transform', (d, i) => `translate(0, ${i * this.barHeight})`);

      barChart.append('rect')
        .attr('class', 'lv-chart-bar')
        .style('fill', this.barColor)
        .style('width', (d) => x(d.value))
        .style('height', this.barHeight - 1);

      barChart.append('text')
        .attr('x', 10)
        .attr('y', this.barHeight / 2)
        .attr('dy', '.35em')
        .attr('text-anchor', 'start')
        .attr('class', 'lv-chart-label')
        .text(d => d.text);
    }
  }
</script>

<style lang="scss">
  @import "~@/assets/scss/variables.scss";

  svg {
    background: transparent;
  }

  .lv-chart-bar {

  }

  .lv-chart-label {
    fill: $blue-95;
    font-size: 12px;
    font-weight: 400;
  }
</style>
