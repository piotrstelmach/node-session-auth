# Node.js auth session 

## Description
This is a simple auth with session using node.js and express.js. I want to explain how to use session in node.js. I hope this will be useful for you.
It's not typical approach like JWT or OAuth. I just want to show how it works in general and how can be used in some cases.

## Additional info
- Project is still in progress state and some features are not implemented yet.
- I don't use express-session package. I want to show how it works in general way without tools.

## Stack
- Node.js
- Express.js
- Redis
- Prisma
- MySQL

## Features
- Sign up
- Sign in
- Sign out
- One protected route
- One unprotected route

## How to run

Note: You need to have docker and docker-compose installed on your machine.
Note: Please check DATABASE_URL in .env after generate prisma client. It should be for example `mysql://user:password@localhost:3306/db`

1. Clone this repository
2. Prepare your `.env` file. You can use `.env.example` as a template.
3. Simply run first of all `docker-compose up -d` to get database and redis up and running.
4. Run `npm install`
5. Run `npx prisma generate` to generate prisma client.
6. Migrate database with `npx prisma migrate dev --name init`
7. Run `npm start`
8. Open `http://localhost:8000` in your browser or use Postman(recommended)
9. Enjoy!

## Routes

### Register
`POST /auth/register`

Request body:
```json
{
    "name": "example name",
    "email": "example email",
    "password": "example password"
}
```

Response body:
```json
{
  "id": 435,
  "name": "example name",
  "email": "example email"
}
```

### Login
`POST /auth/login`

Request body:
```json
{
    "email": "example email",
    "password": "example password"
}
```

If successful redirects to `/` route.

### Logout
`POST /auth/logout`

### Dashboard
`GET /dashboard`

Protected route. If user is not authenticated redirects to `/` route.

### Home
`GET /`

Unprotected route. Starting page. If user is authenticated redirects to `/dashboard` route.

