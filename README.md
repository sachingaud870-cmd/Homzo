# PropVerse

AI-powered real-estate CRM and lead-generation platform for Vasai-Virar.

## Local development

Start PostgreSQL, then create `backend/.env` from `backend/.env.example` and set its values. Apply migrations and run the backend:

```powershell
cd backend
.\venv\Scripts\python.exe manage.py migrate
.\venv\Scripts\python.exe manage.py runserver
```

Create `frontend/.env.local` from `frontend/.env.example`, then run the frontend:

```powershell
cd frontend
npm.cmd run dev
```

## Deployment

The repository includes `render.yaml` for the Django API and PostgreSQL database. Create a Render Blueprint from this repository, then set these API environment variables using the deployed Vercel URL:

```text
CORS_ALLOWED_ORIGINS=https://your-project.vercel.app
CSRF_TRUSTED_ORIGINS=https://your-project.vercel.app
```

Deploy `frontend` as a Vercel project and set this environment variable for Production, Preview, and Development as appropriate:

```text
NEXT_PUBLIC_API_URL=https://propverse-api.onrender.com
```

Use an object-storage provider for production property images. Render's local filesystem is ephemeral, so uploaded media will not persist across deployments without external storage.
