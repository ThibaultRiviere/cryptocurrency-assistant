
const bittrex = require('node.bittrex.api');
const btcToSatoshi = require('../../utils/satoshi.js');


function formatPrice(price) {
    if (price < 1) {
        return `${btcToSatoshi(price)} satoshi`;
    }
    return `${price} btc`;
}

function price(app) {
    const currency = app.getArgument('currency')
    if (!currency) {
        app.ask('Quelle currency vous interesse?');
    }
    console.log(`Getting price for ${currency}`);
    bittrex.getticker( { market : `BTC-${currency}` }, function( data, err ) {
        if (err) {
            return app.tell(`Une erreur est survenue ${err.message}`);
        }
        return app.tell(`Sur bittrex le prix du ${currency} est de  ${formatPrice(data.result.Last)}`);
    });
}

module.exports = price;
