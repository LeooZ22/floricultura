# JR Arte Floral — Floricultura Web App

Site/catálogo com painel de gestor para a JR Arte Floral, construído com React + Vite + Firebase.

---

## 🚀 Como configurar o projeto

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar o Firebase

1. Acesse [https://console.firebase.google.com](https://console.firebase.google.com)
2. Crie um projeto (ou use um existente)
3. Vá em **Configurações do Projeto → Seus apps → Web** e copie as credenciais
4. Abra o arquivo `src/firebase/config.js` e substitua os valores:

```js
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJETO_ID",
  storageBucket: "SEU_PROJETO.appspot.com",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID"
}
```

### 3. Ativar os serviços no Firebase

No Console do Firebase, ative:

- **Authentication → E-mail/senha** (para o login do gestor)
- **Firestore Database** (para armazenar os produtos) — modo produção ou teste
- **Storage** (para upload de fotos dos arranjos)

### 4. Criar o usuário gestor

No Firebase Console → Authentication → Users → **Add user**:
- E-mail: o e-mail do gestor
- Senha: uma senha segura

### 5. Regras do Firestore (recomendadas)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 6. Regras do Storage (recomendadas)

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 7. Adicionar o logo

Coloque o arquivo `logo.png` em `src/assets/logo.png`.

### 8. Rodar o projeto

```bash
npm run dev
```

---

## 📁 Estrutura do projeto

```
src/
├── assets/
│   └── logo.png
├── components/
│   ├── Navbar.jsx
│   └── ProductCard.jsx
├── contexts/
│   └── AuthContext.jsx
├── firebase/
│   └── config.js
├── hooks/
│   └── useProducts.js
├── pages/
│   ├── Home.jsx      ← catálogo público
│   ├── Login.jsx     ← login do gestor
│   └── Admin.jsx     ← painel de gestão
├── App.jsx
├── main.jsx
└── index.css
```

---

## ✨ Funcionalidades

- **Catálogo público** com filtros por categoria, badge de disponibilidade e botão de encomendar via WhatsApp
- **Painel do gestor** com login seguro via Firebase Auth
- **CRUD completo** de arranjos: adicionar, editar, excluir
- **Upload de fotos** via Firebase Storage
- **Dados em tempo real** com Firestore (sem precisar recarregar a página)

---

## 📱 Link do WhatsApp

No arquivo `src/components/ProductCard.jsx`, ajuste o número do WhatsApp na linha:

```jsx
href={`https://wa.me/55SEUNUMERO?text=...`}
```

Substitua `SEUNUMERO` pelo DDD + número (ex: `6599999999`).
