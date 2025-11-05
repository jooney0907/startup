const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const { v4: uuidv4 } = require('uuid'); // ✅ correct import for uuid v13+

const app = express();

const authCookieName = 'token';

// The scores and users are saved in memory and disappear whenever the service is restarted.
let users = [];
let scores = [];

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
const apiRouter = express.Router();
app.use('/api', apiRouter);

/**
 * AUTH ROUTES
 */

// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res, next) => {
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
    next(err);
  }
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    console.log('Login attempt:', email);

    if (!email || !password) {
      return res.status(400).send({ msg: 'Email and password required' });
    }

    const user = await findUser('email', email);
    if (user && (await bcrypt.compare(password, user.password))) {
      user.token = uuidv4(); // ✅ generate new token
      setAuthCookie(res, user.token);
      return res.send({ email: user.email });
    }

    res.status(401).send({ msg: 'Unauthorized' });
  } catch (err) {
    console.error('Error in /auth/login:', err);
    next(err);
  }
});

// DeleteAuth logout a user
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

/**
 * AUTH MIDDLEWARE
 */

// Middleware to verify that the user is authorized to call an endpoint
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

/**
 * SCORE ROUTES (RESTRICTED)
 */

// GetScores
apiRouter.get('/scores', verifyAuth, (_req, res) => {
  res.send(scores);
});

// SubmitScore
apiRouter.post('/score', verifyAuth, (req, res) => {
  scores = updateScores(req.body);
  res.send(scores);
});

/**
 * ERROR HANDLER + FALLBACK
 */

// Default error handler
app.use(function (err, _req, res, _next) {
  console.error('Unhandled error:', err);
  // send {msg: ...} so frontend can display it
  res.status(500).send({ msg: err.message || 'Server error' });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

/**
 * HELPERS
 */

// updateScores considers a new score for inclusion in the high scores.
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

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuidv4(), // ✅ use uuidv4 here
  };
  users.push(user);

  return user;
}

async function findUser(field, value) {
  if (!value) return null;
  return users.find((u) => u[field] === value);
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: false,     // 🔑 false for localhost/http; set true in real HTTPS
    httpOnly: true,
    sameSite: 'strict',
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
