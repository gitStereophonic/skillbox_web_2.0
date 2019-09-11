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
      const usd_e = json.rates.USD;
      const gbp_e = json.rates.GBP;
      const rub_e = json.rates.RUB;

      const usd_r = rub_e / usd_e;
      const gbp_r = rub_e / gbp_e;

      var cat = $('<h4></h4>');
      cat.addClass('news-item-text');
      cat.text(
        'EUR: ' + rub_e.toFixed(2) + ', USD: ' + usd_r.toFixed(2)
        + ', GBP: ' + gbp_r.toFixed(2)
      );

      var tag = $('<a></a>');
      tag.prop("href", "#");
      tag.text('/ Экономика');

      var date = new Date();
      var time = $('<div></div>');
      time.addClass('news-time');
      time.text(date.getHours() + ':' + date.getMinutes());

      var props = $('<div></div>');
      props.addClass('news-item-props');
      props.append(tag);
      props.append(time);

      var body = $('<article></article>');
      body.addClass('news-item');
      body.append(cat);
      body.append(props);

      var header = $('<h2></h2>');
      header.text('Курс рубля');

      var finance = $('<div></div>');
      finance.append($('<hr>'));
      finance.append(header);
      finance.append(body);

      $('.column-left').append(finance);
    }
  });
});
