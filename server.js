const express = require('express');
const path = require('path');

const app = express();
const directory = `/${process.env.STATIC_DIR || 'dist'}`;
app.use(express.static(path.join(__dirname, directory)));

// We want to use browserHistory
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {});
