# SuperSign - Sistema de Assinatura Digital

## 🚀 Sobre o Projeto
O SuperSign é uma aplicação web moderna para assinatura digital de documentos, desenvolvida como parte de um desafio técnico. O sistema permite que usuários façam upload de documentos, solicitem assinaturas e gerenciem seus documentos de forma segura e intuitiva.

## 🛠️ Tecnologias Utilizadas
- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Banco de Dados**: SQLite com Prisma ORM
- **Autenticação**: NextAuth.js
- **Provedores de Login**: Credenciais e  GitHub
- **Upload de Arquivos**: FileSaver
- **Validação**: Zod
- **Estilização**: Tailwind CSS
- **ORM**: Prisma
- **Gerenciamento de Estado**: React Hook Form

## 📋 Funcionalidades Implementadas

### Autenticação
- [x] Registro de usuário com email/senha
- [x] Login com email/senha
- [x] Login social com GitHub
- [x] Proteção de rotas
- [x] Gerenciamento de sessão

### Documentos
- [x] Upload de documentos
- [x] Listagem de documentos
- [x] Visualização de documentos
- [x] Assinatura digital
- [x] Histórico de assinaturas
- [x] Exclusão de documentos

## 🏗️ Arquitetura e Decisões Técnicas

### Estrutura do Projeto
```
src/
├── app/                    # Páginas e layouts da aplicação
│   ├── (auth)/            # Rotas de autenticação
│   ├── (dashboard)/       # Rotas protegidas
│   └── api/               # API Routes
├── components/            # Componentes reutilizáveis
│   ├── auth/             # Componentes de autenticação
│   ├── documents/        # Componentes relacionados a documentos
│   ├── providers/        # Provedores de contexto
│   └── shared/          # Componentes compartilhados
└── lib/                  # Utilitários e configurações
    ├── auth/            # Configurações de autenticação
    ├── prisma/          # Configuração do Prisma
    └── schemas/         # Schemas de validação
```

### Decisões Técnicas

1. **Next.js 14 com App Router**
   - Escolhido por sua performance e recursos modernos
   - Server Components para melhor SEO e performance
   - API Routes para backend integrado

2. **TypeScript**
   - Tipagem estática para maior segurança
   - Melhor experiência de desenvolvimento
   - Redução de bugs em tempo de desenvolvimento

3. **Prisma com SQLite**
   - ORM moderno e type-safe
   - SQLite para simplicidade e facilidade de desenvolvimento
   - Migrations automáticas

4. **NextAuth.js**
   - Solução robusta para autenticação
   - Suporte a múltiplos provedores
   - Integração com Prisma

5. **Tailwind CSS**
   - Estilização rápida e consistente
   - Design responsivo
   - Customização fácil

## 🚧 Desafios e Soluções

### 1. Autenticação Social
**Desafio**: Implementar login social com múltiplos provedores mantendo a consistência dos dados.

**Solução**: 
- Uso do PrismaAdapter do NextAuth
- Modelo de dados unificado para usuários
- Tratamento de erros específicos por provedor

### 2. Upload de Documentos
**Desafio**: Gerenciar uploads de arquivos de forma segura e eficiente.

**Solução**:
- Integração com FileSaver
- Validação de tipos de arquivo
- Processamento assíncrono

### 3. Assinatura Digital
**Desafio**: Implementar um sistema de assinatura digital confiável.

**Solução**:
- Canvas para captura de assinatura
- Armazenamento seguro das imagens
- Histórico de assinaturas

### 4. Proteção de Rotas
**Desafio**: Garantir que apenas usuários autenticados acessem rotas protegidas.

**Solução**:
- Middleware de autenticação
- Redirecionamento automático
- Proteção de API Routes

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Conta no GitHub


### Configuração do Ambiente

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/supersign.git
cd supersign
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```
Edite o arquivo `.env` com suas credenciais.

4. Execute as migrações do banco de dados:
```bash
npx prisma generate
npx prisma db push
```

5. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

### Variáveis de Ambiente Necessárias
```env
# Banco de Dados
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_SECRET="seu_secret_aqui"
NEXTAUTH_URL="http://localhost:3000"

# GitHub OAuth
GITHUB_ID="seu_github_id"
GITHUB_SECRET="seu_github_secret"


```

## 📝 Licença
Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Contribuição
1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Faça commit das alterações (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte
Para suporte, envie um email para [seu-email@exemplo.com] ou abra uma issue no repositório.
