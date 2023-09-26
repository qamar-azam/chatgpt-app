const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const authRoute = require('./routes/auth-route');
const chatRoute = require('./routes/chat-route');

require('dotenv').config();

// connect with mongodb
connectDB();

const app = express();
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', authRoute);
app.use('/', chatRoute);

app.listen(4000, () => {
  console.log('listening to port 4000');
});
