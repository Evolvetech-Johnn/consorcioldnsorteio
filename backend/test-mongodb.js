const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

async function testConnection() {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lead-system';
    console.log('🔍 Tentando conectar ao MongoDB em:', mongoURI);
    
    await mongoose.connect(mongoURI);
    
    console.log('✅ MongoDB conectado com sucesso!');
    console.log('📊 Database:', mongoose.connection.name);
    console.log('🌐 Host:', mongoose.connection.host);
    console.log('🔌 Porta:', mongoose.connection.port);
    
    await mongoose.connection.close();
    console.log('🔌 Conexão encerrada com sucesso');
    
  } catch (error) {
    console.error('❌ Erro ao conectar ao MongoDB:');
    console.error('Mensagem:', error.message);
    console.error('Código:', error.code);
    console.error('Nome:', error.name);
    process.exit(1);
  }
}

testConnection();
