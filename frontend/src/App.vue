<template>
	<v-app app>
		<!-- Must have the app property -->
		<v-app-bar app color="deep-purple" dark>
			<v-app-bar-title> Tarea de ML</v-app-bar-title>
		</v-app-bar>

		<v-main app>
			<formulario></formulario>
		</v-main>
	</v-app>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator';
	import Formulario from '@/components/Formulario.vue';
	@Component({
		name: 'App',
		components: {
			Formulario,
		},
	})
	export default class App extends Vue {}
</script>
