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
          <b-nav class="lv-nav lv-nav--horizontal">
            <b-nav-item class="lv-nav-item">
              SERVER LOG VIS
            </b-nav-item>
          </b-nav>
        </b-col>
      </b-row>
      <b-row class="m-0 p-0 lv-content-container">
        <b-col class="p-0 col-auto">
          <b-nav
            vertical
            class="lv-nav lv-nav--vertical d-flex align-items-start flex-column"
          >
            <b-nav-item
              v-for="item in menuItems"
              :key="item.id"
              class="lv-nav-item w-100"
            >{{ item.title }}
            </b-nav-item>
            <b-nav-item class="lv-nav-item lv-version text-center mt-auto align-self-center">v0.1</b-nav-item>
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
    color: $blue-20;
  }

  .card {
    box-shadow: 0 1px 2px 0 #d8d8d8;
    margin: 5px !important;
  }

  .lv-content-container {
    height: calc(100% - 34px);
  }

  .lv-nav {
    &.lv-nav--vertical {
      background-color: $blue-20;
      height: 100%;

      .lv-nav-item {
        a {
          color: $blue-85;
          font-size: $font-size-menu;

          @include lv-link($blue-85, $blue-20, 30%)
        }
      }
    }

    &.lv-nav--horizontal {
      background-color: $blue-30;
      border-bottom: 1px solid $blue-40;
      font-size: 12px;

      .lv-nav-item {
        a {
          color: $blue-95;
          font-size: 12px;
          padding-bottom: 8px;
          padding-top: 8px;
        }
      }
    }
  }

  .lv-version {
    font-size: $font-size-small;
    width: 100%;
  }
</style>
