const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

// Backend data (temporary in-memory storage)
let users = [];
let goals = [];
let habits = [];
let events = [];

// Backend service port
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

// API router
const apiRouter = express.Router();
app.use('/api', apiRouter);

// Test endpoint
apiRouter.get('/status', (req, res) => {
    res.send({ status: 'LiveMyGospel service is running' });
});

// Start the backend
app.listen(port, () => {
    console.log(`LiveMyGospel service listening on port ${port}`);
});