import * as Yup from 'yup';
import jwt from 'jsonwebtoken';

import Usuario from '../models/Usuario';
import authConfigs from '../../config/auth';

class SessionController {
    async store(req, res) {
        const formValidation = Yup.object().shape({
            email: Yup.string()
                .email()
                .required(),
            password: Yup.string().required(),
        });

        if (!(await formValidation.isValid(req.body))) {
            return res
                .status(400)
                .json({ message: 'E-mail e senha obrigatórios.' });
        }

        const { email, password } = req.body;
        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) {
            return res.status(401).json({ message: 'E-mail não cadastrado.' });
        }

        if (!(await Usuario.checkPassword(password, usuario))) {
            return res.status(401).json({ message: 'Senha inválida.' });
        }

        const { id, name } = usuario;

        return res.json({
            usuario: {
                id,
                name,
                email,
            },
            token: jwt.sign({ id }, authConfigs.secret, {
                expiresIn: authConfigs.expiresIn,
            }),
        });
    }
}

export default new SessionController();
