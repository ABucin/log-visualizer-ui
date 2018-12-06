<template>
  <div>
    <h3>Visualize Data</h3>
    <lv-line-chart />
  </div>
</template>

<script>
  import LvBarChart from './charts/lvBarChart';

  export default {
    name: 'VisualizeData',
    components: {
      LvLineChart: LvBarChart,
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
