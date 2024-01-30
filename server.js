const express = require('express');
const path = require('path');
const helmet = require('helmet');

const app = express();
const directory = `/${process.env.STATIC_DIR || 'dist'}`;

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", process.env.REACT_APP_BACKEND_HOST],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:'],
      fontSrc: ["'self'"],
    },
  },
}));

app.use(express.static(path.join(__dirname, directory)));

// We want to use browserHistory
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {});
