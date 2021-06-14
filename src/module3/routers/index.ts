import { Router } from 'express';

import login from './login';
import user from './user';
import group from './group';

export default () => {
	const app = Router();
	app.use(login);
	app.use(user);
	app.use(group);

	return app
}