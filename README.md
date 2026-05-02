# 📌 JUMEUC Check-in

Sistema completo de gestão de presença para a juventude da igreja, desenvolvido com foco em simplicidade, experiência do usuário e arquitetura moderna baseada no App Router do Next.js.

Além do registro de presença, o sistema contempla controle de eventos, confirmação de presença, ranking de assiduidade e exibição pública em telão.

---

## ✨ Funcionalidades

### 🎯 Check-in

- ✅ Registro de presença simplificado
- ✅ Sugestão automática de nomes via `localStorage`
- ✅ Prevenção de duplicidade
- ✅ Atualização otimista (Optimistic UI)

---

### 🏆 Assiduidade

- ✅ Ranking dos participantes mais frequentes
- ✅ Contagem de presença por usuário

---

### ✅ Confirmação (Liderança)

- ✅ Área restrita para confirmação de presença real
- ✅ Separação entre check-in e presença confirmada

---

### 📅 Programações

- ✅ Cadastro de eventos
- ✅ Integração com calendário
- ✅ Base para validação de presença por data

---

### 🧱 Mural (Telão)

- ✅ Exibição pública dos participantes
- ✅ Avatares dinâmicos
- ✅ Layout otimizado para projeção

---

### 📖 Versículo diário

- ✅ Versículo bíblico automático
- ✅ Mesmo versículo para todos no dia
- ❌ Sem banco de dados
- ⚡ Baseado em cálculo determinístico

---

### 🧩 Experiência e UX

- ✅ Tabs inteligentes (nome salvo vs novo nome)
- ✅ Feedback em tempo real (toasts)
- ✅ Skeleton loading
- ✅ Overlay de carregamento global

---

## 🏗️ Stack Tecnológica

- Next.js (App Router)
- React 19
- TypeScript
- Prisma ORM
- Neon (PostgreSQL Serverless)
- Shadcn/UI
- TailwindCSS

---

## 📖 Versículo Diário

O sistema exibe automaticamente um versículo diferente a cada dia.

### 🔧 Como funciona

- Base bíblica armazenada em `nvi.json`
- Geração baseada no dia do ano
- Pseudo-aleatoriedade determinística
- Mesmo versículo para todos os usuários
- Atualização automática à meia-noite

> Sem banco. Sem estado persistido. Apenas cálculo determinístico.

---

## 📂 Estrutura do Projeto

```text
app/
├── attendance/   # Ranking de presença
├── checkin/      # Registro de presença
├── confirm/      # Confirmação pela liderança
├── register/     # Cadastro de eventos pela liderança
├── wall/         # Mural para telão
├── error/        # Tratamento de erros

features/
├── */components/
├── */hooks/
├── */utils/
├── */services/

server/
├── attendee/
├── calendar/
├── wall/

shared/
├── components/
├── constants/
├── hooks/
├── lib/
├── types/
├── utils/
```

---

## ⚙️ Instalação

### 1️⃣ Clone o repositório

```bash
git clone https://github.com/RafaelEdKepler/jumeuc-checkin.git
cd jumeuc-checkin
```

---

### 2️⃣ Instale as dependências

```bash
npm install
```

ou

```bash
pnpm install
```

---

### 3️⃣ Configure as variáveis de ambiente

Crie um arquivo `.env`:

```env
DATABASE_URL="sua-url-do-neon"
ENVIRONMENT="DEVELOPMENT"
NEXT_PUBLIC_LEADER_PASSWORD="password"
```

---

### 4️⃣ Execute as migrations

```bash
npx prisma migrate dev
npx prisma generate
```

---

### 5️⃣ Rode o projeto

```bash
npm run dev
```

Acesse: http://localhost:3000

---

## 🧠 Decisões Arquiteturais

- Uso de **Server Components** para reduzir bundle no client
- Separação por **features (domain-driven)**
- Uso de **Server Actions** para integração direta com o backend
- **Optimistic UI** para melhorar experiência do usuário
- Persistência local (`localStorage`) para reduzir fricção
- Controle de estado isolado via hooks por feature
- Prisma como camada de abstração do banco
- Banco serverless com Neon

---

## 🧪 Regras de Negócio

- Check-in vinculado a uma programação ativa
- Presença pode ser confirmada posteriormente
- Ranking baseado em presença acumulada
- Sugestão baseada no último nome utilizado

---

## 🚀 Próximas Evoluções

- [ ] Testes unitários
- [ ] Pesquisa por nome na tabela de presença
- [ ] Relatórios de presença personalizáveis (Quem mais veio, quem veio mais cedo, mais tarde, etc...)
- [ ] Generalizar para uso em múltiplas marcas

---

## 📜 Licença

Projeto desenvolvido para uso interno da juventude.
