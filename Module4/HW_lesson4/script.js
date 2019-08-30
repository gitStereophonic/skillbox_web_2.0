$(function () {
  // Функция, вставляющая tool tip с информацией о пустом списке дел
  function addEmptyList() {
    var emptyList = $('<p></p>');
    emptyList.text('Список пуст...');
    emptyList.addClass('tips empty-list');
    $('#task-list').append(emptyList);
  }

  // При загрузке страницы список дел пустой
  addEmptyList();

  // Событие добавления задачи в список дел
  $('#add-task').click(function () {

    // Заголовок дела из инпута
    var newTaskTitle = $('#new-task-name').val();
    // Описание дела из инпута
    var newTaskDescription = $('#new-task-desc').val();

    // Проверка непустого заголовка
    if (newTaskTitle == '') {
      return false;
    }

    // Удаление tool tip'а о пустом списке дел
    if ($('.empty-list')) {
      $('.empty-list').remove();
    }

    // HTML заголовок с текстом главной цели дела 
    var newTaskH = $('<h3></h3>');
    newTaskH.text(newTaskTitle);

    // "Кнопка" удаления всего контейнера
    var closeBtn = $('<button></button>');
    closeBtn.addClass('close-btn');
    closeBtn.click(function () {
      $(this).parent().parent().remove();
      // Если удаленный элемент был последний, добавляется 
      // tool tip с пометкой, что список пуст
      if (!$('.task-container').length) {
        addEmptyList();
      }
    });

    // "Кнопка", скрывающая описание задания
    var optionsBtn = $('<a></a>');
    optionsBtn.addClass('options-btn');
    optionsBtn.click(function () {
      // Триггер появления/исчезновения описания
      $(this).parent().parent().children('.task-description').slideToggle('slow');

      // Поворот стрелки
      if ($(this).hasClass('rotated'))
        $(this).removeClass('rotated');
      else
        $(this).addClass('rotated');
    });

    // Хедер контейнера задачи. Содержит текст задачи и кнопки 
    // удаления задачи и сворачивания описания
    var newTaskHeader = $('<div></div>');
    newTaskHeader.addClass('new-task-header clearfix');
    newTaskHeader.append(newTaskH);   // Текст основной цели
    newTaskHeader.append(closeBtn);   // Удаление
    newTaskHeader.append(optionsBtn); // Сворачивание

    // Контейнер с описанием задачи
    var newTaskDescD = $('<div></div>');
    newTaskDescD.addClass('task-description');
    newTaskDescD.text(newTaskDescription);  // Текст описания

    // Контейнер задачи. Содержит хедер и описание
    var newTaskDiv = $('<div></div>');
    newTaskDiv.addClass('task-container');
    newTaskDiv.append(newTaskHeader); // Хедер задачи с элементами управления
    newTaskDiv.append(newTaskDescD);  // Описание задачи

    // Добавление задачи на страницу
    newTaskDiv.appendTo($('#task-list'));

    // Очищение формы
    $('#new-task-name').val('');
    $('#new-task-desc').val('');

    // Предотвращение отправки
    return false;
  });
});
