import { Router } from 'express';
import { PredictController } from '../Controller/PredictController';
export class MainRouter {
	private routers: Router;
	private predic: PredictController;
	public constructor() {
		this.routers = Router();
		this.predic = new PredictController();
		this.config();
	}

	private config() {
		this.routers.post('/', this.predic.predecirPost);
	}

	public getRouters(): Router {
		return this.routers;
	}
}
