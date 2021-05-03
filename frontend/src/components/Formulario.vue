<template>
	<v-container>
		<v-row>
			<v-col xs="12" sm="12" md="8" offset-md="2">
				<v-card>
					<v-card-title
						>Complete el formulario seleccionado los
						puntajes</v-card-title
					>
					<v-form
						:disabled="cargando"
						ref="formulario"
						@submit.prevent="enviarFormulario"
					>
						<v-card-text>
							<v-container fluid>
								<v-row>
									<v-col xs="12" sm="12">
										<v-slider
											v-model="modelo.ssc"
											min="40"
											max="90"
											label="Seleccione el puntaje SSC"
											thumb-color="red"
											thumb-label="always"
											:rules="[(v) => !!v || 'Campo requerido']"
										>
										</v-slider>
									</v-col>
								</v-row>
								<v-row>
									<v-col xs="12" sm="12">
										<v-slider
											v-model="modelo.hsc"
											min="40"
											max="90"
											label="Seleccione el puntaje HSC"
											thumb-color="red"
											thumb-label="always"
											:rules="[(v) => !!v || 'Campo requerido']"
										>
										</v-slider>
									</v-col>
								</v-row>
								<v-row>
									<v-col xs="12" sm="12">
										<v-slider
											v-model="modelo.degree"
											min="40"
											max="90"
											label="Seleccione el puntaje DEGREE"
											thumb-color="red"
											thumb-label="always"
											:rules="[(v) => !!v || 'Campo requerido']"
										>
										</v-slider>
									</v-col>
								</v-row>
								<v-row>
									<v-col xs="12" sm="12">
										<v-checkbox
											v-model="modelo.workex"
											label="¿workex?"
										></v-checkbox>
									</v-col>
								</v-row>
							</v-container>
						</v-card-text>
						<v-card-actions>
							<v-btn
								block
								elevation="2"
								x-large
								color="primary"
								:disabled="cargando"
								type="submit"
							>
								Enviar
							</v-btn>
						</v-card-actions>
						<v-progress-linear
							v-if="cargando"
							indeterminate
							color="primary"
						></v-progress-linear>
					</v-form>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
	import { Vue, Component } from 'vue-property-decorator';
	import { Predict } from '@/models/Predict';
	import axios, { AxiosError, AxiosResponse } from 'axios';
	import alerta from 'sweetalert2';
	@Component({
		name: 'Formulario',
	})
	export default class Formulario extends Vue {
		modelo: Predict = {
			ssc: 60,
			hsc: 61,
			degree: 60,
			workex: false,
		};
		cargando = false;
		private href: string = window.location.href;
		public enviarFormulario() {
			const formulario: any = this.$refs.formulario;
			const validacion = formulario.validate();
			if (validacion) {
				this.cargando = true;
				axios
					.post(`${this.href}api`, {
						ssc: this.modelo.ssc,
						hsc: this.modelo.hsc,
						degree: this.modelo.degree,
						workex: this.modelo.workex ? 1 : 0,
					})
					.then((data: AxiosResponse) => {
						if (data.status === 200) {
							const resultado = Number.parseInt(data.data.data);
							if (resultado === 1) {
								alerta.fire({
									icon: 'success',
									text: 'Según los datos, quedarás trabajando',
									title: 'Felicidades',
									showCancelButton: false,
								});
							} else {
								alerta.fire({
									icon: 'warning',
									text: 'Lo siento, según los datos no quedarás ☹',
									title: 'Lo siento',
									showCancelButton: false,
								});
							}
						}
					})
					.catch((error: AxiosError) => {
						console.log(error);
					})
					.finally(() => {
						this.cargando = false;
						this.modelo = {
							ssc: 60,
							hsc: 61,
							degree: 60,
							workex: false,
						};
					});
			}
		}
	}
</script>
