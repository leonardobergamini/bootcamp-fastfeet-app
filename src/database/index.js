import Sequelize from 'sequelize';

import Destinatario from '../app/models/Destinatario';
import Usuario from '../app/models/Usuario';
import Arquivo from '../app/models/Arquivo';
import Entregador from '../app/models/Entregador';

import databaseConfigs from '../config/database';

const models = [Destinatario, Usuario, Arquivo, Entregador];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfigs);

        models
            .map(model => model.init(this.connection))
            .map(model => model.associate && model.associate());
    }
}

export default new Database();
