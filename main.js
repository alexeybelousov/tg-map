const config = require("config");
const express = require("express");
const path = require("path");

const app = express();

app.use(express.json())

process.on('uncaughtException', (err) => {
  console.log(err);
});

app.use('/api/map', require('./routes/map.routes'));

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = config.get('APP_PORT') || 5000;

async function start() {
  try {
    app.listen(port, () => console.log(`App has benn started on port ${port}`));
  } catch (err) {
    console.log('Server error', err.message);
    process.exit(1);
  }
}

start();