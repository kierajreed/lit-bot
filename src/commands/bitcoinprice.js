const request = require('request');

module.exports.run = (client, message, args, config) => {
  request({
    uri: 'https://api.coindesk.com/v1/bpi/currentprice/USD.json',
  }, function(error, response, body) {
    const priceObj = JSON.parse(body);
    let price = priceObj.bpi.USD.rate; // eslint-disable-line newline-after-var
    price = price.substring(0, price.length - 2);

    message.channel.send(`The current price of bitcoin is: \$${price}!`);
  });
};

module.exports.info = {
  'version': '1.0',
  'name': 'bitcoinprice',
  'help': 'Display current bitcoin price!',
  'usage': '',
  'hidden': false,
};
