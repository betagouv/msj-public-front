const express = require('express');
const rateLimit = require('express-rate-limit');
const path = require('path');
const helmet = require('helmet');

const app = express();
const directory = `/${process.env.STATIC_DIR || 'dist'}`;
const isPreviewMode = process.env.PREVIEW_MODE === 'true';

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
      baseUri: isPreviewMode
        ? ["'self'", process.env.REACT_APP_MATOMO_BASE_URL]
        : ["'self'"],
      connectSrc: ["'self'", process.env.REACT_APP_BACKEND_HOST, process.env.SENTRY_BASE_URL],
      scriptSrc: ["'self'", process.env.REACT_APP_MATOMO_BASE_URL, "'sha256-Q9vPNvpI3BYCNwzFpA56s9IESqfHGcA8LabbrsO988U='", ...(isPreviewMode ? ["'unsafe-eval'"] : [])],
      styleSrc: isPreviewMode
        ? ["'self'", "'unsafe-inline'", process.env.REACT_APP_MATOMO_BASE_URL]
        : ["'self'", "'unsafe-inline'"],
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
