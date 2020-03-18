import Sequelize from 'sequelize';

import Destinatario from '../app/models/Destinatario';
import Usuario from '../app/models/Usuario';
import Arquivo from '../app/models/Arquivo';

import databaseConfigs from '../config/database';

const models = [Destinatario, Usuario, Arquivo];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfigs);

        models.map(model => model.init(this.connection));
    }
}

export default new Database();
