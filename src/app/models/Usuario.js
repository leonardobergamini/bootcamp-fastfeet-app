import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcrypt';

class Usuario extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                password_hash: Sequelize.STRING,
                password: Sequelize.VIRTUAL,
            },
            {
                sequelize,
                modelName: 'users',
            }
        );

        return this;
    }

    static checkPassword(password, usuario) {
        return bcrypt.compare(password, usuario.password_hash);
    }
}

export default Usuario;
