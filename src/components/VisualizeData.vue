<template>
  <div class="p-2">
    <h3>Visualize Data</h3>
    <lv-bar-chart
      :items="chartData"
      :title="chartTitle"
    />
  </div>
</template>

<script>
  import LvBarChart from './charts/lvBarChart';
  import statusCodes from "@/data/statusCodes";

  export default {
    name: 'VisualizeData',
    components: {
      LvBarChart,
    },
    data() {
      return {
        chartData: [],
        chartTitle: 'HTTP status codes',
      };
    },
    mounted() {
      this.chartData = statusCodes.sort((a, b) => a.text - b.text);
    },
  }
</script>

<style scoped lang="scss">
  @import "~@/assets/scss/variables.scss";

  h3 {
    color: $blue;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
