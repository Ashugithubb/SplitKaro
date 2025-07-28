# 💸 Splitkaro – Group Expense Manager

**Splitkaro** is a Splitwise-like web application designed to help users manage shared expenses, track group balances, and settle debts easily and efficiently.

---

## 🚀 Tech Stack

| Layer       | Tech Used (Recommended)               |
|-------------|----------------------------------------|
| Frontend    | Next.js, React, MUI or Tailwind        |
| Backend     | NestJS, Express, TypeORM, PostgreSQL   |
| Auth        | JWT                |
| File Upload | Cloudinary         |
| Notifications | Email service (Nodemailer) or Push    |



---

## ✨ Features

### 👤 User Management

- 🔐 **Signup/Login** with email and password
- 📝 **Profile Management**: update name, email, avatar

---

### 💰 Expense Management

- ➕ **Add Expenses** with:
  - Description, amount, category, participants
  - Real-time splitting: equally or unequally
  - Optional receipt attachments
- ✏️ **Edit/Delete Expenses**

---

### 👥 Group Management

- 📦 **Create Groups**
- ➕ Add/Remove group members
- 📊 **View Group Summary**

---

### 🤝 Settlements

- 🧮 Auto-calculate who owes whom
- 🧾 View individual and group balances
- ✅ Mark debts as **Settled**

---

### 🔔 Notifications

- 🔄 Notify users on:
  - Expense creation or update
  - Debt settlements
- ✉️ Email or Push Notifications

---

### 📊 Reports

- 📈 Summary of expenses:
  - By **category**
  - By **time period**
- 📤 Export data as **CSV**

---

## 🔮 Future Enhancements

- 💱 Multi-currency support
- 📷 Receipt scanning using **OCR**
- 💳 Integration with payment gateways (e.g. Razorpay, Stripe)

---

## 🖥️ UI Design

- Clean, responsive layout
- Role-based rendering
- Optionally theme switch (dark/light)

---

## 📂 Folder Structure (Example)

```

/splitkaro/
├── splitkaro-frontend/     # Next.js frontend
└── splitkaro-backend/      # NestJS backend

````

---

## 🧑‍💻 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/splitkaro.git
cd splitkaro
````

### 2. Environment Setup

#### Backend: `splitkaro-backend/.env`

```env
DATABASE_URL=postgres://user:password@localhost:5432/splitkaro
JWT_SECRET=your_secret_key
```

#### Frontend: `splitkaro-frontend/.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

### 3. Run the App

#### Backend

```bash
cd splitkaro-backend
npm install
npm run start:dev
```

#### Frontend

```bash
cd splitkaro-frontend
npm install
npm run dev
```

---

## 📜 License

MIT License. Feel free to use, fork, and contribute.

---

## 🙋‍♀️ Author

Built with 💡 to simplify shared expenses and group budgeting.

