const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

//routes
const userRoutes = require('./routes/account');
const mainRoute = require('./routes/main');
const sellerRoute = require('./routes/seller');
const CONFIG = require('./config');

const app = express();
app.use('/uploads', express.static('uploads'));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
// for availbe upload folder publicly

//connection
mongoose.connect(CONFIG.database, (err) => {
  if (err) {
    console.error(err);
  }
  else {
    console.log('Connected!!');

  }

});

//to route all account related api
app.use('/api', mainRoute);
app.use('/api/accounts', userRoutes);
app.use('/api/seller', sellerRoute);

app.listen(CONFIG.port, err => {
  console.log(`localhost:${CONFIG.port} to open the server`);

});
