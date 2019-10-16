$(function() {
  // Из-за того, что бесплатный план fixer.io не позволяет брать другой
  // base, кроме базового (EUR), приходится заниматься переводами рубля
  // ручками через евро
  const myToken = '13a93881c1b3ed4f4b1a5122e58caf99';
  const cat = 'USD,GBP,RUB';

  const url = 'http://data.fixer.io/api/latest?access_key=' + myToken + '&symbols=' + cat;

  $.ajax({
    type: 'GET',
    url: url,
    dataType: 'jsonp',
    success: function(json) {
      const usd_e = json.rates.USD;
      const gbp_e = json.rates.GBP;
      const rub_e = json.rates.RUB;

      const usd_r = rub_e / usd_e;
      const gbp_r = rub_e / gbp_e;

      const date = new Date();

      const finance = $(`
        <div>
          <hr>
          <h2>Курс рубля</h2>
          <article class="news-item">
            <h4 class="news-item-text">
              EUR: ${rub_e.toFixed(2)}, USD: ${usd_r.toFixed(2)}, GBP: ${gbp_r.toFixed(2)}
            </h4>
            <div class="news-item-props">
              <a href="#">/ Экономика</a>
              <div class="news-time">${date.getHours()} : ${date.getMinutes()}</div>
            </div>
          </article>
        </div>
      `);

      $('.column-left').append(finance);
    }
  });
});
