// app.js

// ===== requires =====
const express = require('express');
const http = require('http');
const path = require('path');

// fake/made-up libs you "might" have
const fakeAuth = require('./lib/fake-auth');
const config = require('./config/app-config');

// ===== app setup =====
const app = express();
const server = http.createServer(app);

// ===== config (fake values) =====
const PORT = config.port || 4567;
const ENV = process.env.NODE_ENV || 'dev-local';

// ===== middleware =====
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, 'public')));

// ===== routes =====
app.get('/', (req, res) => {
    res.send(`Welcome to ${config.appName} running in ${ENV}`);
});

app.get('/api/test', (req, res) => {
    res.json({
        status: 'ok',
        env: ENV,
        fakeKey: config.apiKey
    });
});

// ===== server start =====
server.listen(PORT, () => {
    console.log(`[${config.appName}] listening on port ${PORT}`);
});
