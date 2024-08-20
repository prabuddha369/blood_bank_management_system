```markdown
# Blood Bank Management System

A full-stack application for connecting hospitals and individual blood donors. This project consists of a frontend built with Next.js and a backend built with Django.

## Project Structure

```
blood_bank_management_system/
│
├── backend/bloodbank_backend/    # Django backend
│   ├── bloodbank_backend/        # Django app for blood bank management
│   ├── manage.py          # Django management script
│   └── ...                # Other Django project files and apps
│
└── frontend/              # Next.js frontend
    ├── app/               # Next.js app router pages
    ├── public/            # Public assets
    ├── components/        # React components
    ├── next.config.js     # Next.js configuration
    ├── package.json       # Node.js dependencies
    └── ...                # Other Next.js project files
```

## Getting Started

### Prerequisites

- Node.js and npm (for the frontend)
- Python and pip (for the backend)
- Django and Django REST framework (for the backend)

### Setup

#### Backend

1. Navigate to the `backend` directory:

   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:

   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows use: ./.venv/Scripts/activate
   ```

3. Install the required Python packages:

   ```bash
   pip install -r requirements.txt
   ```

4. Apply the database migrations:

   ```bash
   python manage.py migrate
   ```

5. Create a superuser (admin):

   ```bash
   python manage.py createsuperuser
   ```

6. Run the Django development server:

   ```bash
   python manage.py runserver
   ```

   The backend will be available at `http://localhost:8000/`.

#### Frontend

1. Navigate to the `frontend` directory:

   ```bash
   cd ../frontend
   ```

2. Install the required Node.js packages:

   ```bash
   npm install
   ```

3. Run the Next.js development server:

   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:3000/`.

### Configuration

- **Backend**: Update the `backend/settings.py` file with your desired configuration for database, CORS, etc.
- **Frontend**: Update `frontend/next.config.js` and other environment variables as needed.

### API Endpoints

- **User Registration**: `POST /api/register/hospital/` - Register a new hospital
- - **User Registration**: `POST /api/register/donor/` - Register a new donor
- **User Login**: `POST /api/login/` - Authenticate users
- **User Logout**: `POST /api/logout/` - Session management for users
- **Get Donors**: `GET /api/donor_data/` - Retrieve a list of donors

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Acknowledgements

- Django - A high-level Python web framework.
- Next.js - A React framework for server-rendered applications.
- Tailwind CSS - A utility-first CSS framework.
```
