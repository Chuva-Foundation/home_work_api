const express = require('express');
const UserController = require('./controllers/UserController');
const auth = require('./middlewares/auth');
const SessionController = require('./controllers/SessionController');
const SubmissionController = require('./controllers/SubmissionController');
const upload = require('./config/multer');
const PsetController = require('./controllers/PsetController');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

// User Routes
app.post('/user', UserController.create);


app.post("/log_in", SessionController.create);

app.put('/user/', UserController.update);

app.get('/user', UserController.getInfo);

app.get('/users', UserController.getAll);

app.delete('/user', UserController.deleteUsr);


// Pset routes
app.post('/problemSet', PsetController.create);

app.get('/problemSet/:pset_id', PsetController.getOne);

app.get('/problemSets', PsetController.getAll);

app.put('/problemSet/:pset_id', PsetController.update);

app.delete('/problemSet/:pset_id', PsetController.deletePset);


// Submissions Routes
app.post('/submission', upload.single('file'), SubmissionController.create);

app.put('/submission/:submission_id', upload.single('file'), SubmissionController.update);

app.get('/submission/:submission_id',  SubmissionController.getOne);

app.get('/submissions',  SubmissionController.getAll);

app.get('/userSubs/:user_id', SubmissionController.getOne)

app.delete('/submission/:submission_id', SubmissionController.deleteSubm);


app.listen(5000, () => {
    console.log("Server Listening on Port 5000....");
})