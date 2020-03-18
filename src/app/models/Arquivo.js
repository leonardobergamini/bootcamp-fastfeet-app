import Sequelize, { Model } from 'sequelize';

class Arquivo extends Model {
    static init(sequelize) {
        super.init(
            {
                nome: Sequelize.STRING,
                caminho: Sequelize.STRING,
                url: {
                    type: Sequelize.STRING,
                    get() {
                        return `localhost:3333/file/${this.caminho}`;
                    },
                },
            },
            { sequelize, modelName: 'files' }
        );

        return this;
    }
}

export default Arquivo;
