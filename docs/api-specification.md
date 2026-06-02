# JARVIS API Specification

## Base URL

```
https://api.jarvis.local/api/v1
```

## Authentication

All API requests require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Response Format

All API responses follow a standard JSON format:

```json
{
  "status": "success|error",
  "data": {},
  "message": "Optional message",
  "timestamp": "2026-06-02T19:30:00Z"
}
```

## Endpoints

### Authentication

#### POST /auth/register
Register a new user.

**Request:**
```json
{
  "username": "jarvis_user",
  "email": "user@example.com",
  "password": "secure_password"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "user_id": "uuid",
    "token": "jwt_token"
  }
}
```

#### POST /auth/login
Authenticate user and get token.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "token": "jwt_token",
    "user": { "id": "uuid", "username": "jarvis_user" }
  }
}
```

### Devices

#### GET /devices
Get all registered devices.

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "device_id": "uuid",
      "name": "iPhone 12",
      "type": "phone",
      "os": "iOS",
      "last_sync": "2026-06-02T19:30:00Z"
    }
  ]
}
```

#### POST /devices/register
Register a new device.

**Request:**
```json
{
  "name": "iPhone 12",
  "type": "phone",
  "os": "iOS"
}
```

#### DELETE /devices/{device_id}
Unregister a device.

### Voice Commands

#### POST /commands/voice
Process a voice command.

**Request:**
```json
{
  "audio_base64": "base64_encoded_audio",
  "device_id": "device_uuid"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "command": "Turn on lights",
    "intent": "device_control",
    "action": "turn_on",
    "target": "lights",
    "response": "Turning on the lights",
    "response_audio": "base64_encoded_audio"
  }
}
```

#### POST /commands/text
Process a text command.

**Request:**
```json
{
  "text": "What is the weather?",
  "device_id": "device_uuid"
}
```

#### GET /commands/history
Get command history.

**Query Parameters:**
- `limit`: Number of records (default: 50)
- `offset`: Pagination offset (default: 0)
- `device_id`: Filter by device (optional)

### Tasks

#### GET /tasks
Get all tasks.

**Query Parameters:**
- `status`: Filter by status (pending, completed, failed)
- `device_id`: Filter by device

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "task_id": "uuid",
      "title": "Send email",
      "description": "Send email to john@example.com",
      "status": "completed",
      "created_at": "2026-06-02T19:00:00Z",
      "completed_at": "2026-06-02T19:05:00Z"
    }
  ]
}
```

#### POST /tasks
Create a new task.

**Request:**
```json
{
  "title": "Send email",
  "description": "Send email to john@example.com",
  "scheduled_time": "2026-06-02T20:00:00Z"
}
```

#### PUT /tasks/{task_id}
Update a task.

#### DELETE /tasks/{task_id}
Delete a task.

### Notifications

#### POST /notifications/subscribe
Subscribe to notifications (WebSocket).

**WebSocket URL:**
```
wss://api.jarvis.local/ws/notifications
```

**Message Format:**
```json
{
  "type": "command_response|task_update|system_alert",
  "data": {}
}
```

## Error Codes

| Code | Message | Status |
|------|---------|--------|
| 400 | Bad Request | 400 |
| 401 | Unauthorized | 401 |
| 403 | Forbidden | 403 |
| 404 | Not Found | 404 |
| 429 | Too Many Requests | 429 |
| 500 | Internal Server Error | 500 |

## Rate Limiting

- **Default**: 100 requests per minute per user
- **Headers**:
  - `X-RateLimit-Limit`: Total requests allowed
  - `X-RateLimit-Remaining`: Requests remaining
  - `X-RateLimit-Reset`: Unix timestamp when limit resets

## Status Codes

| Code | Meaning |
|------|----------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 204 | No Content - Successful with no response body |
| 400 | Bad Request - Invalid parameters |
| 401 | Unauthorized - Auth required |
| 403 | Forbidden - No permission |
| 404 | Not Found - Resource not found |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Server Error - Internal error |
