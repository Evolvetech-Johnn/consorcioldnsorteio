# Deploy no Netlify

## Passo a passo para deploy

### 1. Criar conta no Netlify
Acesse https://app.netlify.com/signup e crie sua conta (gratuita).

### 2. Conectar ao repositório GitHub
1. No painel do Netlify, clique em **Add new site** → **Import an existing project**
2. Selecione **GitHub**
3. Autorize o Netlify a acessar seus repositórios
4. Selecione o repositório `consorcioldnsorteio`

### 3. Configurar o deploy
Na página de configuração, o Netlify já detectará automaticamente as configurações do `netlify.toml`:

| Campo | Valor (já preenchido) |
|-------|------------------------|
| **Base directory** | `frontend` |
| **Build command** | `npm run build` |
| **Publish directory** | `dist` |

Clique em **Deploy site**.

### 4. Aguardar o build
O Netlify fará o build automaticamente. Acompanhe o progresso na página do deploy.

### 5. Pronto!
Quando o deploy for concluído, você receberá uma URL como:
`https://seu-projeto-aleatorio-123456.netlify.app`

---

## Configuração adicional (opcional)

### Mudar o nome do site
1. Vá para **Site settings** → **Change site name**
2. Digite o nome que preferir (ex: `consorcio-uniao`)
3. Clique em **Save**

### Configurar domínio personalizado
1. Vá para **Domain management**
2. Clique em **Add custom domain**
3. Siga as instruções para configurar seu domínio

---

## Deploy automático
Sempre que você fizer push para a branch `main`, o Netlify fará o deploy automaticamente!

---

## Arquivos de configuração
- `netlify.toml`: Configuração principal do Netlify
