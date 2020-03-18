import Arquivo from '../models/Arquivo';

class ArquivoController {
    async store(req, res) {
        const { originalname: nome, filename: caminho } = req.file;

        const arquivo = await Arquivo.create({
            nome,
            caminho,
        });

        return res.json(arquivo);
    }
}

export default new ArquivoController();
