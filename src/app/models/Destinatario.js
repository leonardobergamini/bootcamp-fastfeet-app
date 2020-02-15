import Sequelize, { Model } from 'sequelize';

class Destinatarios extends Model {
    static init(sequelize) {
        super.init(
            {
                nome: Sequelize.STRING,
                email: Sequelize.STRING,
                rua: Sequelize.STRING,
                numero: Sequelize.INTEGER,
                complemento: Sequelize.STRING,
                cep: Sequelize.STRING,
                cidade: Sequelize.STRING,
                estado: Sequelize.STRING,
            },
            { sequelize, modelName: 'recipients' }
        );

        return this;
    }
}

export default Destinatarios;
