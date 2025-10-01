
![Gopher in Biplane](https://go.dev/images/gophers/biplane.svg)

Este é um projeto de uma aplicação de lista de tarefas (To-Do List) feito em **Go** e um frontend moderno e reativo em **React**.

O projeto foi desenvolvido como uma forma de aplicar e aprofundar conhecimentos em Go, construindo uma API RESTful do zero, com funcionalidades interessantes como *soft delete* e a capacidade de restaurar tarefas (undo).

## ✨ Funcionalidades Principais

A aplicação oferece um gerenciamento de tarefas com as seguintes funcionalidades:

  - **Criar, Listar e Atualizar Tarefas:** Funcionalidades básicas de um sistema de To-Do.
  - **Soft Delete:** Ao excluir uma tarefa, ela não é removida permanentemente do banco de dados. Em vez disso, um campo `deletedAt` é preenchido com a data e hora da exclusão. As tarefas "excluídas" são simplesmente omitidas da listagem principal, prevenindo a perda acidental de dados.
  - **Restaurar Tarefas (Undo):** A API expõe um endpoint específico para restaurar uma tarefa que sofreu soft delete. A interface do frontend utiliza essa funcionalidade para oferecer uma opção de "Desfazer" logo após a exclusão, essa opção fica disponível ao usuário por alguns segundos.
  - **Frontend Reativo:** A interface, construída com React e Chakra UI, consome a API Go e se atualiza em tempo real, proporcionando uma experiência de usuário fluida.

## 🛠️ Ferramentas e Tecnologias

Este projeto foi construído utilizando um conjunto de ferramentas modernas tanto no backend quanto no frontend.

#### **Backend**

  - **Go (Golang):** Linguagem principal utilizada para construir a API.
  - **Fiber:** Framework web para Go, conhecido por sua alta performance e expressividade.
  - **MongoDB:** Banco de dados NoSQL utilizado para persistir os dados das tarefas.
  - **GoDotEnv:** Biblioteca para carregar variáveis de ambiente a partir de um arquivo `.env`.
  - **Air:** Ferramenta de live-reload para desenvolvimento em Go, que reinicia o servidor automaticamente a cada alteração no código.

#### **Frontend**

  - **React:** Biblioteca para construção da interface de usuário.
  - **TypeScript:** Superset do JavaScript que adiciona tipagem estática ao código.
  - **Vite:** Ferramenta de build extremamente rápida para desenvolvimento frontend.
  - **Chakra UI:** Biblioteca de componentes para React que facilita a criação de interfaces acessíveis e consistentes.
  - **TanStack (React) Query:** Biblioteca para gerenciamento de estado de servidor, cache, e sincronização de dados.

## 🚀 Como Executar o Projeto

Para rodar a aplicação localmente, siga os passos abaixo.

#### **Pré-requisitos**

  - Go (versão 1.25 ou superior)
  - Node.js e npm (ou outro gerenciador de pacotes)
  - MongoDB (uma instância local ou um cluster no Atlas)

#### **1. Backend**

```bash
# Navegue até o diretório do backend
cd backend

# Crie um arquivo .env com as variáveis de ambiente (MONGODB_URI e PORT)
# Exemplo de .env:
# MONGODB_URI=mongodb+srv://...
# PORT=5000

# Instale as dependências
go mod tidy

# Execute o servidor (com live-reload usando Air)
air

# Ou execute normalmente
go run main.go
```

O servidor da API estará rodando em `http://localhost:5000`.

#### **2. Frontend**

```bash
# Navegue até o diretório do client
cd client

# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm run dev
```

A aplicação React estará disponível em `http://localhost:5173`.

## 🔌 API Endpoints

A API em Go oferece os seguintes endpoints para o gerenciamento de tarefas:

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `GET` | `/api/todos` | Retorna a lista de todas as tarefas que não foram excluídas (soft delete). |
| `POST` | `/api/todos` | Cria uma nova tarefa. |
| `PATCH` | `/api/todos/:id` | Marca uma tarefa específica como concluída. |
| `DELETE` | `/api/todos/:id` | Realiza o soft delete de uma tarefa (define o campo `deletedAt`). |
| `POST` | `/api/todos/:id/restore` | Restaura uma tarefa que sofreu soft delete (remove o campo `deletedAt`). |
