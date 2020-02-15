import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import DestinatarioController from './app/controllers/DestinatarioController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/', (req, res) => {
    res.json({ mensagem: 'Bem vindo, FastFeet' });
});
routes.post('/session', SessionController.store);
routes.get('/destinatarios', DestinatarioController.index);
routes.get('/destinatarios/:id', DestinatarioController.index);
routes.post('/destinatarios', authMiddleware, DestinatarioController.store);
routes.put('/destinatarios/:id', authMiddleware, DestinatarioController.update);

export default routes;
