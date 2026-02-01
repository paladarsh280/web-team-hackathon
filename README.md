
🔔 Important Notice

This setup is only for users who want to pull the Docker images and understand the DevOps implementation.

👉 If you only want to use the platform, please visit:
🌐 https://soft-madeleine-983954.netlify.app/

📦 Prerequisites

Before running the project, make sure you have the following installed:

✅ Docker Compose

✅ Docker

git clone https://github.com/paladarsh280/web-team-hackathon.git
cd web-team-hackathon

⚙️ Environment Setup

Create a .env file inside the backend/ folder and add the following variables:

MONGO_URI=mongodb://mongo_db:27017/my_app_db
PORT=5000
JWT_SECRET=your_jwt_secret_here

RESEND_API_KEY=your_resend_api_key_here
MAIL_FROM=MAIL_FROM=Adarsh "<"send@adarsh28.online">" (remove all curly braces i)



 --- Run the below command ----

  docker compose up --build  

  All set you are ready to run 
  open "  http://localhost "

🚀 Purpose of This Setup

This configuration allows users to:

Pull Docker images

Run containers locally

Understand containerization, networking, and environment-based configuration



# 🚔 Digital e-Malkhana Platform (Police Evidence Management System)

# 📌 Problem Statement

The **Digital e-Malkhana Platform** is a functional prototype designed for police stations to manage seized evidence and property digitally.

It simulates real police workflows from:

- Login Authentication  
- Case Registration  
- Property Entry  
- QR Code Generation  
- Chain of Custody Tracking  
- Disposal Workflow  
- Dashboard Analytics  
- Search & Case Management  

This system ensures transparency, accountability, and proper evidence tracking for court proceedings.

---

# ✅ Core Modules Implemented

---

## ✅ Module 1: Authentication System

- Username & Password based login  
- JWT Token Authentication  
- Protected Routes for secure access  
- Role-based access control (Optional Feature)

📂 Backend Implementation:

- `controllers/auth.controller.js`
- `routes/auth.routes.js`
- `middlewares/auth.js`

📂 Frontend Pages:

- `pages/auth/Login.jsx`
- `pages/auth/Signup.jsx`

---

## ✅ Module 2: Dashboard (Case Overview)

The dashboard displays 3 major case metrics:

1. **Total Cases**
2. **Disposed Cases**
3. **Pending Cases**

📂 Backend:

- `controllers/dashboard.controller.js`
- `routes/dashboard.routes.js`

📂 Frontend:

- `pages/dashboard/DashboardHome.jsx`

---

## ✅ Module 3: Case Entry Workflow (Multi-Step Form)

Users can register a new case with details like:

- Police Station Name  
- Investigating Officer Name & ID  
- Crime Number & Year  
- Date of FIR  
- Date of Seizure  
- Act & Law  
- Sections of Law  

Each case can contain **multiple seized properties**:

- Category of Property  
- Belonging To (Accused / Complainant / Unknown)  
- Nature of Property  
- Quantity & Units  
- Storage Location (Rack / Room / Locker ID)  
- Description  
- Upload Evidence Photo  

📂 Frontend:

- `pages/cases/AddCase.jsx`

📂 Backend:

- `controllers/case.controller.js`
- `models/Case.model.js`
- `routes/case.routes.js`

---

### ✅ QR Code Generation

After property entry, the system generates a **dynamic QR code** for each property.

This QR can be printed and attached to physical evidence.

---

## ✅ Module 4: Chain of Custody Tracking (Part-II)

Tracks evidence movement over time with full logs:

- From Location / Officer  
- To Location / Officer  
- Purpose (Court, FSL, Analysis, Storage)  
- Date & Time  
- Remarks  

Chronological custody history is maintained, critical for legal evidence handling.

📂 Backend:

- `controllers/custody.controller.js`
- `models/CustodyLog.model.js`
- `routes/custody.routes.js`

📂 Frontend:

- `pages/evidence/CustodyManager.jsx`

---

## ✅ Module 5: Disposal of Property (Part-III)

When a case reaches closure, disposal details are captured:

- Disposal Type (Returned / Destroyed / Auctioned / Court Custody)
- Court Order Reference
- Date of Disposal
- Remarks

After disposal, case status updates automatically.

---

## ✅ Module 6: Case Management & Search

Manage Entries section allows:

- Searching cases by Crime No / Year  
- Viewing full case details  
- Viewing all associated properties  
- QR Code printing  
- Custody logs tracking  

📂 Frontend:

- `pages/cases/CaseList.jsx`
- `pages/cases/CaseDetails.jsx`

---

# ⭐ Optional Features Implemented

✅ Role-Based Access Control (Admin/User)  
✅ Alerts for long pending cases  
✅ Evidence Photo Upload system  
✅ Export / Print QR & Case Reports  
✅ Protected Routes (`ProtectedRoute.jsx`, `PublicRoute.jsx`)  

---

---

# 🏗️ Project Folder Structure

## Backend

backend/
┣ config/
┣ controllers/
┣ middlewares/
┣ models/
┣ routes/
┣ uploads/
┣ utils/
┣ app.js
┣ server.js
┣ Dockerfile


## Frontend



src/
┣ components/
┣ context/
┣ pages/
┣ routes/
┣ services/
┣ utils/
┣ App.jsx
┣ main.jsx
┣ Dockerfile


---

---

# 🐳 DevOps Track Implementation (Main Focus)

This project is fully containerized and CI/CD enabled.

---

## ✅ Containerized Services

| Service     | Technology |
|------------|------------|
| Frontend   | React + Vite |
| Backend    | Node.js + Express |
| Database   | MongoDB |

Each service runs independently inside Docker containers.

---

# 🧱 Docker Setup

## Backend Dockerfile

Located at:



backend/Dockerfile


---

## Frontend Dockerfile

Located at:



Dockerfile


---

# 🐙 Docker Compose Orchestration

The complete application is orchestrated using:



docker-compose.yml


Services:

- frontend
- backend
- mongo database

All containers start together with one command.

---


🔁 CI/CD Pipeline Using GitHub Actions

Workflow file:

.github/workflows/ci-cd.yml

Pipeline Automatically Performs:

✅ Builds frontend Docker image
✅ Builds backend Docker image
✅ Runs npm install & build checks
✅ Ensures reproducible deployment setup

👨‍💻 How Another Developer Can Run This Project

If anyone downloads this repo, they only need:

docker-compose up --build


Because:

All services are containerized

No manual dependency setup

Database included

Same environment everywhere

CI ensures build reproducibility

📌 DevOps Advantages Achieved
Feature	Benefit
Dockerized Services	Runs anywhere without conflicts
Docker Compose	One-command full setup
GitHub Actions CI	Automated builds + checks
MongoDB Container	No external DB needed
Reproducible Environment	Same setup for all users
🚀 Future Enhancements

Digital signature verification

Court order PDF uploads

Multi-station evidence tracking

Full audit trail dashboard

Multi-language support

👮 Author

Developed by: Adarsh Kumar
Registration No-2024UGCS034
Track: DevOps + Full Stack Prototype
Hackathon Project: Digital e-Malkhana Platform


