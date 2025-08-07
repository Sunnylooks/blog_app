# Blog Web API

A RESTful API for blog management using Django and Django REST Framework.

## Features

- ✅ Create articles
- ✅ View list of articles  
- ✅ View article details
- ✅ Edit articles
- ✅ Delete articles
- ✅ Article validation
- ✅ Pagination support
- ✅ CORS enabled for frontend integration

## Database Configuration

### SQLite (Default - Development)
The project uses SQLite by default for easy development setup.

### PostgreSQL (Production Ready)

#### Using Laragon (Recommended for Windows)
1. **Install Laragon** if not already installed
2. **Enable PostgreSQL** in Laragon  
3. **Set environment variables** in PowerShell:
   ```powershell
   $env:USE_POSTGRES="True"
   $env:DB_NAME="blog_db"
   $env:DB_USER="pongo" 
   $env:DB_PASSWORD="pongo"
   $env:DB_HOST="localhost"
   $env:DB_PORT="5432"
   ```
4. **Run migrations:**
   ```powershell
   python manage.py migrate
   ```

#### Connect with DBeaver
1. **Download DBeaver** from https://dbeaver.io/download/
2. **Create PostgreSQL connection**:
   - **Host**: `localhost`
   - **Port**: `5432`
   - **Database**: `blog_db`
   - **Username**: `pongo`
   - **Password**: `pongo`
3. **View your data** in the `blog_article` table

1. **Activate the virtual environment:**
   ```powershell
   .\.venv\Scripts\Activate.ps1
   ```

2. **Start the development server:**
   ```powershell
   python manage.py runserver
   ```

3. **Access the API:**
   - Main API: http://127.0.0.1:8000/api/articles/
   - Admin panel: http://127.0.0.1:8000/admin/

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/articles/` | List all articles with pagination |
| `POST` | `/api/articles/` | Create a new article |
| `GET` | `/api/articles/{id}/` | Get specific article details |
| `PUT` | `/api/articles/{id}/` | Update an article |
| `DELETE` | `/api/articles/{id}/` | Delete an article |
| `GET` | `/api/articles/stats/` | Get article statistics |

## API Usage Examples

### Create Article
```bash
curl -X POST http://127.0.0.1:8000/api/articles/ \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Blog Post",
    "content": "This is the content of my blog post...",
    "author": "John Doe"
  }'
```

### Get All Articles
```bash
curl http://127.0.0.1:8000/api/articles/
```

### Get Article by ID
```bash
curl http://127.0.0.1:8000/api/articles/1/
```

### Update Article
```bash
curl -X PUT http://127.0.0.1:8000/api/articles/1/ \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "content": "Updated content...",
    "author": "John Doe"
  }'
```

### Delete Article
```bash
curl -X DELETE http://127.0.0.1:8000/api/articles/1/
```

## Project Structure

```
blog_project/
├── .github/
│   └── copilot-instructions.md  # Copilot coding guidelines
├── .venv/                       # Virtual environment
├── .vscode/
│   └── tasks.json              # VS Code tasks
├── blog_project/               # Main project directory
│   ├── __init__.py
│   ├── settings.py             # Django settings
│   ├── urls.py                # Main URL configuration
│   └── wsgi.py
├── blog/                       # Blog app
│   ├── __init__.py
│   ├── admin.py               # Admin interface config
│   ├── apps.py
│   ├── models.py              # Article model
│   ├── serializers.py         # API serializers
│   ├── views.py               # API views
│   ├── urls.py                # App URL configuration
│   └── migrations/
├── api_test.http              # REST Client test requests
├── db.sqlite3                 # SQLite database (development)
├── inspect_db.py              # Database inspection script
├── manage.py                  # Django management script
├── setup_data.py             # Sample data creation script
├── test_api.py               # API testing script
├── requirements.txt          # Python dependencies
└── README.md
```

## Available VS Code Tasks

The project includes several VS Code tasks (Ctrl+Shift+P → "Run Task"):

- **Django: Run Server** - Start the development server
- **Django: Make Migrations** - Create new database migrations
- **Django: Migrate** - Apply database migrations  
- **Django: Create Superuser** - Create admin user

## Development Notes

- **SQLite** for development, **PostgreSQL** for production
- Sample articles are automatically created when running `setup_data.py`
- CORS is configured to allow requests from localhost:3000 (for frontend development)
- Django REST Framework provides browsable API interface
- Admin interface is available at `/admin/` for easy content management

## Database Management

### View Database Data:
- **DBeaver**: Connect to PostgreSQL to view/edit data visually
- **Django Admin**: http://127.0.0.1:8000/admin/ (create superuser first)
- **API Browser**: http://127.0.0.1:8000/api/articles/ (DRF interface)
- **Python Script**: Run `python inspect_db.py` for database overview

### Testing:
- **REST Client**: Use `api_test.http` file in VS Code
- **Python Script**: Run `python test_api.py` for comprehensive testing
- **PowerShell**: Use `Invoke-RestMethod` commands

## Next Steps

1. Create a superuser: `python manage.py createsuperuser`
2. Add authentication/authorization
3. Implement user-specific articles
4. Add search and filtering capabilities
5. Deploy to production
