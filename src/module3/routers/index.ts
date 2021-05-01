import { Router } from 'express';

import user from './user';
import group from './group';

export default () => {
	const app = Router();
	app.use(user);
	app.use(group);

	return app
}