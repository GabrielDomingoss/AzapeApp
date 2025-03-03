# 🚀 Projeto Azape - Dashboard & API

## 📌 Sobre o Projeto

Este projeto é um painel administrativo completo para gerenciar pedidos, vendas e usuários. Ele conta com um **frontend em React** e um **backend em Node.js**.

## 🛠 Tecnologias Utilizadas

### **Frontend** (React + Material UI)

- React.js
- TypeScript
- React Router
- Material UI
- Axios
- Sass

### **Backend** (Node.js + MongoDB)

- Node.js
- Express.js
- Mongoose (MongoDB)
- Bcrypt para criptografia de senha
- JSON Web Token (JWT) para autenticação

---

## 📂 Estrutura do Projeto

### **Frontend (**``**)**

```bash
/azape_frontend
│── src
│   ├── components  # Componentes reutilizáveis (Drawer, Footer, NotificationMenu...)
│   ├── pages       # Páginas principais (Dashboard, Login, Reset Password...)
│   ├── hooks       # Context API para autenticação (useAuth)
│   ├── styles      # Arquivos CSS/SASS
│   ├── services    # Integração com a API (Axios)
│   └── App.tsx     # Componente principal
```

### **Backend (**``**)**

```bash
/az_proof_initial_api
│── src
│   ├── controllers  # Lógica das requisições (Login, Reset Password, Dashboard...)
│   ├── models       # Modelos do banco de dados (User, Order...)
│   ├── routes       # Definição das rotas da API
│   ├── config       # Configurações de autenticação
│   ├── app.js       # Inicializa o servidor Express
│   └── server.js    # Conexão com o MongoDB
```

---

## 📥 Como Rodar o Projeto

### **1️⃣ Clone o repositório**

```bash
git clone https://github.com/GabrielDomingoss/AzapeApp.git
cd AzapeApp
```

### **2️⃣ Instale as dependências**

#### **Frontend**

```bash
cd azape_frontend
npm install
```

#### **Backend**

```bash
cd az_proof_intial_api
npm install
```

### **3️⃣ Rodar o Backend**

```bash
cd az_proof_intial_api
npm run dev
```

### **4️⃣ Rodar o Frontend**

```bash
cd azape_frontend
npm run dev
```

---

## 📌 Funcionalidades Principais

✅ **Autenticação de Usuário (Login/Logout)** ✅ **Dashboard com informações de pedidos e vendas** ✅ **CRUD de usuários, pedidos e produtos** ✅ **Reset de Senha sem envio de e-mail** ✅ **Sidebar responsiva e adaptável** ✅ **Menu de Notificações** ✅ **Paginação no backend para melhorar performance** ✅ **Tradução dos status de pedidos e métodos de pagamento**

---

## 📞 Contato

Caso tenha dúvidas ou sugestões, me chame! 😃

🚀 **Desenvolvido por **[**Gabriel Domingos**](https://github.com/GabrielDomingoss)

