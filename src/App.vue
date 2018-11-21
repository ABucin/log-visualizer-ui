<template>
  <div id="app">
    <b-container fluid>
      <b-row>
        <b-col class="col-2">
          <b-nav
            vertical
          >
            <b-nav-item active>Visualize data</b-nav-item>
            <b-nav-item>Generate reports
              <font-awesome-icon icon="user-secret" />
            </b-nav-item>
          </b-nav>
        </b-col>
        <b-col>
          <router-view />
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
  import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

  export default {
    name: 'App',
    components: {
      bContainer,
      bCol,
      bRow,
      bNav,
      bNavItem,
      FontAwesomeIcon,
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
