// services/index.js

const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');

const app = express();

const authCookieName = 'token';

// In-memory storage (clears whenever the service restarts)
let users = [];
let scores = [];

// Service port. In production, the front-end is hosted by this same service.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// ---------- MIDDLEWARE ----------

app.use(express.json());        // parse JSON bodies
app.use(cookieParser());        // read cookies
app.use(express.static('public')); // serve React build from ./public

// Router for /api endpoints
const apiRouter = express.Router();
app.use('/api', apiRouter);

// ---------- AUTH ROUTES ----------

// Register new user  (POST /api/auth/create)
apiRouter.post('/auth/create', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    console.log('Register attempt:', email);

    if (!email || !password) {
      return res.status(400).send({ msg: 'Email and password required' });
    }

    if (await findUser('email', email)) {
      return res.status(409).send({ msg: 'Existing user' });
    }

    const user = await createUser(email, password);
    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  } catch (err) {
    console.error('Error in /auth/create:', err);
    res.status(500).send({ msg: 'Server error' });
  }
});

// Login existing user  (POST /api/auth/login)
apiRouter.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    console.log('Login attempt:', email);

    if (!email || !password) {
      return res.status(400).send({ msg: 'Email and password required' });
    }

    const user = await findUser('email', email);
    if (user && (await bcrypt.compare(password, user.password))) {
      user.token = generateToken();
      setAuthCookie(res, user.token);
      return res.send({ email: user.email });
    }

    res.status(401).send({ msg: 'Unauthorized' });
  } catch (err) {
    console.error('Error in /auth/login:', err);
    res.status(500).send({ msg: 'Server error' });
  }
});

// Logout  (DELETE /api/auth/logout)
apiRouter.delete('/auth/logout', async (req, res) => {
  try {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
      delete user.token;
    }
  } catch (err) {
    console.error('Error in /auth/logout:', err);
  } finally {
    res.clearCookie(authCookieName);
    res.status(204).end();
  }
});

// ---------- AUTH MIDDLEWARE ----------

const verifyAuth = async (req, res, next) => {
  try {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
      return next();
    }
    res.status(401).send({ msg: 'Unauthorized' });
  } catch (err) {
    console.error('Error in verifyAuth:', err);
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

// ---------- SCORE ROUTES (RESTRICTED) ----------

// Get scores (GET /api/scores)
apiRouter.get('/scores', verifyAuth, (_req, res) => {
  res.send(scores);
});

// Submit score (POST /api/score)
apiRouter.post('/score', verifyAuth, (req, res) => {
  scores = updateScores(req.body);
  res.send(scores);
});

// ---------- FALLBACK + ERROR HANDLER ----------

// Default error handler
app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).send({ msg: err.message || 'Server error' });
});

// Return index.html for unknown paths (React Router)
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// ---------- HELPERS ----------

function updateScores(newScore) {
  let found = false;

  for (const [i, prevScore] of scores.entries()) {
    if (newScore.score > prevScore.score) {
      scores.splice(i, 0, newScore);
      found = true;
      break;
    }
  }

  if (!found) {
    scores.push(newScore);
  }

  if (scores.length > 10) {
    scores.length = 10;
  }

  return scores;
}

// simple token generator (no uuid needed)
function generateToken() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email,
    password: passwordHash,
    token: generateToken(),
  };

  users.push(user);
  return user;
}

async function findUser(field, value) {
  if (!value) return null;
  return users.find((u) => u[field] === value);
}

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: false,      // ← keep false for http://localhost
    httpOnly: true,
    sameSite: 'strict',
  });
}

// ---------- START SERVER ----------

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
