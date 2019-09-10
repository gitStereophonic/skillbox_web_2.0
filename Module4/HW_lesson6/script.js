$(function () {
  // Из-за того, что бесплатный план fixer.io не позволяет брать другой
  // base, кроме базового (EUR), приходится заниматься переводами рубля
  // ручками через евро
  const myToken = '13a93881c1b3ed4f4b1a5122e58caf99';
  const cat = 'USD,GBP,RUB';

  const url = 'http://data.fixer.io/api/latest?access_key=' +
    myToken + '&symbols=' + cat;

  $.ajax({
    type: 'GET',
    url: url,
    dataType: 'jsonp',
    success: function (json) {

      const eur = 1.0;
      const usd_e = json.rates.USD;
      const gbp_e = json.rates.GBP;
      const rub_e = json.rates.RUB;

      const usd_r = rub_e;
      /*
       * usd = rub
       */

      $('#fixer_widget').prepend('<h4>EUR: ' + usd_r.toFixed(2) + '</h4>');
    }
  });
});
