const PORT = process.env.PORT || 5000;
const express = require ('express')
const mongose = require('mongoose')
const app = express();
const bodyParser = require ('body-parser');
const db = require('./config/keys').mongoURI;
//connect to Mongo
// configure body-parser
app.use (bodyParser.json ({limit: '50mb'}));// parse form data client
app.use (bodyParser.urlencoded ({limit: '50mb', extended: true}));
mongose
    .connect(db,{
        useNewUrlParser:true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })
    .then(()=> {
console.log ('MongoDB Connected...');

    })
    .catch(err => console.log (err));
    app.use('/api/user', require('./routes/api.js'));
    app.listen(PORT, console.log(`Server started on port ${PORT}`));