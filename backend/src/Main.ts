import express, { Router, Application } from 'express';
import helmet from 'compression';
import { MainRouter } from './Router/MainRouter';
import compression from 'compression';
import morgan from 'morgan';
import cors from 'cors';
export class Main {
	private app: Application;

	public constructor() {
		this.app = express();
		this.config();
		this.middleware();
		this.routers();
	}
	private config() {
		this.app.set('PORT', process.env.PORT || 3000);
	}
	private middleware() {
		this.app.use(express.json());
		this.app.use(
			express.urlencoded({
				extended: false,
			})
		);
		this.app.use(compression());
		this.app.use(helmet());
		this.app.use(morgan('dev'));
		this.app.use(cors());
	}

	private routers() {
		this.app.use('/api', new MainRouter().getRouters());
	}

	public init() {
		this.app.listen(this.app.get('PORT'));
		console.log(`Server on port ${this.app.get('PORT')}`);
	}
}
