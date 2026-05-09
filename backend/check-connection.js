import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const uri = process.env.MONGODB_URI;

console.log('Verificando conexão MongoDB Atlas...');
console.log('URI:', uri.replace(/:([^:@]+)@/, ':****@'));
console.log('');

try {
  console.log('Conectando...');
  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 25000,
  });

  console.log('');
  console.log('✅ CONEXÃO BEM-SUCEDIDA!');
  console.log('Host:', mongoose.connection.host);
  console.log('Banco:', mongoose.connection.name);
  console.log('');

  await mongoose.disconnect();
  console.log('Desconectado com sucesso!');

} catch (err) {
  console.error('');
  console.error('❌ ERRO NA CONEXÃO:');
  console.error('Mensagem:', err.message);
  process.exit(1);
}
