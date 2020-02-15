import * as Yup from 'yup';

import Destinatario from '../models/Destinatario';

class DestinatarioController {
    async index(req, res) {
        const { id } = req.params;

        if (id) {
            const destinatario = await Destinatario.findByPk(id);

            if (!destinatario) {
                return res
                    .status(404)
                    .json({ message: 'Destinatário não encontrado.' });
            }
            return res.json(destinatario);
        }
        const destinatarios = await Destinatario.findAll();
        return res.json(destinatarios);
    }

    async store(req, res) {
        const formValidation = Yup.object().shape({
            nome: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            rua: Yup.string().required(),
            numero: Yup.number()
                .integer()
                .positive()
                .required(),
            complemento: Yup.string(),
            estado: Yup.string()
                .min(2)
                .max(2)
                .required(),
            cidade: Yup.string().required(),
            cep: Yup.string()
                .min(8)
                .max(8)
                .required(),
        });

        if (!(await formValidation.isValid(req.body))) {
            return res
                .status(400)
                .json({ message: 'Erro de validação nos campos.' });
        }

        const { email } = req.body;

        const userExists = await Destinatario.findOne({ where: { email } });

        if (userExists) {
            return res
                .status(400)
                .json({ message: 'Destinatário já cadastrado.' });
        }

        const user = await Destinatario.create(req.body);

        return res.json(user);
    }

    async update(req, res) {
        const formValidation = Yup.object().shape({
            nome: Yup.string(),
            email: Yup.string().email(),
            rua: Yup.string(),
            numero: Yup.number()
                .integer()
                .positive(),
            complemento: Yup.string(),
            estado: Yup.string()
                .min(2)
                .max(2),
            cidade: Yup.string(),
            cep: Yup.string()
                .min(8)
                .max(8),
        });

        if (!(await formValidation.isValid(req.body))) {
            return res
                .status(400)
                .json({ message: 'Erro de validação nos campos.' });
        }

        const { id, email } = req.params;
        console.log(id);

        const destinatario = await Destinatario.findByPk(id);

        if (!destinatario) {
            return res
                .status(404)
                .json({ message: 'Destinatário não encontrado.' });
        }

        if (email && email !== destinatario.email) {
            const userExists = await Destinatario.findOne({ where: { email } });

            if (userExists) {
                return res
                    .status(400)
                    .json({ message: 'Destinatário já cadastrado.' });
            }
        }

        const destinatarioAtualizado = await destinatario.update(req.body);

        return res.json(destinatarioAtualizado);
    }
}

export default new DestinatarioController();
