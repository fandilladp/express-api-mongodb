const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');


//middleware
app.use(bodyParser());


//import routes
const hmeRoutes = require('./app/routes/app-hme');
const auth = require('./app/routes/auth');
//routes
app.use('/api/datamhs', hmeRoutes);
app.use('/api/auth', auth);

//connect to DB
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true,  useUnifiedTopology: true});
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'Database error Conection'));
db.once('open', ()=>{
    console.log('DB is Conected');
})
//listen 
app.listen(process.env.PORT, ()=>{
    console.log(`server runing in PORT ${process.env.PORT}`);
});

