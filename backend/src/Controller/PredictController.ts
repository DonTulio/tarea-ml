import { Request, Response } from 'express';
import { utilidad } from '../Utils/Util';
import { join } from 'path';
export class PredictController {
	async predecirPost(req: Request, res: Response): Promise<Response> {
		try {
			const {
				ssc,
				hsc,
				degree,
				workex,
			}: {
				ssc: number;
				hsc: number;
				degree: number;
				workex: number;
			} = req.body;
			const respuesta = await utilidad.execCommandLine(
				`python ${join(
					__dirname,
					'..',
					'..',
					'predict.py'
				)} ${ssc} ${hsc} ${degree} ${workex}`
			);

			return res.status(200).json({
				code: 200,
				data: respuesta,
				mensaje: 'Respuesta correcta',
			});
		} catch (error) {
			return res.status(200).json({
				code: 500,
				data: undefined,
				mensaje: error,
			});
		}
	}
}
