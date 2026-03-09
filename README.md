---

# QuickHire – Job Board Application

QuickHire is a full-stack job board platform where companies can post jobs and candidates can browse and apply.
The project is built with a **modern TypeScript stack**, using **Express + Prisma + PostgreSQL** for the backend and **React + Vite + TailwindCSS** for the frontend.

**Live URLs:**

* Backend: [https://quickhire-backend-p80j.onrender.com](https://quickhire-backend-p80j.onrender.com)
* Frontend: [https://quick--hire.vercel.app](https://quick--hire.vercel.app)

---

## 🚀 Tech Stack

### Backend

* Node.js
* Express.js
* TypeScript
* Prisma ORM
* PostgreSQL (NeonDB)
* Zod (environment validation)

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS

### DevOps

* Render (Backend Deployment)
* Vercel (Frontend Deployment)

---

## 📁 Project Structure

```
QuickHire
│
├── backend_quickhire
│   ├── prisma
│   │   ├── migrations
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── src
│   │   ├── config        # Environment & Prisma config
│   │   ├── controllers   # API logic
│   │   ├── lib           # Server startup & DB connection
│   │   ├── routes        # Express routes
│   │   ├── types         # TypeScript types
│   │   └── server.ts     # App entry point
│   ├── package.json
│   └── tsconfig.json
│
├── frontend_quickhire
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── types
│   │   └── utils
│   ├── vite.config.ts
│   └── package.json
│
└── docker-compose.yml
```

---

## ⚙️ Backend Setup

Navigate to backend:

```bash
cd backend_quickhire
```

### Install dependencies

```bash
npm install
```

### Setup environment variables

Create `.env.dev` for development and `.env` for production:

```env
PORT=5000
DATABASE_URL=your_postgres_connection_string
```

Example (NeonDB):

```env
DATABASE_URL=postgresql://user:password@host/database
```

---

### Run database migrations

Development:

```bash
npx prisma migrate dev
```

Production:

```bash
npx prisma migrate deploy
```

---

### Start development server

```bash
npm run dev
```

Server will run on:

```
http://localhost:5000
```

---

### Production build

```bash
npm run build
npm start
```

---

## 🎨 Frontend Setup

Navigate to frontend:

```bash
cd frontend_quickhire
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

## 📡 API Endpoints

### Jobs

| Method | Path                           | Description             |
| ------ | ------------------------------ | ----------------------- |
| GET    | `/api/jobs`                    | Get all jobs            |
| GET    | `/api/jobs/:id`                | Get job by ID           |
| GET    | `/api/jobs/location-available` | Get available locations |
| POST   | `/api/jobs`                    | Create a new job        |
| DELETE | `/api/jobs/:id`                | Delete a job by ID      |

### Applications

| Method | Path                           | Description                        |
| ------ | ------------------------------ | ---------------------------------- |
| POST   | `/api/applications`            | Create a new application           |
| GET    | `/api/applications`            | Get all applications               |
| GET    | `/api/applications/:id`        | Get an application by ID           |
| GET    | `/api/applications/resume/:id` | Get resume link for an application |

> Note: Frontend should prepend the backend URL if using API calls, e.g. `https://quickhire-backend-p80j.onrender.com/api/jobs`.

---

## 🌍 Deployment

### Backend (Render)

1. Connect GitHub repository.
2. Set **Build Command**:

```bash
npm install && npm run build
```

3. Set **Start Command**:

```bash
npm start
```

4. Add environment variables:

```env
DATABASE_URL
PORT
NODE_ENV=production
```

### Frontend (Vercel)

1. Deploy the `frontend_quickhire` folder.
2. Add environment variable:

```env
VITE_API_BASE_URL=https://quickhire-backend-p80j.onrender.com/api
```

---

## ✨ Features

* Post job listings
* Browse available jobs
* View job details
* Apply for jobs
* Admin job posting page
* Responsive UI
* PostgreSQL database
* Type-safe backend with Prisma

---

## 🧠 Future Improvements

* Authentication (JWT)
* Company dashboards
* File upload for resumes
* Job search & filtering
* Pagination
* Email notifications
* Role-based access control

---

## 👨‍💻 Author

**Fardin Ahsan**

GitHub: [https://github.com/fardin-ahsan-sachi](https://github.com/fardin-ahsan-sachi)

---

## 📄 License

This project is licensed under the **ISC License**.

---