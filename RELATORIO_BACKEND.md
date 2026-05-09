# 📋 Relatório de Implementação do Backend

## 📌 Objetivo
Orientar o desenvolvedor do backend na implementação manual da API para integração com o frontend já desenvolvido.

---

## 🛠️ Estrutura do Projeto (já existente)
```
projeto-c-uniao/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── constants.ts
│   │   │   └── environment.ts (já atualizado, sem MongoDB)
│   │   ├── middleware/
│   │   │   └── errorHandler.ts
│   │   ├── utils/
│   │   │   ├── formatting.ts
│   │   │   ├── helpers.ts
│   │   │   ├── jwt.ts
│   │   │   └── password.ts
│   │   ├── app.ts
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
└── frontend/ (já implementado)
```

---

## 📋 Funcionalidades Requeridas no Backend

### 1. **Banco de Dados**
Escolha uma tecnologia de banco de dados (ex: PostgreSQL, MySQL, Firebase, etc.) e implemente as seguintes entidades:

| Entidade | Campos Principais |
|----------|-------------------|
| **Lead** | `id`, `fullName`, `whatsapp`, `instagram`, `email`, `consultantId` (opcional), `campaignId`, `createdAt`, `updatedAt` |
| **Admin** | `id`, `name`, `email`, `passwordHash`, `role` (`owner/admin/consultant`), `isActive`, `createdAt`, `updatedAt` |
| **Consultant** | `id`, `name`, `email`, `phone`, `active`, `createdAt`, `updatedAt` |
| **Campaign** | `id`, `title`, `eventName`, `active`, `startDate`, `endDate`, `consultantId` (opcional), `createdAt`, `updatedAt` |
| **Raffle** | `id`, `title`, `campaignId`, `winnerLeadId` (opcional), `createdAt`, `updatedAt` |

---

### 2. **Endpoints da API**

#### **Autenticação**
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/auth/login` | Login de administrador/consultor (retorna token JWT) |
| POST | `/api/auth/logout` | Logout |

#### **Leads**
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/leads` | Criar novo lead (rota pública, para o formulário `/participar`) |
| GET | `/api/leads` | Listar leads (autenticado, com paginação, busca e filtros) |
| GET | `/api/leads/:id` | Obter lead por ID (autenticado) |
| PUT | `/api/leads/:id` | Atualizar lead (autenticado) |
| DELETE | `/api/leads/:id` | Excluir lead (autenticado) |
| GET | `/api/leads/export/csv` | Exportar leads em CSV (autenticado) |

#### **Campanhas**
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/campaigns` | Listar campanhas (autenticado) |
| GET | `/api/campaigns/:id` | Obter campanha por ID (autenticado) |
| POST | `/api/campaigns` | Criar campanha (autenticado) |
| PUT | `/api/campaigns/:id` | Atualizar campanha (autenticado) |
| DELETE | `/api/campaigns/:id` | Excluir campanha (autenticado) |

#### **Sorteios**
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/raffles` | Listar sorteios (autenticado, histórico) |
| GET | `/api/raffles/:id` | Obter sorteio por ID (autenticado) |
| POST | `/api/raffles` | Criar sorteio (autenticado, selecionar campanha e sortear lead aleatório) |
| PUT | `/api/raffles/:id` | Atualizar sorteio (autenticado) |

---

### 3. **Validações (no Backend)**
Use Zod (já como dependência no package.json) para validar os dados de entrada:

- **Lead**: `fullName` (mínimo 3 chars), `whatsapp` (mínimo 10 dígitos), `email` (opcional, válido)
- **Admin**: `email` (válido), `password` (mínimo 8 chars)
- **Campaign**: `title` (obrigatório), `startDate` < `endDate`
- **Raffle**: `campaignId` (obrigatório)

---

### 4. **Segurança**
- **Hash de senhas**: Use bcrypt (já como dependência)
- **Autenticação**: Use JWT (já como dependência) para rotas privadas
- **CORS**: Configure o CORS para aceitar requisições do frontend (já configurado no app.ts)
- **Rate Limiting**: Use express-rate-limit (já como dependência) para evitar abusos

---

### 5. **Regras de Negócio para Sorteio**
1. Selecione uma campanha ativa
2. Obtenha todos os leads daquela campanha
3. Selecione um lead aleatoriamente (use algoritmo de randomização seguro)
4. Registre o vencedor na entidade `Raffle`
5. Evite duplicidade: um lead só pode ganhar uma vez por campanha (opcional)

---

### 6. **Resposta da API (Padronizada)**
Use um formato padrão para todas as respostas:
```typescript
// Sucesso
{
  "success": true,
  "data": { /* dados */ },
  "message": "Mensagem opcional"
}

// Erro
{
  "success": false,
  "error": "Mensagem de erro",
  "code": "CODIGO_DO_ERRO"
}
```

---

## 🚀 Próximos Passos (Backend Dev)
1. Escolha a tecnologia de banco de dados
2. Implemente as entidades/models
3. Implemente os endpoints da API
4. Adicione validações com Zod
5. Implemente autenticação JWT
6. Teste a integração com o frontend (frontend já está pronto para consumir a API)

---

## 📞 Dúvidas
Se precisar de ajuda, é só perguntar!
