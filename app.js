// require('dotenv').load({ silent: true });

const express = require('express');
const bodyParser = require('body-parser');
const bunnymq = require('bunnymq')({
  host: 'amqp://nzgmkclf:XjPG1TRprZiDChCgreL36AFqA6MxaUMH@lark.rmq.cloudamqp.com/nzgmkclf'
}).producer;

const app = express();
const PORT = parseInt(process.env.PORT, 10) || 3000;

app.enable('trust proxy');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '16mb' }));

app.get('/', (req, res, next) => {
    res.json({ route : '/'});
});

app.get('/commandes', (req, res, next) => {
  bunnymq.produce('sql:query:run', 'SELECT * FROM commandes;', { rpc: true })
  .then((result) => {
    res.json(result);
  });
});

app.get('/commandes/:id', (req, res, next) => {
  res.json({ route : '/commandes/:id'});
});

app.post('/import', function(req, res, next) {
  res.json({ route : '/import'});
});

// Error handling middlewares
app.use((err, req, res, next) => {
  if (!err) {
    err = new Error('Not Found');
    err.status = 404;
    err.errors = err.errors || [];
  }

  next(err);
});

app.use((err, req, res, next) => {
  if (!err) return next();

  return res.status(err.status || 500)
  .send({
    message: err.message,
    status: err.status,
    errors: err.errors || []
  });
});

app.listen(PORT, function () {
  console.info('[Health] Web server start listening at: http://%s:%s', 'localhost', PORT);
});

module.exports = app;
