const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const auth = require('http-auth');
const cors = require('cors');
const app = express();

//DOTENV
require('dotenv').config();
const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

app.use(express.json());
app.use(cors());

//DB connection
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, dbName: 'plan' });

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('DB connection established!');
});

//Middleware
const api_auth = auth.basic({
        realm: "Protected Area"
    }, function (username, password, callback) { // Custom authentication method.
        callback(username === "nayar" && password === "mydumbpassword");
    }
);

//Routes
const catsRouter = require('./routes/cats');
const clientsRouter = require('./routes/clients');
const postsRouter = require('./routes/posts');

app.all("/api/*", auth.connect(api_auth), function(req, res, next) {
  next();
});

app.use('/api/cats', catsRouter);
app.use('/api/clients', clientsRouter);
app.use('/api/posts', postsRouter);

app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen( port, () => {
  console.log(`Server runs on port: ${port}!`)
});
