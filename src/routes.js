import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => {
  res.json({ mensagem: 'Bem vindo, FastFeet' });
});

export default routes;
