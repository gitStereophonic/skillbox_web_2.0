$(function () {

  const disableScroll = function () {
    $('html, body').on('mousewheel', function () {
      return false;
    });
  }

  const enableScroll = function () {
    $('html, body').off('mousewheel');
  }

  $('#changeButton')
    .css({
      'margin-left': '20px',
      'margin-bottom': '40px'
    }).click(function () {
      /*
        I. Hiding objects
      */

      // var header = $('.column-left h2');

      /*
        By css:
  
        if (header.css('display') == 'block') {
          header.css('display', 'none');
        } else {
          header.css('display', 'block');
        }
      */

      /*
        By jquery methods:
  
        if (header.is(':visible')) {
          header.hide();
        } else {
          header.show(); 
        }
      */

      /*
        Hiding popup container
      */

      $('#popup-container').fadeIn(400, disableScroll);
      $('#popup').animate({
        width: '200px',
        height: '300px'
      }, 400);

      /*
        II. Removing elements
  
        $('.column-left h2').remove();
  
        var newTitle = $('<h2></h2>');
        newTitle.text('Срочные новости').css('color', 'green');
  
        newTitle.prependTo($('.column-left'));
      */

      /*
        Native JS
      
        var newTitle = document.createElement('h2');
        newTitle.innerHTML = 'New Title';
        newTitle.style.color = 'green';
  
        var leftColumn = document.getElementsByClassName('column-left')[0];
        leftColumn.insertBefore(newTitle, leftColumn.firstChild);
      */
    });

  $('#popup-container').click(function (event) {
    if (event.target == this) {
      $(this).fadeOut(400, enableScroll);
      $('#popup').animate({
        width: 0,
        height: 0
      }, 400);
    }
  });
});
