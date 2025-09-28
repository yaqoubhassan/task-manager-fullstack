# Task Manager Setup Guide

This guide provides step-by-step instructions to set up and run the Task Manager application.

## System Requirements

### Software Prerequisites
- **Java**: Version 17 or higher
- **Node.js**: Version 18 or higher
- **Maven**: Version 3.6 or higher
- **Angular CLI**: Latest version (`npm install -g @angular/cli`)

### Hardware Requirements
- **RAM**: Minimum 4GB (8GB recommended)
- **Storage**: At least 2GB free space
- **CPU**: Any modern processor

## Installation Steps

### Step 1: Verify Prerequisites

Check if you have the required software installed:

```bash
# Check Java version
java -version

# Check Node.js version
node --version

# Check Maven version
mvn --version

# Check Angular CLI
ng version
```

### Step 2: Project Setup

1. **Extract/Clone the project** to your desired directory
2. **Navigate to the project root**:
   ```bash
   cd task-manager
   ```

### Step 3: Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install Maven dependencies**:
   ```bash
   mvn clean install
   ```

3. **Start the Spring Boot application**:
   ```bash
   mvn spring-boot:run
   ```

4. **Verify backend is running**:
   - Open browser and go to `http://localhost:8080`
   - You should see a 403 Forbidden page (this is expected as endpoints are protected)
   - Check logs for "Started TaskManagerBackendApplication" message

### Step 4: Frontend Setup

1. **Open a new terminal** and navigate to frontend directory:
   ```bash
   cd task-manager/frontend
   ```

2. **Install npm dependencies**:
   ```bash
   npm install
   ```

3. **Start the Angular development server**:
   ```bash
   ng serve --host=0.0.0.0 --port=4200
   ```

4. **Verify frontend is running**:
   - Open browser and go to `http://localhost:4200`
   - You should see the login page

## Application Access

### URLs
- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:8080
- **H2 Database Console**: http://localhost:8080/h2-console

### Default Database Configuration
- **JDBC URL**: `jdbc:h2:mem:testdb`
- **Username**: `sa`
- **Password**: (leave empty)

## First Time Usage

### Creating Your First Account

1. **Access the application**: Go to http://localhost:4200
2. **Register**: Click "Register here" link
3. **Fill the form**:
   - Username: Choose any username (minimum 3 characters)
   - Password: Choose a password (minimum 6 characters)
   - Confirm Password: Re-enter the same password
4. **Submit**: Click "Register" button
5. **Automatic Login**: You'll be automatically logged in and redirected to the dashboard

### Creating Your First Task

1. **Add Task**: Click the "+ Add New Task" button
2. **Fill Details**:
   - Title: Enter a descriptive task title
   - Description: (Optional) Add more details about the task
3. **Create**: Click "Create Task" button
4. **View Task**: Your task will appear in the "Pending Tasks" section

## Troubleshooting

### Common Issues

#### Backend Won't Start
**Problem**: Port 8080 already in use
**Solution**: 
```bash
# Kill process using port 8080
sudo lsof -ti:8080 | xargs kill -9
# Or change port in application.properties
server.port=8081
```

#### Frontend Won't Start
**Problem**: Port 4200 already in use
**Solution**:
```bash
# Use a different port
ng serve --port=4201
```

#### Build Errors
**Problem**: Maven/npm build failures
**Solution**:
```bash
# Clear Maven cache
mvn clean

# Clear npm cache
npm cache clean --force
rm -rf node_modules
npm install
```

#### Database Issues
**Problem**: Cannot access H2 console
**Solution**:
- Ensure backend is running
- Check URL: http://localhost:8080/h2-console
- Use correct JDBC URL: `jdbc:h2:mem:testdb`

#### CORS Errors
**Problem**: Frontend cannot connect to backend
**Solution**:
- Ensure both servers are running
- Check backend logs for CORS configuration
- Verify frontend is accessing http://localhost:8080

### Logs and Debugging

#### Backend Logs
- Check console output where you ran `mvn spring-boot:run`
- Look for error messages or stack traces
- Successful startup shows: "Started TaskManagerBackendApplication"

#### Frontend Logs
- Check console output where you ran `ng serve`
- Open browser developer tools (F12) for client-side errors
- Look for network errors in the Network tab

## Development Mode

### Hot Reload
Both frontend and backend support hot reload:
- **Frontend**: Changes to TypeScript/HTML/CSS files automatically refresh
- **Backend**: Use Spring Boot DevTools for automatic restart on Java file changes

### Database Persistence
- **Development**: Uses H2 in-memory database (data lost on restart)
- **Production**: Configure persistent database in `application.properties`

## Production Deployment

### Building for Production

#### Backend
```bash
cd backend
mvn clean package
java -jar target/task-manager-backend-0.0.1-SNAPSHOT.jar
```

#### Frontend
```bash
cd frontend
ng build --configuration production
# Serve the dist/frontend folder with a web server
```

### Environment Configuration
- Update `application.properties` for production database
- Configure proper CORS origins
- Set secure JWT secret key
- Enable HTTPS

## Support

### Getting Help
- Check the README.md for detailed documentation
- Review error messages in console logs
- Ensure all prerequisites are properly installed
- Verify port availability (8080 for backend, 4200 for frontend)

### Common Commands Reference
```bash
# Backend
mvn clean install          # Install dependencies
mvn spring-boot:run       # Start backend server
mvn clean package         # Build for production

# Frontend  
npm install               # Install dependencies
ng serve                  # Start development server
ng build                  # Build for production
ng test                   # Run tests

# System
lsof -ti:8080            # Check what's using port 8080
ps aux | grep java       # Check running Java processes
ps aux | grep node       # Check running Node processes
```

This setup guide should help you get the Task Manager application running smoothly. If you encounter any issues not covered here, please check the application logs for more specific error messages.
