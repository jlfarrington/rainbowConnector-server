require('dotenv').config();
const express = require('express');
const app = express();
const sequelize = require('./db');
const User = require('./controllers/user-controller');
const Rainbow = require('./controllers/rainbow-controller');
const Comment = require('./controllers/comment-controller');

sequelize.sync();
app.use(require('./middleware/headers'));
app.use(express.json());

app.use('/user', User);
app.use('/rainbow', Rainbow);
app.use('/comment', Comment);

app.listen(3000, function() {
    console.log('Rainbow Connector server is listening on port 3000')
})