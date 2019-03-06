<template>
  <div class="lv-chart-container">
    <h6 class="mb-3 text-center">{{ title }}</h6>
    <span class="lv-chart-options d-flex align-items-center">
      <font-awesome-icon
        :icon="['fas', 'sync-alt']"
        class="lv-chart-icon ml-2"
      />
      <font-awesome-icon
        :icon="['fas', 'cog']"
        class="lv-chart-icon ml-2"
      />
    </span>
    <svg :id="id" />
  </div>
</template>

<script>
  import * as d3 from 'd3';
  import {scaleLinear} from 'd3-scale';
  import {onDataHover} from "@/components/charts/chartUtils";
  import {library as fontAwesome} from '@fortawesome/fontawesome-svg-core';
  import {faCog, faSyncAlt} from '@fortawesome/free-solid-svg-icons';
  import * as uuid from 'uuid';

  const icons = [faCog, faSyncAlt];

  fontAwesome.add(...icons);

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
      id: {
        type: String,
        default: () => `bar-chart-${uuid.v4()}`,
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
        colors: ['#ff7657', '#ffba5a', '#005792', '#a6aa9c', '#be3737', '#57a99a', '#774898', '#448ef6'],
      };
    },
    computed: {
      barCount() {
        return this.items.length;
      },
      height() {
        return this.barHeight * this.barCount + 25;
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
        this.chart = d3.select(`#${this.id}`)
          .attr('width', this.width)
          .attr('height', this.height);

        this.barChart = this.chart
          .selectAll('.bar')
          .data(this.items)
          .enter()
          .append('g')
          .attr('transform', (d, i) => `translate(${this.paddingLeft}, ${i * this.barHeight})`)
          .attr('class', 'bar');

        const x = scaleLinear()
          .domain(this.xScaleDomain)
          // add some padding on the right so that labels can fit inside the chart container
          .rangeRound(this.xScaleRange);

        // set chart bars
        this.setBars(x);
        this.setXAxis();
        // set bar Y-axis text (i.e. bar range value)
        this.setYAxisText(x);
      },
      setBars(xScale) {
        this.barChart.append('rect')
          .attr('class', this.barCssClass)
          // compute bar color based on provided color scheme and bar index
          .style('fill', (d, i) => this.colors[i % this.colors.length])
          .style('width', (d) => xScale(d.value))
          .style('height', this.barHeight - 3)
          .on('mouseover', (d, i, nodes) => {
            onDataHover(d3.select(nodes[i]));
          })
          .on('mouseout', (d, i, nodes) => {
            onDataHover(d3.select(nodes[i]), true);
          });
      },
      setXAxis() {
        this.chart.append('g')
          .attr('transform', `translate(${this.paddingLeft}, ${this.height - 20})`)
          .attr('class', 'x axis');

        // set bar X-axis text (i.e. bar domain value)
        this.setXAxisText();
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
  @import "~@/assets/scss/mixins.scss";
  @import "~@/assets/scss/variables.scss";

  .lv-chart-container {
    position: relative;

    svg {
      background: transparent;
    }

    .lv-chart-bar {
      cursor: pointer;
    }

    .lv-chart-options {
      color: $blue;
      position: absolute;
      right: 0;
      top: 0;

      .lv-chart-icon {
        @include lv-link($blue, transparent, 15%)
      }
    }

    .lv-chart-label {
      fill: $blue-38;
      font-family: $font-family-chart;
      font-size: 12px;
      font-weight: 400;
    }
  }
</style>
