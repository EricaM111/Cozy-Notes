# Cozy Notes

Cozy Notes is a full-stack notes application with a soft, pastel-inspired interface.  
It allows users to create, manage, archive, and filter notes in a simple and intuitive way.

Developed with care as a full-stack practice project.

## Features

- Create notes with a title and content
- Delete notes
- Archive and unarchive notes
- Filter between active notes and archived notes
- Input validation:
  - Notes cannot be created without a title or content
  - Content is limited to 500 characters
- Clean and user-friendly pastel UI

## Tech Stack

### Backend
- Java 17
- Spring Boot 3.5.9
- Maven
- Spring Web
- Spring Data JPA
- H2 Database (in-memory)
- Lombok
- Packaging: JAR

### Frontend
- React
- Vite
- Node.js 24.13.0
- npm

### Version Control
- Git

---

## How to Run the Project

### Backend

1. Make sure you have **Java 17** and **Maven** installed.
2. Navigate to the backend project folder.
3. Run the application:

```bash```
mvn spring-boot:run

The backend will start at:

http://localhost:8080/api/notes


The frontend will start at:

http://localhost:5173


The H2 database runs in memory, so all data is reset when the application restarts.


### Frontend

Make sure you have Node.js 24.13.0 and npm installed.

Navigate to the frontend folder.

Install dependencies:

npm install


Start the development server:

npm run dev


Open your browser at:

http://localhost:5173

### Project Structure

backend/ → Spring Boot REST API

frontend/ → React + Vite application

### Notes

The project uses an in-memory H2 database for simplicity.

No authentication is required.

The application is intended as a demo / technical challenge project.
