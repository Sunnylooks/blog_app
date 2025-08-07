# Blog Application
## Django + Next.js Blog App

### 🛠️ Tech Stack

**Backend:**
- Django 4.2.7
- Django REST Framework
- SQLite (development) / PostgreSQL (production)
- Pillow (image processing)
- CORS headers

**Frontend:**
- Next.js 15.4.5
- TypeScript
- Tailwind CSS

### 🚀 Quick Start

#### Prerequisites
- Python 3.8+
- Node.js 18+
- Git

#### Backend Setup
```bash
cd backend
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 🌐 URLs

- **Frontend Blog**: http://localhost:3000/home
- **Frontend Admin**: http://localhost:3000/admin
- **Backend API**: http://localhost:8000/api/
- **Django Admin**: http://localhost:8000/admin/

### 📚 API Endpoints

- `GET/POST /api/articles/` - List and create articles
- `GET/PUT/DELETE /api/articles/{id}/` - Article detail operations
- `GET /api/articles/stats/` - Article statistics

