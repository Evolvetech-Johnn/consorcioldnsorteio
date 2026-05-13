# Guia de Configuração MongoDB

## 1. Pré-requisitos

- Node.js 20+
- MongoDB (local ou MongoDB Atlas)

---

## 2. Configurar MongoDB

### Opção A: MongoDB Local (para desenvolvimento)

1. Baixe e instale o MongoDB Community Server:
   https://www.mongodb.com/try/download/community

2. Inicie o MongoDB:
   ```bash
   # Windows (serviço)
   net start MongoDB
   
   # Ou use o MongoDB Compass
   ```

3. String de conexão local:
   ```
   mongodb://localhost:27017/lead-system
   ```

### Opção B: MongoDB Atlas (recomendado para produção)

1. Acesse https://www.mongodb.com/cloud/atlas
2. Crie uma conta gratuita
3. Crie um cluster (free tier)
4. Crie um usuário de banco de dados
5. Permita o acesso de qualquer IP (0.0.0.0/0) para desenvolvimento
6. Copie a string de conexão:
   ```
   mongodb+srv://<usuario>:<senha>@cluster0.mongodb.net/lead-system?retryWrites=true&w=majority
   ```

---

## 3. Configurar Variáveis de Ambiente

Crie/edite o arquivo `backend/.env`:

```env
# Backend Environment Variables
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb+srv://seu-usuario:sua-senha@cluster.mongodb.net/lead-system

# JWT
JWT_SECRET=your-super-secret-key-minimum-32-characters-long-here
JWT_EXPIRES_IN=24h

# Bcrypt
BCRYPT_SALT_ROUNDS=12

# CORS
CORS_ORIGIN=http://localhost:5173

# API
API_URL=http://localhost:5000
```

---

## 4. Iniciar o Backend

```bash
cd backend
npm install
npm run dev
```

Você verá:
```
✅ MongoDB conectado com sucesso!
📊 Database: lead-system

✓ Server running on http://localhost:5000
✓ Environment: development
✓ Health check: http://localhost:5000/health
✓ API Leads: http://localhost:5000/api/leads
✓ API Campaigns: http://localhost:5000/api/campaigns
```

---

## 5. Testar as APIs

Use Postman, Insomnia ou curl para testar:

### Health Check
```
GET http://localhost:5000/health
```

### Criar Campanha
```
POST http://localhost:5000/api/campaigns
Content-Type: application/json

{
  "name": "Feira do Empreendedorismo",
  "description": "Evento de networking para empreendedores",
  "isActive": true
}
```

### Listar Campanhas
```
GET http://localhost:5000/api/campaigns
```

### Criar Lead
```
POST http://localhost:5000/api/leads
Content-Type: application/json

{
  "fullName": "João Silva",
  "whatsapp": "(11) 98765-4321",
  "instagram": "@joaosilva",
  "email": "joao@email.com",
  "campaignId": "ID_DA_CAMPANHA",
  "status": "new"
}
```

### Listar Leads
```
GET http://localhost:5000/api/leads
```

---

## 6. Deploy do Backend

Recomendado:
- **Render**: https://render.com (gratuita)
- **Railway**: https://railway.app
- **Fly.io**: https://fly.io

### Deploy no Render

1. Acesse https://render.com
2. Conecte sua conta GitHub
3. Clique em "New +" → "Web Service"
4. Selecione o repositório
5. Configure:
   - **Name**: `consorcio-uniao-backend`
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
6. Adicione a variável de ambiente `MONGODB_URI`
7. Clique em "Create Web Service"

---

## 7. Atualizar Frontend para usar API

Edite `frontend/.env`:
```env
VITE_API_URL=https://seu-backend.onrender.com
```

---

## Estrutura do Banco

### Collection: `leads`
```javascript
{
  _id: ObjectId,
  fullName: String,
  whatsapp: String,
  instagram: String,
  email: String,
  campaignId: String,
  status: 'new' | 'contacted' | 'converted' | 'spam',
  createdAt: Date,
  updatedAt: Date
}
```

### Collection: `campaigns`
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```
