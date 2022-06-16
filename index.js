const mongoose = require('mongoose');

const apiDebugger = require('debug')('app:apiDebugger');
const dbDebugger = require('debug')('app:dbDebugger');

const express = require('express');
const app = express();

const home = require('./routes/home');
const convertor = require('./routes/convertor');

const currency_api = require('./currency_api');
const updateDB = currency_api.updateDB;

app.use('/', home);
app.use('/api/convertor', convertor);

app.use(express.json());

mongoose.connect('mongodb://localhost/currency-convertor')
  .then(() => dbDebugger("Conected to MongoDB..."))
  .catch((error) => dbDebugger(error));

setInterval(async function () {
  try {
    apiDebugger('Fetching from Rates Exchange API and updating DB...')
    await updateDB();
  } catch (error) {
    apiDebugger(error.message);
  }
}, 3600000);

port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
