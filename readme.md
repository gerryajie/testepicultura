# 🚀 SCMT Notification System

Sistem notifikasi real-time berbasis **Express.js**, **MongoDB**, dan **React.js + TailwindCSS**.  
Proyek ini terdiri dari dua bagian utama:
- **Backend (BE)** menggunakan Express.js dan MongoDB (Mongoose)
- **Frontend (FE)** menggunakan React.js dengan TailwindCSS

---

## 📦 Teknologi yang Digunakan

### 🔹 Backend
- Node.js + Express.js
- MongoDB (Mongoose ODM)
- Socket.io (Real-time notification)

### 🔹 Frontend
- React.js (Vite)
- TailwindCSS
- Axios
- Socket.io-client

---

## 🧩 Struktur Proyek

scmt-notification/
│
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── socket.js
│ ├── server.js
│ └── .env
│
└── frontend/
├── src/
│ ├── components/
│ ├── pages/
│ ├── utils/
│ └── App.jsx
├── tailwind.config.js
└── vite.config.js


---

## ⚙️ Instalasi & Menjalankan Proyek

### 1️⃣ Clone Repository
```bash
git clone <url-repository-kamu>
cd scmt-notification

2️⃣ Install Dependencies Backend
cd backend
npm install

Buat file .env di folder backend dengan isi seperti berikut:
MONGO_URI=mongodb+srv://gerryajie:hr2zo2iExqIZjcFf@cluster0.zaybzev.mongodb.net
PORT=5000

Lalu jalankan:
npm run dev

4️⃣ Install Dependencies Frontend
npm run dev

Setelah itu, aplikasi akan berjalan di:
Frontend: http://localhost:5173
Backend:  http://localhost:5000


📬 API Documentation

Dokumentasi lengkap API backend tersedia di Postman melalui link berikut:

👉 Postman Collection - SCMT Notification

| Key         | Deskripsi                   | Contoh Nilai                                                            |
| ----------- | --------------------------- | ----------------------------------------------------------------------- |
| `MONGO_URI` | Koneksi ke database MongoDB | `mongodb+srv://gerryajie:hr2zo2iExqIZjcFf@cluster0.zaybzev.mongodb.net` |
| `PORT`      | Port server backend         | `5000`                                                                  |


http://localhost:5000/api/meetings GET/ get meeting


http://localhost:5000/api/meetings POST / post meeting

http://localhost:5000/api/units GET / get unit

http://localhost:5000/api/rooms POST / create room

http://localhost:5000/api/rooms GET / get room



👨‍💻 Developer

Nama: Gerry Ajie Pratama
Stack: Fullstack JavaScript (Node.js, React, MongoDB)
Database: MongoDB Atlas