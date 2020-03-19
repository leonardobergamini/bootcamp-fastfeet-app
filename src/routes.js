import { Router } from 'express';
import multer from 'multer';

import SessionController from './app/controllers/SessionController';
import DestinatarioController from './app/controllers/DestinatarioController';
import ArquivoController from './app/controllers/ArquivoController';
import EntregadorController from './app/controllers/EntregadorController';

import authMiddleware from './app/middlewares/auth';

import multerConfigs from './config/multer';

const routes = new Router();
const upload = multer(multerConfigs);

routes.get('/', (req, res) => {
    res.json({ mensagem: 'Bem vindo, FastFeet API' });
});
routes.post('/session', SessionController.store);
routes.get('/destinatarios', DestinatarioController.index);
routes.get('/destinatarios/:id', DestinatarioController.index);
routes.post('/destinatarios', authMiddleware, DestinatarioController.store);
routes.put('/destinatarios/:id', authMiddleware, DestinatarioController.update);
routes.post(
    '/file',
    authMiddleware,
    upload.single('file'),
    ArquivoController.store
);

/**
 * Rotas de /entregadores
 */

routes.post('/entregadores', authMiddleware, EntregadorController.store);
routes.get('/entregadores', authMiddleware, EntregadorController.index);
routes.get('/entregadores/:id', authMiddleware, EntregadorController.index);
routes.put('/entregadores/:id', authMiddleware, EntregadorController.update);
routes.delete('/entregadores/:id', authMiddleware, EntregadorController.delete);

export default routes;
