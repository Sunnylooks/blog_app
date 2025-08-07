# Blog Application
## Django + Next.js Full-Stack Blog

A modern blog application built with Django REST Framework backend and Next.js frontend.

### 🚀 Features

- ✅ **CRUD Operations** - Create, Read, Update, Delete articles
- ✅ **Image Upload** - Upload and display images for articles
- ✅ **Admin Panel** - Manage articles with user-friendly interface
- ✅ **Public Blog** - View published articles
- ✅ **Article Detail** - Read full articles with "Read More" functionality
- ✅ **Statistics Dashboard** - View article statistics
- ✅ **Responsive Design** - Mobile-friendly interface
- ✅ **TypeScript** - Type-safe development

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
- React Hooks

### 📁 Project Structure

```
├── backend/                 # Django REST API
│   ├── blog_project/       # Django project settings
│   ├── blog/               # Blog app
│   │   ├── models.py       # Article model
│   │   ├── views.py        # API views
│   │   ├── serializers.py  # DRF serializers
│   │   └── urls.py         # API routes
│   ├── media/              # Uploaded images
│   └── requirements.txt    # Python dependencies
├── frontend/               # Next.js application
│   ├── src/
│   │   ├── app/           # App router pages
│   │   │   ├── admin/     # Admin panel
│   │   │   └── home/      # Public blog
│   │   ├── components/    # React components
│   │   ├── services/      # API services
│   │   └── types/         # TypeScript interfaces
│   └── package.json       # Node dependencies
├── GUIDE.txt              # Detailed development guide
└── .gitignore            # Git ignore file
```

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

### 🎨 Screenshots

The application features a modern, responsive design with:
- Clean admin interface for article management
- Beautiful public blog layout
- Image upload and display
- Statistics dashboard
- Mobile-responsive design

### 📖 Development Guide

See `GUIDE.txt` for detailed development instructions and architecture explanation.

### 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

### 📄 License

This project is open source and available under the MIT License.

### 👨‍💻 Author

Created with ❤️ using Django and Next.js
