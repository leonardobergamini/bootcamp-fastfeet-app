import Sequelize, { Model } from 'sequelize';

import Arquivo from './Arquivo';

class Entregador extends Model {
    static init(sequelize) {
        super.init(
            {
                nome: Sequelize.STRING,
                avatar_id: Sequelize.INTEGER,
                email: Sequelize.STRING,
            },
            {
                sequelize,
                tableName: 'deliverymen',
                modelName: 'deliverymen',
            }
        );

        return this;
    }

    static associate() {
        this.belongsTo(Arquivo, {
            foreignKey: 'avatar_id',
            as: 'avatar',
        });
    }
}

export default Entregador;
