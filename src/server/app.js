const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(cors());

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: 5432,
    ssl: {
        rejectUnauthorized: false,  // This line ensures SSL connection if required
    },
});

app.get('/api/test', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT NOW()');
        res.json(result.rows);
        client.release();
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Function to get PostgreSQL version
async function getPgVersion() {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT version()');
        console.log(result.rows[0]);
        client.release();
    } catch (err) {
        console.error('Error getting PostgreSQL version:', err);
    }
}

// Call the function to get PostgreSQL version
getPgVersion();
