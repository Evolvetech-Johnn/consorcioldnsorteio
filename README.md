# Lead Consortium MVP

Sistema SaaS para captação de leads em eventos presenciais com sistema de sorteio de brindes.

## 📂 Estrutura do Projeto

```
projeto-c-uniao/
├── frontend/              # Aplicação React + TypeScript
├── backend/               # API Node.js + Express
├── docs/                  # Documentação do projeto
├── README.md             # Este arquivo
└── .gitignore            # Git ignore rules
```

## 🚀 Quick Start

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Acessa em: http://localhost:5173

### Backend

```bash
cd backend
npm install
# Configure .env com seus valores
npm run dev
```

Acessa em: http://localhost:5000

## 📚 Documentação

Veja a pasta `docs/` para documentação técnica detalhada:

- `ARQUITETURA_MVP.md` - Arquitetura completa do sistema
- `DIAGRAMAS_FLUXOS.md` - Fluxos visuais e diagramas
- `CHECKLIST_IMPLEMENTACAO.md` - Checklist de fases

## 🛠️ Tecnologias

### Frontend
- React 18 + TypeScript
- Vite (build tool)
- TailwindCSS (styling)
- React Router DOM (routing)
- React Hook Form + Zod (forms)
- Framer Motion (animations)
- Axios (HTTP client)

### Backend
- Node.js 18+
- Express 4
- TypeScript 5
- MongoDB Atlas (database)
- Mongoose 7 (ODM)
- JWT (authentication)
- Bcryptjs (password hashing)

## 🔗 Links Importantes

- [Frontend README](./frontend/README.md)
- [Backend README](./backend/README.md)
- [Documentação Arquitetura](./docs/ARQUITETURA_MVP.md)

## 📝 Environment Variables

### Frontend (.env)

```
VITE_API_URL=http://localhost:5000
```

### Backend (.env)

```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lead-system
JWT_SECRET=your-super-secret-key-minimum-32-characters-long
JWT_EXPIRES_IN=24h
BCRYPT_SALT_ROUNDS=12
CORS_ORIGIN=http://localhost:5173
```

## ✅ Checklist Setup Inicial

- [ ] Clonar repositório
- [ ] Frontend: `npm install` na pasta frontend/
- [ ] Backend: `npm install` na pasta backend/
- [ ] MongoDB Atlas cluster criado
- [ ] Arquivo .env backend configurado
- [ ] `npm run dev` frontend funciona
- [ ] `npm run dev` backend funciona
- [ ] Health check: GET http://localhost:5000/health

## 🎯 Próximos Passos

1. Instalar dependências (frontend e backend)
2. Configurar variáveis de ambiente
3. Implementar Fase 1: Setup (components base)
4. Implementar Fase 2: Forms
5. Implementar Fase 3: Autenticação
6. ... (continue com próximas fases)

## 🔒 Segurança

- JWT com HS256
- Bcrypt para senhas (salt: 12)
- Rate limiting anti-spam
- CORS configurado
- Helmet.js headers
- Validação Zod frontend + backend

## 📞 Suporte

Para dúvidas sobre arquitetura, veja:
- `docs/ARQUITETURA_MVP.md` - Detalhes completos
- `frontend/README.md` - Frontend específico
- `backend/README.md` - Backend específico

## 📄 Licença

Todos os direitos reservados © 2026 Evolvetech
