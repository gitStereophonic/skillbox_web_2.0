$(function () {
  $('#changeButton')
    .css({
      'margin-left': '20px',
      'margin-bottom': '40px'
    }).click(function () {
      $('.column-left h2').remove();

      var newTitle = $('<h2></h2>');
      newTitle.text('Срочные новости').css('color', 'green');

      newTitle.prependTo($('.column-left'));

      /*
        Native JS
      
        var newTitle = document.createElement('h2');
        newTitle.innerHTML = 'New Title';
        newTitle.style.color = 'green';

        var leftColumn = document.getElementsByClassName('column-left')[0];
        leftColumn.insertBefore(newTitle, leftColumn.firstChild);
      */
    });
});
