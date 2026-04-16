# SoleMate E-Commerce — Frontend

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

Aplicação React responsável pela interface voltada ao cliente de um sistema de E-Commerce (loja de Sneakers). O foco tecnológico do projeto recai sobre a **Comunicação Ativa com a API REST** do Node.js, agora integrada diretamente ao **Supabase (PostgreSQL e Storage)**.

Acesse em: https://solemate-frontend.vercel.app/

## 🌟 Funcionalidades Principais

*   **Catálogo Responsivo Premium**: Lista de lançamentos atualizada via backend em tempo real. Filtros dinâmicos.
*   **Gestão Ágil (Administração de Produtos)**: Modalidade interativa de CRUD (Criação, Atualização, Leitura e Exclusão) para sapatos. O uso da classe `FormData` permite realizar uploads de imagens fisicamente que se tornarão "Buckets Públicos" no Storage do Supabase.
*   **Gerenciamento do Cliente e Histórico**: Sistema de cadastro de contatos e detalhamento customizado em `/:id`, buscando histórico do Postgres.
*   **Carrinho (Checkout - Novo Pedido)**: Validações dinâmicas de preços e limitadores de controle de estoque ativo localmente na UI para não gerar sobrecargas externas, integrando posteriormente o desconto em estoque na base de dados.

## 🛠️ Tecnologias Utilizadas

*   **[React 18+](https://reactjs.org/)**: Renderização declarativa de componentes de UI.
*   **[Vite](https://vitejs.dev/)**: Ferramenta de Build System, extremamente rápida e suporta Hot Module Replacement nativamente.
*   **[React Router DOM](https://reactrouter.com/)**: Gerenciamento das rotas (Single Page Application).
*   **[Axios](https://axios-http.com/)**: Requisições de rede.

## 🚀 Como Executar Localmente

### Pré-requisitos
*   Node.js (LTS recomendado).
*   A API (que engloba o banco Supabase) deve estar rodando na porta `3001` ou online, como especificado em seu `.env`.

### Instruções

1. Clone ou extraia o repositório em sua máquina.
2. Acesse a pasta do projeto via terminal.
3. Certifique-se da presença e preenchimento correto de um arquivo `.env` na raiz importando a URl da sua API:
```env
VITE_API_URL=http://localhost:3001/api
```
4. Instale as dependências executando o comando no gerenciador de pacotes:
```bash
yarn
```
5. Inicie o Server de Desenvolvimento:
```bash
yarn dev
```

### 📦 Hospedagem API (Render Free Tier)

Devido ao uso estratégico de uma API hospedada no *plano gratuito da Render.com*, o sistema conta com uma interface polida (Loading State) aguardando o **Cold Start** da API. Inicialmente o servidor da API sofre "desligamento automático" e pode levar cerca de 50 segundos para despertar na primeira requisição frontend, um comportamento administrado tranquilamente pela usabilidade da UI.

### Publicação em Nuvem
```bash
yarn build
```
O output final (HTML, CSS minificado, JS Transpilado e Assets de Imagem) será extraído para a pasta `dist`, perfeito para CDNs ou nuvens front (Vercel, Netlify, Render frontend, etc).

---
*Este sistema é uma aplicação desenvolvida focado em arquitetura em Nuvem na Faculdade de Tecnologia FATEC Cotia.*
