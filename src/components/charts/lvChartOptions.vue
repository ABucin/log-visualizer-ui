<template>
  <span class="lv-chart-options d-flex align-items-center">
    <font-awesome-icon
      v-for="icon in icons"
      :key="icon"
      :icon="['fas', icon]"
      class="lv-chart-icon ml-2"
    />
  </span>
</template>

<script>
  import {library as fontAwesome} from '@fortawesome/fontawesome-svg-core';
  import {faCog, faFilter, faSortAlphaDown, faSyncAlt} from '@fortawesome/free-solid-svg-icons';

  const libIcons = [faCog, faFilter, faSortAlphaDown, faSyncAlt];

  fontAwesome.add(...libIcons);

  export default {
    name: "LvChartOptions",
    data() {
      return {
        icons: ['sync-alt', 'filter', 'sort-alpha-down', 'cog'],
      };
    }
  }
</script>

<style lang="scss">
  @import "~@/assets/scss/mixins.scss";
  @import "~@/assets/scss/variables.scss";

  .lv-chart-options {
    color: $blue;
    position: absolute;
    right: 0;
    top: 0;

    .lv-chart-icon {
      @include lv-link($blue, transparent, -15%)
    }
  }
</style>
