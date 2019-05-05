<template>
  <div class="lv-chart-container">
    <h6 class="mb-3 text-center">{{ title }}</h6>
    <lv-chart-options />
    <svg :id="id" />
    <div id="lv-chart-tooltip">
      <span id="text" />
      <span id="value" />
    </div>
  </div>
</template>

<script>
  import * as d3 from 'd3';
  import * as uuid from 'uuid';
  import LvChartOptions from "@/components/charts/lvChartOptions";
  import {onDataHover} from "@/components/charts/chartUtils";

  export default {
    name: "LvDonutChart",
    components: {LvChartOptions},
    props: {
      /**
       * Chart height, in pixels.
       */
      height: {
        type: Number,
        default: 200,
      },
      id: {
        type: String,
        default: () => `donut-chart-${uuid.v4()}`,
      },
      items: {
        type: Array,
        default: () => ([]),
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
        donutChart: {},
        donutCssClass: 'lv-chart-donut',
        chart: null,
      };
    },
    computed: {
      radius() {
        return Math.min(this.width, this.height) / 2;
      },
    },
    mounted() {
      const vm = this;

      vm.$nextTick()
        .then(() => vm.init());
    },
    methods: {
      init() {
        let pie = d3.pie() //this will create arc data for us given a list of values
          .value(function(d) { return d.value; }); //we must tell it out to access the value of each element in our data array
        let arc = d3.arc()
          .innerRadius(60)
          .outerRadius(85);

        this.chart = d3.select(`#${this.id}`)
          .attr('width', this.width)
          .attr('height', this.height)
          .append('g')
          .attr('transform', () => `translate(${this.width/2}, ${this.height/2})`);

        this.donutChart = this.chart
          .attr('class', this.donutCssClass)
          .selectAll('.slice')
          .data(pie(this.items))
          .enter()
          .append('path')
          .attr('d', arc)
          .attr('class', 'slice')
          .attr("stroke", "white")
          .style("stroke-width", "3px")
          .style('fill', (d) => d.data.color)
          .on('mouseover', (d, i, nodes) => {
            onDataHover(d3.select(nodes[i]));

            // TODO: fix tooltip positioning
            // let x = d3.select('#lv-chart-tooltip')
            //   .style("left", (d3.event.pageX) + "px")
            //   .style("top", (d3.event.pageY) + "px")
            //   .style('opacity', 1);
            // x.select('#text')
            //   .text(d.data.text);
            // x.select('#value')
            //   .text(d.data.value);
          })
          .on('mouseout', (d, i, nodes) => {
            onDataHover(d3.select(nodes[i]), true);
            // d3.select('#lv-chart-tooltip')
            //   .style('opacity', 1);
          });

        // this.donutChart.append('text')
        //   .attr('transform', (d) => {
        //     let pos = arc.centroid(d);
        //     // let midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        //     //
        //     // pos[0] = this.radius * 0.99 * (midAngle < Math.PI ? 1 : -1);
        //
        //     return `translate(${pos})`;
        //   })
        //   .attr('text-anchor', 'start')
        //   .attr('class', 'lv-chart-label')
        //   .text(d => d.data.text);
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

    .lv-chart-donut {
      cursor: pointer;
    }

    .lv-chart-label {
      fill: $blue-40;
      font-family: $font-family-chart;
      font-size: 12px;
      font-weight: 400;
    }

    #lv-chart-tooltip {
      background-color: $blue-20;
      border-radius: 5px;
      color: $blue-85;
      font-size: 12px;
      height: auto;
      opacity: 0;
      padding: 5px 10px;
      position: absolute;
      min-width: 50px;
    }
  }
</style>
