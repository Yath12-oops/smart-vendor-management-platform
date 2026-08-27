# VendorHub - Smart Vendor Management Platform

A full-stack enterprise-grade vendor management platform built with Spring Boot and React.js, featuring JWT authentication, role-based access control, document management, and a modern responsive UI.

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  Frontend (React + Vite)                 │
│                     localhost:5173                       │
│                                                         │
│  ┌─────────┐  ┌──────────┐  ┌────────────┐            │
│  │  Auth    │  │  Admin   │  │   Vendor   │            │
│  │  Pages   │  │  Pages   │  │   Pages    │            │
│  └────┬────┘  └────┬─────┘  └─────┬──────┘            │
│       └─────────────┴──────────────┘                    │
│                    │                                    │
│            Axios Instance (JWT Interceptor)             │
└─────────────────────┬───────────────────────────────────┘
                      │ REST/JSON (HTTP)
┌─────────────────────┴───────────────────────────────────┐
│              Backend (Spring Boot 3.5)                  │
│                     localhost:8080                       │
│                                                         │
│  Controllers → Services → Repositories                  │
│                                                         │
│  ┌──────────────┐  ┌────────────────────┐              │
│  │ Spring       │  │ JWT Authentication │              │
│  │ Security     │  │ Filter             │              │
│  └──────────────┘  └────────────────────┘              │
└─────────────────────┬───────────────────────────────────┘
                      │ JDBC
┌─────────────────────┴───────────────────────────────────┐
│                  MySQL Database                         │
│         Tables: users, vendors, documents               │
└─────────────────────────────────────────────────────────┘
```

## Features

### Authentication & Security
- JWT-based authentication with 24-hour token expiry
- BCrypt password hashing
- Role-based access control (Admin / Vendor)
- CORS configuration for frontend-backend separation
- Protected routes on both frontend and backend

### Admin Dashboard
- Real-time vendor statistics (Total / Approved / Pending / Rejected)
- Interactive stat cards with visual indicators
- Quick action buttons for navigation

### Vendor Management
- View all vendors with company details
- Search vendors by company name, GST, or PAN number
- Approve / Reject vendor applications with real-time status updates
- Delete vendors from the system

### Document Management
- Vendor-side document upload (PAN Card, GST Certificate, Company Registration)
- UUID-based filename storage to prevent collisions
- Admin-side document verification workflow
- Secure document download with blob handling
- 10MB file upload limit with validation

### Vendor Portal
- Profile management (Company Name, GST Number, PAN Number)
- Document upload and status tracking
- Document download capability
- Welcome dashboard with quick navigation

### User Interface
- Modern dark-theme UI with gradient accents
- Responsive design for all screen sizes
- Role-aware navigation bar with active state indicators
- Status badges with color-coded indicators
- Empty states with helpful messages
- Loading states and error handling
- Form validation with user feedback

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend | React.js | 19.x |
| Build Tool | Vite | 8.x |
| HTTP Client | Axios | 1.17.x |
| Routing | React Router DOM | 7.x |
| Backend | Spring Boot | 3.5.x |
| Language | Java | 17 |
| Security | Spring Security + JWT | jjwt 0.12.x |
| ORM | Spring Data JPA / Hibernate | - |
| Database | MySQL | 8.x |
| API Docs | springdoc-openapi (Swagger) | 2.8.x |
| Build | Maven | 3.9.x |
| Boilerplate | Lombok | - |

## Database Schema

```
┌─────────────────┐       ┌──────────────────┐       ┌──────────────────┐
│     users       │       │     vendors      │       │    documents     │
├─────────────────┤       ├──────────────────┤       ├──────────────────┤
│ id       (PK)   │◄──1:1─│ id        (PK)   │◄──1:N─│ id        (PK)   │
│ name             │       │ company_name(UQ) │       │ document_type    │
│ email    (UQ)    │       │ gst_number (UQ)  │       │ file_name        │
│ password         │       │ pan_number (UQ)  │       │ file_path        │
│ role             │       │ status           │       │ status           │
└─────────────────┘       │ user_id   (FK)   │       │ vendor_id  (FK)  │
                          └──────────────────┘       └──────────────────┘
                          Status: PENDING/APPROVED/   Status: PENDING/VERIFIED/
                                  REJECTED                    REJECTED
```

## API Endpoints

### Authentication
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/register` | Public | Register new vendor |
| POST | `/auth/register-admin` | Public | Register admin user |
| POST | `/auth/login` | Public | Login and get JWT |

### Vendor Management
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/vendors` | Any | List all vendors |
| GET | `/vendors/{id}` | Any | Get vendor by ID |
| GET | `/vendors/user/{userId}` | Any | Get vendor by user ID |
| POST | `/vendors` | Any | Create vendor |
| PUT | `/vendors/{id}` | Any | Update vendor |
| DELETE | `/vendors/{id}` | Any | Delete vendor |

### Admin Operations
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/admin/dashboard` | Admin | Dashboard statistics |
| PUT | `/admin/vendors/{id}/approve` | Admin | Approve vendor |
| PUT | `/admin/vendors/{id}/reject` | Admin | Reject vendor |
| GET | `/admin/documents` | Admin | List all documents |
| PUT | `/admin/documents/{id}/verify` | Admin | Verify document |
| PUT | `/admin/documents/{id}/reject` | Admin | Reject document |

### Document Management
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/documents/upload` | Any | Upload document |
| GET | `/documents/vendor/{vendorId}` | Any | Get vendor documents |
| GET | `/documents/download/{id}` | Any | Download document |

## Project Structure

```
vendor-management-platform/
├── src/main/java/com/yatharth/vmp/
│   ├── config/           # Security, CORS, OpenAPI config
│   ├── controller/       # REST controllers
│   ├── dto/              # Data Transfer Objects
│   ├── entity/           # JPA entities + enums
│   ├── exception/        # Global exception handler
│   ├── repos/            # JPA repositories
│   ├── security/         # JWT service + filter
│   └── service/          # Business logic
├── frontend/
│   └── src/
│       ├── components/   # Navbar, ProtectedRoute
│       ├── pages/        # All page components
│       └── services/     # API service layer
├── pom.xml
└── application.properties
```

## Getting Started

### Prerequisites
- Java 17+
- Node.js 18+
- MySQL 8.x
- Maven 3.9+

### Backend Setup

```bash
# Clone repository
git clone https://github.com/Yath12-oops/smart-vendor-management-platform.git
cd vendor-management-platform

# Configure database (application.properties or environment variables)
export DB_USERNAME=root
export DB_PASSWORD=your_password
export JWT_SECRET=your-secret-key-min-32-chars

# Run backend
mvn spring-boot:run
```

Backend runs on `http://localhost:8080`

### Frontend Setup

```bash
cd frontend

# Configure API URL
echo "VITE_API_URL=http://localhost:8080" > .env

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs on `http://localhost:5173`

### Create Admin User

```bash
curl -X POST http://localhost:8080/auth/register-admin \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin","email":"admin@example.com","password":"admin123"}'
```

## Key Technical Decisions

1. **JWT Authentication**: Stateless auth with 24-hour expiry, role embedded in token claims
2. **Shared Axios Instance**: Centralized HTTP client with request/response interceptors for token injection and 401 handling
3. **UUID Filename Storage**: Prevents file collisions on upload while preserving original filenames
4. **Cascade Delete**: Deleting a vendor cascades to their documents
5. **Partial Updates**: Vendor profile updates only modify non-null fields
6. **Graceful Email Handling**: Welcome emails are optional and fail silently if mail isn't configured

## License

This project is for educational and portfolio purposes.
