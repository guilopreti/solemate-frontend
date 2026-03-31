# SoleMate E-Commerce — Frontend

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

Aplicação React responsável pela interface voltada ao cliente de um sistema de E-Commerce (loja de Sneakers). O foco tecnológico do projeto recai sobre a **Comunicação Ativa com a API REST** do Node.js integrada diretamente aos serviços de Nuvem do Microsoft Azure (Table Storage e Blob Storage) na arquitetura do backend.

## 🌟 Funcionalidades Principais

*   **Catálogo Responsivo Premium**: Lista de lançamentos atualizada via backend em tempo real. Filtros dinâmicos compostos.
*   **Gestão Ágil (Administração de Produtos)**: Modalidade interativa de CRUD (Criação, Atualização, Leitura e Exclusão) para sapatos. O uso da classe `FormData` permite o gerenciador realizar requisições Multiparts do Javascript enviando imagens cruas fisicamente que se tornarão "Blobs Públicos" no Azure.
*   **Gerenciamento do Cliente e Histórico**: Sistema de cadastro de conta e detalhamento customizado em `/:id`, resgatando apenas histórico particular atrelado a elevia *rowKeys*.
*   **Carrinho (Checkout)**: Validações dinâmicas de precos e limitadores de controle de estoque ativo localmente na UI para não gerar sobrecargas externas.

## 🛠️ Tecnologias Utilizadas

*   **[React 18+](https://reactjs.org/)**: Renderização declarativa de componentes de UI.
*   **[Vite](https://vitejs.dev/)**: Ferramenta de Build System, extremamente rápida e suporta Hot Module Replacement nativamente.
*   **[React Router DOM](https://reactrouter.com/)**: Gerenciamento das rotas (Single Page Application).
*   **[Axios](https://axios-http.com/)**: Requisições de rede.

## 🚀 Como Executar Localmente

### Pré-requisitos
*   Node.js (LTS recomendado).
*   Garantir a execução da API (Backend com Node e Azure integrados rodando normalmente em `localhost:3001`).

### Instruções

1. Clone ou extraia o repositório em sua máquina.
2. Acesse a pasta do projeto via terminal.
3. Certifique-se da presença e preenchimento correto de um arquivo `.env` na raiz importando a URl da sua API:
```env
VITE_API_URL=http://localhost:3001/api
```
4. Instale as dependências executando o comando no gerenciador de pacote nativo local:
```bash
yarn
```
5. Inicie o Server de Desenvolvimento:
```bash
yarn dev
```

### 📦 Instruções de Publicação (Deploy)

Esse projeto está perfeitamente estruturado para funcionar nas maiores CDNs com uma simples construção em produção.

```bash
yarn build
```
O output final (HTML, CSS minificado, JS Transpilado e Assets de Imagem) será extraído para a pasta dist, perfeito para a nuvem. (Você pode utilizar `Vercel`, `Netlify`, `Azure Static Web Apps` entre outras).

---
*Este sistema é uma aplicação P1 desenvolvida focado em arquitetura em Nuvem na Faculdade de Tecnologia FATEC Cotia.*
