
const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const { randomUUID } = require('crypto');

const app = express();
const authCookieName = 'token';

// Temporary in-memory storage
let users = [];
let goals = [];
let habits = [];
let events = [];

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.set('trust proxy', 1);
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

const apiRouter = express.Router();
app.use('/api', apiRouter);

// Test endpoint
apiRouter.get('/status', (req, res) => {
    res.send({ status: 'LiveMyGoals service is running' });
});

// Create a new account
apiRouter.post('/auth/create', async (req, res) => {
    const { email, password } = req.body;

    if (typeof email !== 'string' || !email.trim() ||
        typeof password !== 'string' || !password) {
        return res.status(400).send({ message: 'Email and password are required' });
    }

    if (users.find((user) => user.email === email)) {
        return res.status(409).send({ message: 'Account already exists' });
    }

    const user = {
        email: email,
        password: await bcrypt.hash(password, 10),
        token: randomUUID(),
    };

    users.push(user);
    setAuthCookie(res, user.token, req);

    res.status(201).send({ email: user.email });
});

// Log in to an existing account
apiRouter.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;

    const user = users.find((user) => user.email === email);

    if (!user || typeof password !== 'string' ||
        !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send({ message: 'Invalid email or password' });
    }

    user.token = randomUUID();
    setAuthCookie(res, user.token, req);

    res.send({ email: user.email });
});

// Log out
apiRouter.delete('/auth/logout', (req, res) => {
    const user = users.find((user) => user.token === req.cookies[authCookieName]);

    if (user) {
        user.token = null;
    }

    res.clearCookie(authCookieName, { path: '/' });
    res.status(204).end();
});

// Check current authentication
apiRouter.get('/auth/me', (req, res) => {
    const user = users.find((user) => user.token === req.cookies[authCookieName]);

    if (!user) {
        return res.status(401).send({ message: 'Not authenticated' });
    }

    res.send({ email: user.email });
});

// Authentication cookie helper
function setAuthCookie(res, token, req) {
    res.cookie(authCookieName, token, {
        secure: req.secure,
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24 * 7,
        path: '/',
    });
}

app.listen(port, () => {
    console.log(`LiveMyGospel service listening on port ${port}`);
});
