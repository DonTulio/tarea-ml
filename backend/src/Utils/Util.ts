import { exec, ExecException } from 'child_process';
class Util {
	async execCommandLine(command: string) {
		return new Promise((resolve, reject) => {
			exec(command, (error: ExecException | null, salida: string) => {
				if (error) {
					console.error(error);
					reject();
				}
				console.error(salida);
				resolve(salida);
			});
		});
	}
}

export const utilidad = new Util();
