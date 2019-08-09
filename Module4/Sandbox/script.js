$(function () {
  function changeFontColor() {
    $('#container').toggleClass('newStyle');
  }

  setInterval(changeFontColor, 2000);
});
