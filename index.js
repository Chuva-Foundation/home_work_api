const express = require('express');
const UserController = require('./controllers/UserController');
const auth = require('./middlewares/auth');
const SessionController = require('./controllers/SessionController');

const app = express();

app.use(express.json());

app.post('/user', UserController.create);

app.use(auth);

app.post("/session", SessionController.create);


app.listen(5000, () => {
    console.log("Server Listening on Port 5000....");
})