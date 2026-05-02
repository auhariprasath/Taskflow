# TaskFlow - Production-Grade Task Manager

A modern, full-stack task management application built with React and Spring Boot.

![TaskFlow](https://via.placeholder.com/800x400?text=TaskFlow)

## Features

- **JWT Authentication** - Secure login and registration with JSON Web Tokens
- **Kanban Board** - Drag-and-drop task management across columns
- **Dashboard Analytics** - Visual charts showing task statistics
- **Dark/Light Mode** - Theme toggle with system preference detection
- **Responsive Design** - Works on mobile, tablet, and desktop
- **Modern UI** - Clean, professional design with smooth animations

## Tech Stack

### Backend
- Spring Boot 3.x
- PostgreSQL (Supabase)
- JWT Authentication
- BCrypt Password Hashing
- Maven

### Frontend
- React 18
- Tailwind CSS
- Framer Motion
- Recharts
- @hello-pangea/dnd
- React Router v6
- Axios

## Project Structure

```
taskManager/
├── backend/
│   ├── src/main/java/com/taskflow/backend/
│   │   ├── config/          # Security configuration
│   │   ├── controller/     # REST controllers
│   │   ├── dto/            # Data transfer objects
│   │   ├── entity/         # JPA entities
│   │   ├── exception/      # Global exception handling
│   │   ├── repository/     # JPA repositories
│   │   ├── security/       # JWT utilities
│   │   └── service/        # Business logic
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── context/        # React context providers
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── App.jsx         # Main application
│   ├── package.json
│   └── vite.config.js
│
└── SPEC.md                 # Detailed specifications
```

## Prerequisites

- Node.js 18+
- Java 17+
- PostgreSQL (Supabase or local)
- Maven

## Setup Instructions

### 1. Supabase Setup

**Option A: Supabase Cloud (Recommended)**
1. Create a free account at https://supabase.com
2. Create a new project
3. Go to Settings > Database to find your connection string
4. The format will be: `postgres://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres`

**Option B: Local PostgreSQL**
```bash
# Install PostgreSQL (Windows)
# Download from https://www.postgresql.org/download/windows/

# Create database
createdb taskflow
```

### 2. Backend Setup

Update `application.properties` with your Supabase credentials:

```properties
# Using environment variables (recommended)
spring.datasource.url=jdbc:postgresql://${DB_HOST:db.xxxxxx.supabase.co}:${DB_PORT:5432}/${DB_NAME:postgres}
spring.datasource.username=${DB_USER:postgres}
spring.datasource.password=${DB_PASSWORD:your-password}
```

Or directly:
```properties
spring.datasource.url=jdbc:postgresql://db.xxxxxx.supabase.co:5432/postgres
spring.datasource.username=postgres
spring.datasource.password=your-password
```

Then run:
```bash
cd backend

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

The backend will start at `http://localhost:8080`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

The frontend will start at `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Tasks
- `GET /api/tasks` - Get all tasks (paginated)
- `GET /api/tasks/all` - Get all tasks
- `POST /api/tasks` - Create task
- `GET /api/tasks/{id}` - Get single task
- `PUT /api/tasks/{id}` - Update task
- `PUT /api/tasks/{id}/status` - Update task status (for drag-drop)
- `DELETE /api/tasks/{id}` - Delete task
- `GET /api/tasks/stats` - Get task statistics

## Sample Data

After running the application, create tasks through the UI:

### Task Fields
- **Title** (required): Task name
- **Description**: Task details
- **Priority**: LOW, MEDIUM, HIGH
- **Status**: TODO, IN_PROGRESS, DONE
- **Due Date**: Optional deadline

## Environment Variables

### Backend (application.properties)
```properties
# Supabase Connection
spring.datasource.url=jdbc:postgresql://db.xxxxxx.supabase.co:5432/postgres
spring.datasource.username=postgres
spring.datasource.password=your-password

# JWT Configuration
jwt.secret=YourSecretKey
jwt.expiration=86400000

# JPA (auto-create tables)
spring.jpa.hibernate.ddl-auto=update
```

### Frontend
The frontend uses Vite's proxy to connect to the backend at `http://localhost:8080`

## Build for Production

### Backend
```bash
cd backend
mvn clean package
java -jar target/taskflow-backend-1.0.0.jar
```

### Frontend
```bash
cd frontend
npm run build
```

The build output will be in `frontend/dist/`

## Screenshots

### Login Page
Modern glassmorphism design with smooth animations

### Dashboard
- Task statistics cards with trends
- Pie chart for task distribution
- Bar chart for completion progress
- Recent tasks list

### Kanban Board
- Drag-and-drop functionality
- Three columns: To Do, In Progress, Done
- Task cards with priority badges
- Edit and delete actions

### Tasks Page
- Grid and list view options
- Search and filter functionality
- Pagination support
- Create/edit modal

## License

MIT License - Feel free to use this project for learning or commercial purposes.

## Author

Built with ❤️ using React and Spring Boot