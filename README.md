# World Countries Visited Tracker

This is a Node.js + Express project that lets you track countries you have visited. Users can add a country, and it will be highlighted if already visited.

## Features
- Add a country you visited
- Highlight visited countries
- Prevent duplicates

## Tech Stack
- Node.js
- Express.js
- PostgreSQL
- EJS for templates
- Body-parser

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/repo-name.git
2.Install dependencies:
 ```bash
       npm install
```
3. Set up PostgreSQL database:
Create a database called world
Run setup.sql to create tables and sample data
4.Create a .env file with your database credentials:
```bash
DB_USER=postgres
DB_PASSWORD=dolphins
DB_HOST=localhost
DB_PORT=5432
DB_NAME=world
```
5.Run the server:
```
npm start
```
6.Open your browser at http://localhost:3000
