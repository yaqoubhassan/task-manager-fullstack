# Simple Task Manager Application

A full-stack task management application built with Spring Boot backend and Angular frontend, featuring user authentication and complete task CRUD operations.

## Architecture Overview

### Backend (Spring Boot)
- **Framework**: Spring Boot 3.x with Java 17
- **Database**: H2 in-memory database
- **Security**: JWT-based authentication
- **API**: RESTful endpoints with CORS support
- **Port**: 8080

### Frontend (Angular)
- **Framework**: Angular 18 with standalone components
- **Styling**: Custom CSS with responsive design
- **Authentication**: JWT token management with HTTP interceptors
- **Routing**: Protected routes with authentication guards
- **Port**: 4200

## Features

### Authentication
- User registration with validation
- Secure login with JWT tokens
- Protected routes and API endpoints
- Automatic token refresh and logout

### Task Management
- Create new tasks with title and description
- View tasks in organized pending/completed sections
- Update task status (pending ↔ completed)
- Edit task details inline
- Delete tasks with confirmation
- Real-time task counters

### User Interface
- Clean, professional design
- Responsive layout for desktop and mobile
- Form validation with error messages
- Loading states and user feedback
- Intuitive navigation

## Project Structure

```
task-manager/
├── backend/                 # Spring Boot application
│   ├── src/main/java/com/taskmanager/backend/
│   │   ├── entity/         # JPA entities (User, Task)
│   │   ├── dto/            # Data Transfer Objects
│   │   ├── repository/     # JPA repositories
│   │   ├── service/        # Business logic services
│   │   ├── controller/     # REST controllers
│   │   ├── security/       # JWT utilities and filters
│   │   └── config/         # Security configuration
│   └── src/main/resources/
│       └── application.properties
├── frontend/               # Angular application
│   ├── src/app/
│   │   ├── components/     # Angular components
│   │   ├── services/       # HTTP services
│   │   ├── models/         # TypeScript interfaces
│   │   ├── guards/         # Route guards
│   │   └── interceptors/   # HTTP interceptors
│   └── src/assets/
└── README.md
```

## API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login

### Tasks (Protected)
- `GET /api/tasks` - Get all user tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/{id}` - Update task
- `DELETE /api/tasks/{id}` - Delete task

## Getting Started

### Prerequisites
- Java 17 or higher
- Node.js 18 or higher
- Maven 3.6 or higher
- Angular CLI

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd task-manager/backend
   ```

2. Install dependencies and run:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

3. Backend will be available at `http://localhost:8080`

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd task-manager/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   ng serve --host=0.0.0.0 --port=4200
   ```

4. Frontend will be available at `http://localhost:4200`

### Database Access
The H2 database console is available at `http://localhost:8080/h2-console` with:
- JDBC URL: `jdbc:h2:mem:testdb`
- Username: `sa`
- Password: (empty)

## Usage

1. **Register**: Create a new account with username and password
2. **Login**: Access your personal task dashboard
3. **Create Tasks**: Add new tasks with titles and descriptions
4. **Manage Tasks**: Mark tasks as complete, edit details, or delete
5. **Logout**: Securely end your session

## Security Features

- JWT token-based authentication
- Password encryption with BCrypt
- Protected API endpoints
- CORS configuration for cross-origin requests
- HTTP-only token storage recommendations
- Route guards for frontend protection

## Technology Stack

### Backend
- Spring Boot 3.x
- Spring Security 6.x
- Spring Data JPA
- H2 Database
- JWT (JSON Web Tokens)
- Maven
- Java 17

### Frontend
- Angular 18
- TypeScript
- RxJS
- Angular Router
- HTTP Client
- Custom CSS

## Development Notes

- The application uses an in-memory H2 database that resets on restart
- JWT tokens are stored in localStorage (consider httpOnly cookies for production)
- CORS is configured to allow requests from the Angular development server
- All API endpoints require authentication except registration and login
- The frontend includes comprehensive error handling and user feedback

## Testing

The application has been thoroughly tested including:
- User registration and login flows
- Task CRUD operations
- Authentication and authorization
- Frontend-backend integration
- Responsive design verification
- Error handling scenarios

## Future Enhancements

Potential improvements for production deployment:
- Persistent database (PostgreSQL, MySQL)
- Email verification for registration
- Password reset functionality
- Task categories and tags
- Due dates and reminders
- User profile management
- Task sharing and collaboration
- Mobile application
- Docker containerization
- CI/CD pipeline setup