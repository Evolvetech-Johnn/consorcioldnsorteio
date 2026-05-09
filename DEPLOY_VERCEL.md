# Deploy no Vercel

## Passo a passo para deploy

### 1. Preparar o repositório

Certifique-se de que todas as alterações foram commitadas e enviadas para o GitHub:

```bash
git add .
git commit -m "Configurar deploy no Vercel"
git push origin main
```

### 2. Conectar ao Vercel

1. Acesse https://vercel.com/login e faça login com sua conta
2. Clique em **Add New Project**
3. Selecione o repositório `consorcioldnsorteio`
4. Clique em **Import**

### 3. Configurar o projeto

Na página de configuração do projeto:

- **Project Name**: `consorcioldnsorteio` (ou o nome que preferir)
- **Framework Preset**: Deixe o Vercel detectar automaticamente (será Vite)
- **Root Directory**: Deixe em branco (raiz do projeto)
- **Build Command**: Será preenchido automaticamente pelo `vercel.json`
- **Output Directory**: Será preenchido automaticamente pelo `vercel.json`

### 4. Configurar variáveis de ambiente

Na seção **Environment Variables**, adicione as seguintes variáveis:

| Nome | Valor |
|------|-------|
| `NODE_ENV` | `production` |
| `MONGODB_URI` | Sua URI do MongoDB Atlas |
| `JWT_SECRET` | Uma chave secreta segura (mínimo 32 caracteres) |
| `JWT_EXPIRES_IN` | `24h` |
| `BCRYPT_SALT_ROUNDS` | `12` |
| `CORS_ORIGIN` | URL do seu projeto no Vercel (ex: `https://consorcioldnsorteio.vercel.app`) |

**Como gerar JWT_SECRET:**

Windows PowerShell:
```powershell
[System.Convert]::ToHexString([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(16))
```

Linux/Mac:
```bash
openssl rand -hex 16
```

### 5. Deploy

Clique em **Deploy** e aguarde o processo ser concluído.

### 6. Verificar o deploy

Após o deploy ser concluído:
- Acesse a URL fornecida pelo Vercel
- Teste o health check: `https://seu-projeto.vercel.app/api/health`

## Arquivos criados/modificados

- `vercel.json`: Configuração principal do Vercel
- `api/index.ts`: Serverless Function para o backend
- `.env.example`: Exemplo de variáveis de ambiente
- `backend/src/config/environment.ts`: Atualizado para Vercel
- `backend/src/app.ts`: Atualizado para CORS com Vercel
- `frontend/src/services/api.ts`: Atualizado para usar URL relativa em produção

## Estrutura do deploy

- **Frontend**: Servido diretamente pelo Vercel (pasta `frontend/dist`)
- **Backend**: Executado como Serverless Function na rota `/api`

## Atualizações futuras

Para deployar novas versões:
1. Faça commit das alterações
2. Envie para o GitHub: `git push origin main`
3. O Vercel fará o deploy automaticamente
