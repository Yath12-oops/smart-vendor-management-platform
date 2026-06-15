# Smart Vendor Management Platform

## Overview

The Smart Vendor Management Platform is a full-stack web application developed to streamline vendor registration, verification, and management processes within an organization.

The platform enables administrators to manage vendor information efficiently, approve or reject vendor applications, monitor vendor status through a dashboard, and maintain a centralized vendor database.

This project was built as a practical implementation of modern full-stack development using Spring Boot, React, JWT Authentication, MySQL, and REST APIs.

---

## Features

### Authentication & Security

* JWT-based Authentication
* Secure Login System
* Protected Admin Routes
* Session Management using Local Storage

### Vendor Management

* Add New Vendors
* View All Vendors
* Search Vendors by Company Name
* Update Vendor Details
* Delete Vendors
* Vendor Status Tracking

### Admin Dashboard

* Total Vendors Count
* Approved Vendors Count
* Pending Vendors Count
* Rejected Vendors Count
* Real-Time Statistics Display

### Approval Workflow

* Approve Vendors
* Reject Vendors
* Dynamic Status Updates
* Immediate UI Refresh after Actions

### User Interface

* Responsive Design
* Professional Dashboard Cards
* Styled Login Page
* Vendor Management Table
* Search Functionality
* Status Badges

---

## Technology Stack

### Frontend

* React.js
* Vite
* Axios
* React Router DOM
* JavaScript
* HTML5
* CSS3

### Backend

* Spring Boot
* Spring Security
* JWT Authentication
* Spring Data JPA
* REST APIs

### Database

* MySQL

### Version Control

* Git
* GitHub

---

## Project Structure

```text
smart-vendor-management-platform

├── vendor-management-platform
│   ├── src
│   ├── pom.xml
│   └── backend code
│
└── frontend
    ├── src
    ├── public
    ├── package.json
    └── React code
```

---

## Installation & Setup

### Backend Setup

1. Clone the repository

```bash
git clone https://github.com/Yath12-oops/smart-vendor-management-platform.git
```

2. Open backend project

```bash
cd vendor-management-platform
```

3. Configure MySQL database in:

```properties
application.properties
```

4. Run the Spring Boot application

```bash
mvn spring-boot:run
```

Backend runs on:

```text
http://localhost:8080
```

---

### Frontend Setup

1. Navigate to frontend folder

```bash
cd frontend
```

2. Install dependencies

```bash
npm install
```

3. Start React application

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## API Endpoints

### Authentication

| Method | Endpoint    |
| ------ | ----------- |
| POST   | /auth/login |

### Vendor Management

| Method | Endpoint      |
| ------ | ------------- |
| POST   | /vendors      |
| GET    | /vendors      |
| GET    | /vendors/{id} |
| PUT    | /vendors/{id} |
| DELETE | /vendors/{id} |

### Admin Operations

| Method | Endpoint                    |
| ------ | --------------------------- |
| GET    | /admin/dashboard            |
| PUT    | /admin/vendors/{id}/approve |
| PUT    | /admin/vendors/{id}/reject  |

---

## Future Enhancements

* Document Upload Module
* Document Verification Workflow
* Email Notifications
* Vendor Profile Page
* Analytics Dashboard
* File Storage Integration
* Role-Based Access Control
* Export Reports to PDF/Excel

---

## Learning Outcomes

Through this project, the following concepts were implemented and practiced:

* Full Stack Development
* REST API Development
* Authentication & Authorization
* React Component Architecture
* State Management
* CRUD Operations
* Database Design
* Git & GitHub Workflow
* Software Development Lifecycle

---

## Author

**Yatharth Sachdeva**

B.Tech Information Technology Student

Passionate about Full Stack Development, Data Structures & Algorithms, and Software Engineering.
