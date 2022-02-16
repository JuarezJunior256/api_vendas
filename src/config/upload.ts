import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

// definindo caminho do diretorio de imagens
const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');

// função de configuração para upload de imagens
export default {
  directory: uploadFolder,
  storage: multer.diskStorage({
    destination: uploadFolder,
    filename(reques, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');

      const filename = `${fileHash}-${file.originalname}`;

      callback(null, filename);
    },
  }),
};
