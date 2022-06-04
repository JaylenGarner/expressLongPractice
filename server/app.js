const express = require('express');
const app = express();
require('express-async-errors');
const dogRouter = require('./routes/dogs.js')

app.use(express.json());

app.use('/dogs', dogRouter)

app.use('/static', express.static('/assets'));

app.use((req, res, next) => {
  console.log(`${req.method}, ${req.url}`);
  res.on('finish', () => {
    console.log(res.statusCode);
  });
  next()
});

// For testing purposes, GET /
app.get('/', (req, res) => {
  res.json("Express server running. No content provided at root level. Please use another route.");
});

// For testing express.json middleware
app.post('/test-json', (req, res, next) => {
  // send the body as JSON with a Content-Type header of "application/json"
  // finishes the response, res.end()
  res.json(req.body);
  next();
});

// For testing express-async-errors
app.get('/test-error', async (req, res) => {
  throw new Error("Hello World!")
});

app.use((req, res) => {
    let err = new Error("The requested resource couldn't be found.")
    err.statusCode = 404
    throw err
})

const port = 5000;
app.listen(port, () => console.log('Server is listening on port', port));
