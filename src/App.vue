<template>
	<div id="app">
		<b-nav vertical class="w-25">
			<b-nav-item active>Visualize data</b-nav-item>
			<b-nav-item>Generate reports <font-awesome-icon icon="user-secret" /></b-nav-item>
		</b-nav>
	</div>
</template>

<script>
	import bNav from 'bootstrap-vue/es/components/nav/nav';
	import bNavItem from 'bootstrap-vue/es/components/nav/nav-item';
	import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

	export default {
		name: 'app',
		components: {
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
