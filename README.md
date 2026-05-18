# 🔥 DevTinder API

> **Tinder for Developers** — Connect. Collaborate. Code Together.

DevTinder is a developer networking platform where engineers can discover, connect, and collaborate with like-minded developers. This document covers all available REST API endpoints.

---

## 📋 Table of Contents

- [Base URL](#base-url)
- [Authentication](#authentication)
- [Auth Routes](#-auth-routes)
- [Profile Routes](#-profile-routes)
- [Connection Request Routes](#-connection-request-routes)
- [User Routes](#-user-routes)
- [Status Reference](#-status-reference)
- [Pagination Guide](#-pagination-guide)

---

## Base URL

```

```

---

## Authentication

DevTinder uses **session-based authentication**. On successful login, a session cookie is set and must be included in all subsequent requests.

---

## 🔐 Auth Routes

### `POST /signup`

Register a new developer account.

**Request Body**

```json
{
  "firstName": "sriram",
  "lastName":"cherukuri,
  "email": "sriramcherukuri999@example.com",
  "password": "Sriram@1234"
}
```

**Response**

```json
{
  "message": "User registered successfully",
  "user": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "firstName": "sriram",
    "email": "sriramcherukuri999@example.com"
  }
}
```

| Status | Meaning |
|--------|---------|
| `201` | User created successfully |
| `400` | Validation error / Email already exists |

---

### `POST /login`

Authenticate and start a session.

**Request Body**

```json
{
    "firstName": "sriram",
    "email": "sriramcherukuri999@example.com"
}
```

**Response**

```json
{
  "message": "Login successful",
  "user": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "firstName": "sriram",
    "email": "sriramcherukuri999@example.com"
  }
}
```

| Status | Meaning |
|--------|---------|
| `200` | Login successful, session cookie set |
| `401` | Invalid credentials |

---

### `POST /logout`

End the current session.

**Response**

```json
{
  "message": "Logged out successfully"
}
```

| Status | Meaning |
|--------|---------|
| `200` | Session ended |
| `401` | Not authenticated |

---

## 👤 Profile Routes

### `GET /profile/view`

Retrieve the logged-in user's profile.

**Response**

```json
{
  "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
  "firstName":"sriram",
  "lastName": "cherukuri"
  "email": "sriramcherukuri999@example.com",
  "age": 26,
  "gender": "male",
  "skills": ["React", "Node.js", "MongoDB"],
  "about": "Full-stack developer passionate about open source.",
  "photoUrl": "https://cdn.devtinder.io/photos/jane.jpg"
}
```

| Status | Meaning |
|--------|---------|
| `200` | Profile fetched |
| `401` | Unauthorized |

---

### `PATCH /profile/edit`

Update profile information (excluding password).

**Request Body** *(all fields optional)*

```json
{
  "name": "Jane Doe",
  "age": 27,
  "gender": "Female",
  "skills": ["React", "TypeScript", "GraphQL"],
  "about": "Building cool things one commit at a time.",
  "photoUrl": "https://cdn.devtinder.io/photos/jane-updated.jpg"
}
```

**Response**

```json
{
  "message": "Profile updated successfully",
  "user": { ... }
}
```

| Status | Meaning |
|--------|---------|
| `200` | Profile updated |
| `400` | Validation error |
| `401` | Unauthorized |

---

### `PATCH /profile/password`

Change the account password.

**Request Body**

```json
{
  "currentPassword": "OldPass@123",
  "newPassword": "NewPass@456"
}
```

**Response**

```json
{
  "message": "Password updated successfully"
}
```

| Status | Meaning |
|--------|---------|
| `200` | Password changed |
| `400` | Same as current / Validation error |
| `401` | Incorrect current password |

---

## 💌 Connection Request Routes

### `POST /request/send/interested/:userId`

Send an **interested** connection request to another developer.

**URL Parameters**

| Param | Type | Description |
|-------|------|-------------|
| `userId` | `string` | Target developer's MongoDB ObjectId |

**Response**

```json
{
  "message": "Interest sent to Jane Doe",
  "requestId": "64f1a2b3c4d5e6f7a8b9c0d2"
}
```

| Status | Meaning |
|--------|---------|
| `201` | Request sent |
| `400` | Request already exists / Self-request |
| `404` | User not found |

---

### `POST /request/send/ignored/:userId`

**Ignore** (swipe left on) a developer.

**URL Parameters**

| Param | Type | Description |
|-------|------|-------------|
| `userId` | `string` | Target developer's MongoDB ObjectId |

**Response**

```json
{
  "message": "User ignored",
  "requestId": "64f1a2b3c4d5e6f7a8b9c0d3"
}
```

| Status | Meaning |
|--------|---------|
| `201` | Ignored successfully |
| `400` | Request already exists |

---

### `POST /request/review/accepted`

Accept a pending connection request from another developer.

**Request Body**

```json
{
  "requestId": "64f1a2b3c4d5e6f7a8b9c0d2"
}
```

**Response**

```json
{
  "message": "Connection request accepted",
  "connection": { ... }
}
```

| Status | Meaning |
|--------|---------|
| `200` | Request accepted, now connected |
| `404` | Request not found |
| `403` | Not authorized to review this request |

---

### `POST /request/review/rejected`

Reject a pending connection request.

**Request Body**

```json
{
  "requestId": "64f1a2b3c4d5e6f7a8b9c0d2"
}
```

**Response**

```json
{
  "message": "Connection request rejected"
}
```

| Status | Meaning |
|--------|---------|
| `200` | Request rejected |
| `404` | Request not found |

---

## 👥 User Routes

### `GET /user/requests`

Fetch all **pending** connection requests received by the logged-in user.

**Response**

```json
{
  "requests": [
    {
      "requestId": "64f1a2b3c4d5e6f7a8b9c0d2",
      "status": "interested",
      "sender": {
        "_id": "64f1a2b3c4d5e6f7a8b9c0d5",
        "name": "John Smith",
        "skills": ["Python", "Django"],
        "photoUrl": "https://cdn.devtinder.io/photos/john.jpg"
      }
    }
  ]
}
```

| Status | Meaning |
|--------|---------|
| `200` | List returned |
| `401` | Unauthorized |

---

### `GET /user/connections`

Fetch all **accepted** connections (mutual matches).

**Response**

```json
{
  "connections": [
    {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d5",
      "name": "John Smith",
      "skills": ["Python", "Django"],
      "photoUrl": "https://cdn.devtinder.io/photos/john.jpg"
    }
  ]
}
```

| Status | Meaning |
|--------|---------|
| `200` | Connections returned |
| `401` | Unauthorized |

---

### `GET /feed`

Discover developers on the platform. Returns paginated results excluding already-seen or connected users.

**Query Parameters**

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `page` | `number` | `1` | Page number (1-indexed) |
| `limit` | `number` | `10` | Results per page (max: 50) |

**Pagination Formula**

```
skip = (page - 1) * limit
```

| Page | Limit | Skip | Records |
|------|-------|------|---------|
| 1 | 10 | 0 | 1 – 10 |
| 2 | 10 | 10 | 11 – 20 |
| 3 | 10 | 20 | 21 – 30 |
| 4 | 10 | 30 | 31 – 40 |

**Example Request**

```
GET /feed?page=2&limit=10
```

**Response**

```json
{
  "page": 2,
  "limit": 10,
  "totalUsers": 134,
  "data": [
    {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d6",
      "name": "Alex Kumar",
      "age": 24,
      "skills": ["Go", "Kubernetes", "Docker"],
      "about": "DevOps enthusiast building scalable infra.",
      "photoUrl": "https://cdn.devtinder.io/photos/alex.jpg"
    }
  ]
}
```

| Status | Meaning |
|--------|---------|
| `200` | Feed returned |
| `400` | Invalid pagination params |
| `401` | Unauthorized |

---

## 🏷 Status Reference

Connection requests can hold one of four statuses:

| Status | Description |
|--------|-------------|
| `interested` | Sender swiped right / expressed interest |
| `ignored` | Sender swiped left / ignored the profile |
| `accepted` | Receiver accepted the connection request |
| `rejected` | Receiver rejected the connection request |

---

## 📄 Pagination Guide

All paginated endpoints accept `page` and `limit` as query parameters.

```
skip = (page - 1) * limit
```

```
GET /feed?page=1&limit=10   → records  1–10  (skip 0)
GET /feed?page=2&limit=10   → records 11–20  (skip 10)
GET /feed?page=3&limit=10   → records 21–30  (skip 20)
GET /feed?page=4&limit=10   → records 31–40  (skip 30)
```

> ⚠️ **Note:** Maximum `limit` per request is **50**. Requests exceeding this will be capped automatically.

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Auth | Cookie-based Sessions / JWT |
| Validation | express-validator |

---

## 🛡 Error Response Format

All error responses follow a consistent structure:

```json
{
  "error": true,
  "message": "Descriptive error message here",
  "code": 400
}
```

---

*Built with ❤️ for developers, by SriRam Cherukuri.*
