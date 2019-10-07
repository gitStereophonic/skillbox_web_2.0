$(function () {
  $('button').click(function () {
    $.get(
      'http://data.fixer.io/api/latest',
      {
        'access_key': '2ee385a645d08127b360d87eecdd0fef'
      },
      function (response) {
        console.log(response);
      });
  });
});
