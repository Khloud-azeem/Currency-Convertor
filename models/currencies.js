const mongoose = require('mongoose');

const currenciesSchema = new mongoose.Schema({
    base: String,
    rates: {
      type: Map,
      of: Number
    }
  });
  const Currencies = mongoose.model('Currencies', currenciesSchema);
  
  module.exports = Currencies;