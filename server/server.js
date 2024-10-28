const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const cors = require('cors');
const { mortgageRoute } = require('./routes/mortgage');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '../client')));
app.use(
  cors({
    allowedHeaders: ['Content-Type'],
    origin: 'http://localhost:3000',
    preflightContinue: true,
  })
);
mortgageRoute(app);
app.listen(5000, () => {
  console.log('Listening port', 5000);
});
