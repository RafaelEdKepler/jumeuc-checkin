[Jumeuc Check-in]

Sistema de check-in para a juventude da igreja, desenvolvido com foco em simplicidade, organização e arquitetura moderna.

Além do controle de presença, o sistema exibe automaticamente um versículo bíblico diferente por dia, sem necessidade de banco de dados para essa funcionalidade.

✨ Funcionalidades

✅ Registro de presença

✅ Persistência com Prisma + Neon (PostgreSQL)

✅ UI moderna com Shadcn

✅ Versículo bíblico diário automático

✅ Server Components

✅ Tipagem forte com TypeScript

✅ Arquitetura alinhada ao React 19

🏗️ Stack Tecnológica

- Next.js (App Router);
- React 19;
- TypeScript;
- Prisma ORM;
- Neon (PostgreSQL Serverless);
- Shadcn/UI;
- TailwindCSS;

📖 Versículo Diário

O sistema exibe automaticamente um versículo diferente a cada dia.

Como funciona?

Base bíblica armazenada em nvi.json

Geração de seed determinístico baseado no dia do ano

Pseudo-aleatoriedade determinística

Mesmo versículo para todos os usuários durante o dia

Atualização automática à meia-noite

Sem banco.
Sem estado persistido.
Apenas cálculo determinístico.

📂 Estrutura do Projeto

.

├── app/

│   ├── checkin/

│   ├── utils/

│   └── layout.tsx

├── lib/

│   ├── prisma.ts

│   └── nvi.json

├── types/

├── prisma/

│   └── schema.prisma

└── README.md


⚙️ Instalação

1️⃣ Clone o repositório

``git clone https://github.com/seu-usuario/jumeuc-checkin.git
cd jumeuc-checkin``

2️⃣ Instale as dependências

``npm install``

ou

``pnpm install``

3️⃣ Configure as variáveis de ambiente

Crie um arquivo .env:

``DATABASE_URL="sua-url-do-neon"``

4️⃣ Execute as migrations

``npx prisma migrate dev``
``npx prisma generate``

5️⃣ Rode o projeto

``npm run dev``

Acesse: http://localhost:3000

🧠 Decisões Arquiteturais

- Uso de Server Components para reduzir bundle no client;
- Versículo diário determinístico sem persistência;
- Separação clara entre domínio, utilidades e UI;
- Prisma como camada de abstração do banco;
- Banco serverless com Neon;

🚀 Próximas Evoluções

 - Métricas de presença;
 - Autenticação por perfil de Liderança;
 - Histórico de eventos

📜 Licença

Projeto desenvolvido para uso interno da juventude.
