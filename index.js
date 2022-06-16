const mongoose = require('mongoose');

const express = require('express');
const app = express();

const home = require('./routes/home');
const convertor = require('./routes/convertor');

app.use('/', home);
app.use('/api/convertor', convertor);

app.use(express.json());

mongoose.connect('mongodb://localhost/currency-convertor')
  .then(() => console.log("Conected to MongoDB..."))
  .catch((error) => console.log(error));

port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});