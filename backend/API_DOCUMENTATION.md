# Tetrahedron Backend API Documentation

## Overview

This API provides endpoints for managing authentication, blogs, and case studies. The API uses JWT tokens for authentication on protected routes.

**Base URL:** `http://localhost:5000/api`

---

## Authentication

### JWT Token
Protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

Tokens are provided after successful login/registration and expire in 30 days.

---

## Endpoints

### 1. Authentication Routes (`/api/auth`)

#### Register User
- **Endpoint:** `POST /api/auth/register`
- **Access:** Public
- **Description:** Register a new user account
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Success Response (201):**
  ```json
  {
    "_id": "user_id",
    "email": "user@example.com",
    "token": "jwt_token"
  }
  ```
- **Error Responses:**
  - `400`: User already exists
  - `400`: Invalid user data
  - `500`: Server error

---

#### Login User
- **Endpoint:** `POST /api/auth/login`
- **Access:** Public
- **Description:** Authenticate user and receive JWT token
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Success Response (200):**
  ```json
  {
    "_id": "user_id",
    "email": "user@example.com",
    "token": "jwt_token"
  }
  ```
- **Error Responses:**
  - `401`: Invalid email or password
  - `500`: Server error

---

### 2. Blog Routes (`/api/blogs`)

#### Get All Blogs
- **Endpoint:** `GET /api/blogs`
- **Access:** Public
- **Description:** Retrieve all blogs
- **Success Response (200):**
  ```json
  [
    {
      "_id": "blog_id",
      "title": "Blog Title",
      "description": "Blog description",
      "image": "image_url",
      "date": "2026-01-15T00:00:00Z",
      "createdBy": "user_id"
    }
  ]
  ```
- **Error Response:**
  - `500`: Server error

---

#### Create Blog
- **Endpoint:** `POST /api/blogs`
- **Access:** Private (requires authentication)
- **Description:** Create a new blog post with optional image
- **Headers:**
  ```
  Authorization: Bearer <token>
  Content-Type: multipart/form-data
  ```
- **Request Body:**
  ```
  Form Data:
  - title (string, required)
  - description (string, required)
  - date (string, optional) - ISO date format
  - image (file, optional) - Image file
  ```
- **Success Response (201):**
  ```json
  {
    "_id": "blog_id",
    "title": "Blog Title",
    "description": "Blog description",
    "image": "image_url",
    "date": "2026-01-15T00:00:00Z",
    "createdBy": "user_id"
  }
  ```
- **Error Responses:**
  - `401`: Unauthorized (invalid/missing token)
  - `500`: Server error

---

#### Get Blog by ID
- **Endpoint:** `GET /api/blogs/:id`
- **Access:** Public
- **Description:** Retrieve a specific blog by ID
- **URL Parameters:**
  - `id` (string, required) - Blog ID
- **Success Response (200):**
  ```json
  {
    "_id": "blog_id",
    "title": "Blog Title",
    "description": "Blog description",
    "image": "image_url",
    "date": "2026-01-15T00:00:00Z",
    "createdBy": "user_id"
  }
  ```
- **Error Responses:**
  - `404`: Blog not found
  - `500`: Server error

---

#### Update Blog
- **Endpoint:** `PUT /api/blogs/:id`
- **Access:** Private (requires authentication)
- **Description:** Update an existing blog post
- **Headers:**
  ```
  Authorization: Bearer <token>
  Content-Type: multipart/form-data
  ```
- **URL Parameters:**
  - `id` (string, required) - Blog ID
- **Request Body:**
  ```
  Form Data:
  - title (string, optional)
  - description (string, optional)
  - author (string, optional)
  - date (string, optional) - ISO date format
  - image (file, optional) - Image file
  ```
- **Success Response (200):**
  ```json
  {
    "_id": "blog_id",
    "title": "Updated Title",
    "description": "Updated description",
    "image": "image_url",
    "date": "2026-01-15T00:00:00Z",
    "createdBy": "user_id"
  }
  ```
- **Error Responses:**
  - `401`: Unauthorized (invalid/missing token)
  - `404`: Blog not found
  - `500`: Server error

---

#### Delete Blog
- **Endpoint:** `DELETE /api/blogs/:id`
- **Access:** Private (requires authentication)
- **Description:** Delete a blog post
- **Headers:**
  ```
  Authorization: Bearer <token>
  ```
- **URL Parameters:**
  - `id` (string, required) - Blog ID
- **Success Response (200):**
  ```json
  {
    "message": "Blog removed"
  }
  ```
