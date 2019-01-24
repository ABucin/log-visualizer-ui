<template>
  <div
    id="app"
    class="h-100"
  >
    <b-container
      fluid
      class="p-0 h-100"
    >
      <b-row class="no-gutters sticky-top">
        <b-col>
          <b-nav class="lv-nav">
            <b-nav-item>
              Visualize data
            </b-nav-item>
          </b-nav>
        </b-col>
      </b-row>
      <b-row class="m-0 p-0 h-100">
        <b-col class="p-0 col-auto">
          <b-nav
            vertical
            class="lv-nav-vertical"
          >
            <b-nav-item
              v-for="item in menuItems"
              :key="item.id"
              class="lv-nav-item"
            >{{ item.title }}
            </b-nav-item>
          </b-nav>
        </b-col>
        <b-col class="col-auto lv-content">
          <router-view name="main" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import bContainer from 'bootstrap-vue/es/components/layout/container';
  import bCol from 'bootstrap-vue/es/components/layout/col';
  import bRow from 'bootstrap-vue/es/components/layout/row';
  import bNav from 'bootstrap-vue/es/components/nav/nav';
  import bNavItem from 'bootstrap-vue/es/components/nav/nav-item';
  import menuItems from "@/data/menuItems";

  export default {
    name: 'App',
    components: {
      bContainer,
      bCol,
      bRow,
      bNav,
      bNavItem,
    },
    data() {
      return {
        menuItems,
      };
    },
  }
</script>

<style lang="scss">
  @import "~@/assets/scss/mixins.scss";
  @import "~@/assets/scss/variables.scss";

  html, body {
    height: 100%;
  }

  #app {
    font-family: $font-family;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: $blue-22;
  }

  .lv-nav {
    background-color: $blue-22;
    font-size: 12px;
  }

  .lv-nav-vertical {
    background-color: $blue-22;
    height: 100%;

    .lv-nav-item {
      a {
        color: $blue-95;
        font-size: $font-size-menu;

        @include lv-link($blue-95)
      }
    }
  }
</style>
