const express = require('express');
const rateLimit = require('express-rate-limit');
const path = require('path');
const helmet = require('helmet');

const app = express();
const directory = `/${process.env.STATIC_DIR || 'dist'}`;

// Rate limiter (100 requests per 15 minutes)
const limiter = rateLimit({
  windowMs: 3 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  validate: {
		xForwardedForHeader: false,
		default: true,
	},
});

app.use(limiter);

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
  frameguard: { action: 'deny' },
  xssFilter: {},
  noSniff: {},
  ieNoOpen: {},
  permittedCrossDomainPolicies: { permittedPolicies: 'none' },
}));

app.use(express.static(path.join(__dirname, directory)));

// We want to use browserHistory
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {});
