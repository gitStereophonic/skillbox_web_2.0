$(function () {
  function addEmptyList() {
    var emptyList = $('<p></p>');
    emptyList.text('Список пуст...');
    emptyList.addClass('tips empty-list');
    $('#task-list').append(emptyList);
  }

  addEmptyList();

  $('#add-task').click(function () {
    var newTaskTitle = $('#new-task-name').val();
    var newTaskDescription = $('#new-task-desc').val();

    if (newTaskTitle == '') {
      return false;
    }

    if ($('.empty-list')) {
      $('.empty-list').remove();
    }

    var newTaskH = $('<h3></h3>');
    newTaskH.text(newTaskTitle);

    var closeBtn = $('<button></button>');
    closeBtn.addClass('close-btn');
    closeBtn.click(function () {
      $(this).parent().parent().remove();
      if (!$('.task-container').length) {
        addEmptyList();
      }
    });

    var optionsBtn = $('<button></button>');
    optionsBtn.addClass('options-btn');

    var newTaskHeader = $('<div></div>');
    newTaskHeader.addClass('new-task-header clearfix');
    newTaskHeader.append(newTaskH);
    newTaskHeader.append(closeBtn);
    newTaskHeader.append(optionsBtn);

    var newTaskDescD = $('<div></div>');
    newTaskDescD.addClass('task-description');
    newTaskDescD.text(newTaskDescription);

    var newTaskDiv = $('<div></div>');
    newTaskDiv.addClass('task-container');
    newTaskDiv.append(newTaskHeader);
    newTaskDiv.append(newTaskDescD);

    // final adding
    newTaskDiv.appendTo($('#task-list'));

    //clear

    $('#new-task-name').val('');
    $('#new-task-desc').val('');
    return false;
  });
});
