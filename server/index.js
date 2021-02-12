import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import getreviews from './routes/reviews/getreviews.js';
import createreview from './routes/reviews/createreviews.js';
import myreviews from './routes/reviews/myreviews.js';
import signup from './routes/auth/signup.js';
import login from './routes/auth/login.js';


const app = express();

app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cors())

app.use('/fetchreviews', getreviews);
app.use('/createReviews', createreview);
app.use('/myreviews', myreviews);
app.use('/signup', signup);
app.use('/signin', login);


// const dbURI = "mongodb+srv://docsarea:1234@cluster0.egnnh.mongodb.net/travellersdiary?retryWrites=true&w=majority";
const dbURI ="mongodb://localhost/travellersdiary";
// 'mongodb://localhost/node-api'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(5000, () => console.log("server running on port 5000")))
  .catch((err) => console.log(err));

mongoose.set('useFindAndModify', false);