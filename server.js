const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port=3000
const UserController = require('./controllers/User')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const UserRoute = require('./routes/User')
app.use('/user',UserRoute)

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;//+++
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Databse Connected Successfully!!");
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});
app.get('/', (req, res) => {
    res.json({"message": "Hello Crud Node Express"});
});
app.post('/', UserController.create)
app.listen(3000, () => {
    console.log(`App listening at http://localhost:${port}`)
});