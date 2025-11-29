const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const DB = require('./database.js');
const { peerProxy } = require('./peerProxy.js');

const app = express();

const authCookieName = 'token';
const port = process.argv.length > 2 ? process.argv[2] : 4000;
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

const apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.post('/auth/create', async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).send({ msg: 'Email and password required' });
  }

  if (await findUser('email', email)) {
    return res.status(409).send({ msg: 'Existing user' });
  }

  const user = await createUser(email, password);
  setAuthCookie(res, user.token);
  res.send({ email: user.email });
});

apiRouter.post('/auth/login', async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).send({ msg: 'Email and password required' });
  }

  const user = await findUser('email', email);
  if (user && (await bcrypt.compare(password, user.password))) {
    user.token = uuid.v4();
    await DB.updateUser(user);

    setAuthCookie(res, user.token);
    res.send({ email: user.email });
    return;
  }

  res.status(401).send({ msg: 'Unauthorized' });
});

apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    delete user.token;
    await DB.updateUser(user);
  }

  res.clearCookie(authCookieName);
  res.status(204).end();
});

const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

apiRouter.get('/scores', verifyAuth, async (_req, res) => {
  const scores = await DB.getHighScores();
  res.send(scores);
});

apiRouter.post('/score', verifyAuth, async (req, res) => {
  const payload = req.body || {};

  if (!payload.name) {
    payload.name = (req.user?.email || 'Anonymous').split('@')[0];
  }

  const scores = await updateScores(payload);
  res.send(scores);
});

app.use(function (err, _req, res, _next) {
  console.error(err);
  res.status(500).send({ type: err.name, message: err.message });
});

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

async function updateScores(newScore) {
  await DB.addScore(newScore);
  return DB.getHighScores();
}

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await DB.addUser(user);

  return user;
}

async function findUser(field, value) {
  if (!value) return null;

  if (field === 'token') {
    return DB.getUserByToken(value);
  }

  return DB.getUser(value);
}

function setAuthCookie(res, authToken) {
  const isProd = process.env.NODE_ENV === 'production';

  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: isProd,      
    httpOnly: true,
    sameSite: 'strict',
  });
}

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

peerProxy(httpService);
