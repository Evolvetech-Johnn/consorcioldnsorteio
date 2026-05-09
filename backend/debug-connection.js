import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const uri = process.env.MONGODB_URI;

console.log('='.repeat(80));
console.log('🔍 DIAGNÓSTICO DETALHADO DA CONEXÃO');
console.log('='.repeat(80));
console.log('');
console.log('📋 Informações:');
console.log('   - URI:', uri.replace(/:([^:@]+)@/, ':****@'));
console.log('   - NODE_ENV:', process.env.NODE_ENV);
console.log('   - Mongoose version:', mongoose.version);
console.log('');

console.log('🚀 Tentando conectar...');
console.log('');

mongoose.set('debug', true);

try {
  const connection = await mongoose.connect(uri, {
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 60000,
  connectTimeoutMS: 30000,
});

  console.log('');
  console.log('✅ CONEXÃO BEM-SUCEDIDA! 🎉');
  console.log('='.repeat(80));
  console.log('Host:', connection.connection.host);
  console.log('Port:', connection.connection.port);
  console.log(' Banco:', connection.connection.name);
  console.log('');

  await mongoose.disconnect();
  console.log('🔌 Desconectado com sucesso!');

} catch (error) {
  console.error('');
  console.error('❌ ERRO DETALHADO:');
  console.error('='.repeat(80));
  console.error('');
  console.error('Nome:', error.name);
  console.error('Mensagem:', error.message);
  console.error('Código:', error.code);
  console.error('Code Name:', error.codeName);
  console.error('');
  
  if (error.stack) {
    console.error('Stack trace completo:');
    console.error(error.stack);
    console.error('');
  }
  
  console.error('💡 Sugestões passo a passo:');
  console.error('1. Acesse o painel MongoDB Atlas');
  console.error('2. Clique em Connect → Connect your application');
  console.error('3. Escolha Node.js e versão 4.0+');
  console.error('4. COPIE A URI EXATA que aparecer (não edite manualmente!');
  console.error('5. Cole essa URI no arquivo backend/.env');
  console.error('');
  
  process.exit(1);
}
