const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const DB = require('./database.js');
const app = express();

const authCookieName = 'token';
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

const apiRouter = express.Router();
app.use('/api', apiRouter);

// ---------- AUTH ROUTES ----------

// CREATE / REGISTER USER  (stores credentials in MongoDB)
apiRouter.post('/auth/create', async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    console.log('Register attempt:', email);

    if (!email || !password) {
      return res.status(400).send({ msg: 'Email and password required' });
    }

    // Check MongoDB for existing user
    const existingUser = await DB.getUser(email);
    if (existingUser) {
      return res.status(409).send({ msg: 'Existing user' });
    }

    // Hash and store user in MongoDB
    const passwordHash = await bcrypt.hash(password, 10);
    const user = {
      email,
      password: passwordHash,
      token: uuidv4(),
    };

    await DB.addUser(user);

    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  } catch (err) {
    console.error('Error in /auth/create:', err);
    next(err);
  }
});

// LOGIN USER  (retrieves credentials from MongoDB)
apiRouter.post('/auth/login', async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    console.log('Login attempt:', email);

    if (!email || !password) {
      return res.status(400).send({ msg: 'Email and password required' });
    }

    // Get user from MongoDB
    const user = await DB.getUser(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      user.token = uuidv4();
      await DB.updateUser(user);

      setAuthCookie(res, user.token);
      return res.send({ email: user.email });
    }

    res.status(401).send({ msg: 'Unauthorized' });
  } catch (err) {
    console.error('Error in /auth/login:', err);
    next(err);
  }
});

// LOGOUT USER (clears token in MongoDB)
apiRouter.delete('/auth/logout', async (req, res) => {
  try {
    const token = req.cookies[authCookieName];
    if (token) {
      const user = await DB.getUserByToken(token);
      if (user) {
        user.token = null;
        await DB.updateUser(user);
      }
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
    const token = req.cookies[authCookieName];
    if (!token) {
      return res.status(401).send({ msg: 'Unauthorized' });
    }

    const user = await DB.getUserByToken(token);
    if (user) {
      // You could attach user to req if you want:
      // req.user = user;
      return next();
    }

    res.status(401).send({ msg: 'Unauthorized' });
  } catch (err) {
    console.error('Error in verifyAuth:', err);
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

// ---------- SCORE ROUTES (APP DATA IN MONGODB) ----------

// Get top scores from MongoDB
apiRouter.get('/scores', verifyAuth, async (_req, res, next) => {
  try {
    const scores = await DB.getHighScores();
    res.send(scores);
  } catch (err) {
    console.error('Error in GET /scores:', err);
    next(err);
  }
});

// Add a new score + return top scores from MongoDB
apiRouter.post('/score', verifyAuth, async (req, res, next) => {
  try {
    const newScore = req.body; // e.g., { name: 'Josh', score: 123 }

    await DB.addScore(newScore);
    const scores = await DB.getHighScores();

    res.send(scores);
  } catch (err) {
    console.error('Error in POST /score:', err);
    next(err);
  }
});

// ---------- ERROR HANDLING & FALLBACK ----------

app.use(function (err, _req, res, _next) {
  console.error('Unhandled error:', err);
  res.status(500).send({ msg: err.message || 'Server error' });
});

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// ---------- HELPERS ----------

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: false,     // set to true in production with HTTPS
    httpOnly: true,
    sameSite: 'strict',
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
