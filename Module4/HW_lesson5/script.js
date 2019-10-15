$(function() {
  $('#changeButton')
    .css({
      'margin-left': '20px',
      'margin-bottom': '40px'
    })
    .click(function() {
      let pagePos = $(window).scrollTop();

      $('body')
        .addClass('scroll-off')
        .attr('data-scroll', pagePos);
      $('body').css('top', pagePos);

      $('#popup-container').fadeIn(400);
      $('#popup').animate(
        {
          width: '200px',
          height: '300px'
        },
        400
      );
    });

  $('#popup-container').click(function(event) {
    if (event.target == this) {
      let pos = parseInt($('body').attr('data-scroll'), 10);
      $(this).fadeOut(400);
      $('#popup').animate(
        {
          width: 0,
          height: 0
        },
        400,
        function() {
          $('body').removeClass('scroll-off');
          $('body')
            .css('top', 'auto')
            .removeAttr('data-scroll');
        }
      );
    }
  });
});
