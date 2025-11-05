const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const { v4: uuidv4 } = require('uuid'); 

const app = express();

const authCookieName = 'token';
let users = [];
let scores = [];
const port = process.argv.length > 2 ? process.argv[2] : 4000;
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

const apiRouter = express.Router();
app.use('/api', apiRouter);
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

apiRouter.post('/auth/login', async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    console.log('Login attempt:', email);

    if (!email || !password) {
      return res.status(400).send({ msg: 'Email and password required' });
    }

    const user = await findUser('email', email);
    if (user && (await bcrypt.compare(password, user.password))) {
      user.token = uuidv4(); 
      setAuthCookie(res, user.token);
      return res.send({ email: user.email });
    }

    res.status(401).send({ msg: 'Unauthorized' });
  } catch (err) {
    console.error('Error in /auth/login:', err);
    next(err);
  }
});

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

apiRouter.get('/scores', verifyAuth, (_req, res) => {
  res.send(scores);
});

apiRouter.post('/score', verifyAuth, (req, res) => {
  scores = updateScores(req.body);
  res.send(scores);
});

app.use(function (err, _req, res, _next) {
  console.error('Unhandled error:', err);
  res.status(500).send({ msg: err.message || 'Server error' });
});

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

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
    token: uuidv4(), 
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
    secure: false,     
    httpOnly: true,
    sameSite: 'strict',
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
