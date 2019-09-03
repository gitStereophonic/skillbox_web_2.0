$(function () {
  function changeFontColor() {
    $('.container').toggleClass('newStyle');
  }

  $('textarea').on('focus', function () {
    $(this).css('background-color', 'green');
  });

  $('textarea').on('blur', function () {
    $(this).css('background-color', 'white');
  });

  $('a').on('click', function () {
    changeFontColor();
    return false;
  });
});
