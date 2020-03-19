import * as Yup from 'yup';

import Entregador from '../models/Entregador';

class EntregadorController {
    async index(req, res) {
        const { id } = req.params;

        if (id) {
            const entregador = await Entregador.findByPk(id);

            if (!entregador) {
                return res
                    .status(404)
                    .json({ message: 'Destinatário não encontrado.' });
            }
            return res.json(entregador);
        }
        const entregadores = await Entregador.findAll();
        return res.json(entregadores);
    }

    async store(req, res) {
        const yupValidation = Yup.object().shape({
            nome: Yup.string().required(),
            avatar_id: Yup.number(),
            email: Yup.string()
                .email()
                .required(),
        });

        if (!(await yupValidation.isValid(req.body))) {
            return res
                .status(400)
                .json({ message: 'Erro de validação nos campos.' });
        }

        const { email } = req.body;
        const entregadorExists = await Entregador.findOne({ where: { email } });

        if (entregadorExists) {
            return res
                .status(400)
                .json({ message: 'Entregador já cadastrado.' });
        }

        const entregador = await Entregador.create(req.body);
        return res.json(entregador);
    }

    async update(req, res) {
        const yupValidation = Yup.object().shape({
            nome: Yup.string(),
            avatar_id: Yup.number(),
            email: Yup.string().email(),
        });

        if (!(await yupValidation.isValid(req.body))) {
            return res
                .status(400)
                .json({ message: 'Erro de validação nos campos.' });
        }

        const { id } = req.params;

        const entregador = await Entregador.findByPk(id);

        if (!entregador) {
            if (entregador) {
                return res
                    .status(400)
                    .json({ message: 'Entregador não encontrado.' });
            }
        }

        if (req.body.email && req.body.email === entregador.email) {
            const entregadorExists = await Entregador.findOne({
                where: { email: req.body.email },
            });

            if (entregadorExists) {
                return res
                    .status(400)
                    .json({ message: 'Entregador já cadastrado.' });
            }
        }

        const entregadorAtualizado = await entregador.update(req.body);

        return res.json(entregadorAtualizado);
    }

    async delete(req, res) {
        const { id } = req.params;

        const entregador = await Entregador.findByPk(id);

        if (!entregador) {
            if (entregador) {
                return res
                    .status(400)
                    .json({ message: 'Entregador não encontrado.' });
            }
        }

        await entregador.destroy();

        return res.status(200).send();
    }
}

export default new EntregadorController();
