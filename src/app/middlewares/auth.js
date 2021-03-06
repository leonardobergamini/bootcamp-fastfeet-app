import jwt from 'jsonwebtoken';

import authConfigs from '../../config/auth';

export default async function(req, res, next) {
    const tokenBearer = req.headers.authorization;

    if (!tokenBearer) {
        return res.status(401).json({ message: 'Token não encontrado.' });
    }
    const [, token] = tokenBearer.split(' ');

    try {
        const responseTokenValidation = await jwt.verify(
            token,
            authConfigs.secret
        );
        req.userID = responseTokenValidation.id;
        return next();
    } catch (err) {
        return res
            .status(401)
            .json({ error: 'Token de autenticação não identificado' });
    }
}
