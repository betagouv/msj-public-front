const express = require('express');
const path = require('path');

const app = express();
const directory = `/${process.env.STATIC_DIR || 'dist'}`;
app.use(express.static(path.join(__dirname, directory)));

const port = process.env.PORT || 5000;
app.listen(port, () => {});
