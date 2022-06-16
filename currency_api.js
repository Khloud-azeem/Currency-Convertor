const dbDebugger = require('debug')('app:dbDebugger');
const Currencies = require('./models/currencies');
const fetch = require('node-fetch');
require('dotenv').config()


var myHeaders = new fetch.Headers();
myHeaders.append("apikey", process.env.CURRENCY_CONVERTOR_API_KEY);

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

//runs once 
async function getFromApiAndCreateDB() {
  var base = 'EGP';
  const response = await fetch(`https://api.apilayer.com/exchangerates_data/latest?&base=${base}`, requestOptions)
  const result = await response.text();
  jsonrResult = JSON.parse(result);
  var currencies = new Currencies({
    base: 'EGP',
    rates: jsonrResult.rates
  });
  await currencies.save();
  dbDebugger(currencies);
}

async function getFromApiAndUpdateDB() {
  try {
    var currencies = await Currencies.find({ base: 'EGP' });
    var base = 'EGP';
    const response = await fetch(`https://api.apilayer.com/exchangerates_data/latest?&base=${base}`, requestOptions)
    const result = await response.text();
    jsonrResult = JSON.parse(result);
    currencies = await Currencies.updateOne({ base: 'EGP' }, {
      $set: {
        base: base,
        rates: jsonrResult.rates
      }
    });
    dbDebugger(currencies);
  } catch (error) {
    dbDebugger('error', error);
  }
}

// convertor(from x to y) = amount * rate ... rate = rate(y)/rate(x)
async function convertor(from, to, amount) {
  try {
    let rate;
    let calcAmount;
    await Currencies.find().then(
      result => {
        if (from.toUpperCase === 'EGP') {
          rate = result[0].rates.get(to.toUpperCase());
          calcAmount = rate * parseFloat(amount);
        }
        rate = (result[0].rates.get(to.toUpperCase())) / (result[0].rates.get(from.toUpperCase()));
        calcAmount = rate * parseFloat(amount);
        dbDebugger(calcAmount);
      }
    )
    return calcAmount;
  } catch (error) {
    console.log('error', error);
  }
}

module.exports = convertor;
