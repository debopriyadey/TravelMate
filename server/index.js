const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoute = require('./routes/auth');
const reviewRoute = require('./routes/review');

const app = express();
app.use(express.json({limit: "30mb", extended: true}))
app.use(express.urlencoded({limit: "30mb", extended: true}))
app.use(cors())
// simulate delay response
// app.use((req, res, next) => { 
//   setTimeout(() => next(), 1000);
// });

app.use('/', authRoute);
app.use('/', reviewRoute);

   
const PORT = process.env.PORT||5000
//const dbURI ="mongodb://localhost/travellersdiary";

const dbURI = "mongodb+srv://docsarea:1234@cluster0.egnnh.mongodb.net/travellersdiary?retryWrites=true&w=majority";
// const dbURI ="mongodb://localhost/travellersdiary";
// 'mongodb://localhost/node-api'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(PORT, () => console.log("server running on port 5000")))
  .catch((err) => console.log(err.message));

mongoose.set('useFindAndModify', false);