- **Error Responses:**
  - `401`: Unauthorized (invalid/missing token)
  - `404`: Blog not found
  - `500`: Server error

---

### 3. Case Routes (`/api/cases`)

#### Get All Cases
- **Endpoint:** `GET /api/cases`
- **Access:** Public
- **Description:** Retrieve all case studies
- **Success Response (200):**
  ```json
  [
    {
      "_id": "case_id",
      "title": "Case Title",
      "description": "Case description",
      "image": "image_url",
      "createdBy": "user_id"
    }
  ]
  ```
- **Error Response:**
  - `500`: Server error

---

#### Create Case
- **Endpoint:** `POST /api/cases`
- **Access:** Private (requires authentication)
- **Description:** Create a new case study with optional image
- **Headers:**
  ```
  Authorization: Bearer <token>
  Content-Type: multipart/form-data
  ```
- **Request Body:**
  ```
  Form Data:
  - title (string, required)
  - description (string, required)
  - image (file, optional) - Image file
  ```
- **Success Response (201):**
  ```json
  {
    "_id": "case_id",
    "title": "Case Title",
    "description": "Case description",
    "image": "image_url",
    "createdBy": "user_id"
  }
  ```
- **Error Responses:**
  - `401`: Unauthorized (invalid/missing token)
  - `500`: Server error

---

#### Get Case by ID
- **Endpoint:** `GET /api/cases/:id`
- **Access:** Public
- **Description:** Retrieve a specific case study by ID
- **URL Parameters:**
  - `id` (string, required) - Case ID
- **Success Response (200):**
  ```json
  {
    "_id": "case_id",
    "title": "Case Title",
    "description": "Case description",
    "image": "image_url",
    "createdBy": "user_id"
  }
  ```
- **Error Responses:**
  - `404`: Case not found
  - `500`: Server error

---

#### Update Case
- **Endpoint:** `PUT /api/cases/:id`
- **Access:** Private (requires authentication)
- **Description:** Update an existing case study
- **Headers:**
  ```
  Authorization: Bearer <token>
  Content-Type: multipart/form-data
  ```
- **URL Parameters:**
  - `id` (string, required) - Case ID
- **Request Body:**
  ```
  Form Data:
  - title (string, optional)
  - description (string, optional)
  - image (file, optional) - Image file
  ```
- **Success Response (200):**
  ```json
  {
    "_id": "case_id",
    "title": "Updated Title",
    "description": "Updated description",
    "image": "image_url",
    "createdBy": "user_id"
  }
  ```
- **Error Responses:**
  - `401`: Unauthorized (invalid/missing token)
  - `404`: Case not found
  - `500`: Server error

---

#### Delete Case
- **Endpoint:** `DELETE /api/cases/:id`
- **Access:** Private (requires authentication)
- **Description:** Delete a case study
- **Headers:**
  ```
  Authorization: Bearer <token>
  ```
- **URL Parameters:**
  - `id` (string, required) - Case ID
- **Success Response (200):**
  ```json
  {
    "message": "Case removed"
  }
  ```
- **Error Responses:**
  - `401`: Unauthorized (invalid/missing token)
  - `404`: Case not found
  - `500`: Server error

---

## Error Handling

All error responses follow this format:
```json
{
  "message": "Error description"
}
```

### Common HTTP Status Codes
- `200` OK - Request successful
- `201` Created - Resource created successfully
- `400` Bad Request - Invalid request data
- `401` Unauthorized - Missing or invalid authentication token
- `404` Not Found - Resource not found
- `500` Internal Server Error - Server-side error

---

## Example Usage

### Register a User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Create a Blog Post
```bash
curl -X POST http://localhost:5000/api/blogs \
  -H "Authorization: Bearer <token>" \
  -F "title=My Blog" \
  -F "description=Blog content" \
  -F "image=@/path/to/image.jpg"
```

### Get All Blogs
```bash
curl http://localhost:5000/api/blogs
```

### Update a Blog Post
```bash
curl -X PUT http://localhost:5000/api/blogs/<blog_id> \
  -H "Authorization: Bearer <token>" \
  -F "title=Updated Title" \
  -F "description=Updated content"
```

### Delete a Blog Post
```bash
curl -X DELETE http://localhost:5000/api/blogs/<blog_id> \
  -H "Authorization: Bearer <token>"
```

---

## Notes

- All dates are returned in ISO 8601 format
- Image uploads use multipart/form-data
- JWT tokens are included in responses for register and login endpoints
- Protected endpoints require valid Bearer token in Authorization header
- Case studies and blog posts track creator via `createdBy` field
