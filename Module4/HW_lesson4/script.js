$(function() {
  // Функция, вставляющая tool tip с информацией о пустом списке дел
  function addEmptyList() {
    $('#task-list').append('<p class="tips empty-list">Список пуст...</p>');
  }

  // При загрузке страницы список дел пустой
  addEmptyList();

  // Событие добавления задачи в список дел
  $('#add-task').click(function() {
    // Заголовок дела из инпута
    const newTaskTitle = $('#new-task-name').val();
    // Описание дела из инпута
    const newTaskDescription = $('#new-task-desc').val();

    // Проверка непустого заголовка
    if (newTaskTitle.length) {
      $('#new-task-name').removeClass('error');
      $('#new-task-desc').removeClass('error');
    } else {
      $('#new-task-name').addClass('error');
      $('#new-task-desc').addClass('error');
      return false;
    }

    // Удаление tool tip'а о пустом списке дел
    if ($('.empty-list')) {
      $('.empty-list').remove();
    }

    // "Кнопка" удаления всего контейнера
    const closeBtn = $('<button class="close-btn"></button>');
    closeBtn.click(function() {
      $(this)
        .parent()
        .parent()
        .remove();
      // Если удаленный элемент был последний, добавляется
      // tool tip с пометкой, что список пуст
      if (!$('.task-container').length) {
        addEmptyList();
      }
    });

    // "Кнопка", скрывающая описание задания
    const optionsBtn = $('<button class="options-btn"></button>');
    optionsBtn.click(function() {
      // Триггер появления/исчезновения описания
      $(this)
        .parent()
        .parent()
        .children('.task-description')
        .slideToggle('slow');

      // Поворот стрелки
      $(this).toggleClass('rotated');
    });

    // Хедер контейнера задачи. Содержит текст задачи и кнопки
    // удаления задачи и сворачивания описания
    const newTaskHeader = $(`
      <div class="new-task-header clearfix">
        <h3>${newTaskTitle}</h3>
      </div>
    `);
    newTaskHeader.append(closeBtn); // Удаление
    newTaskHeader.append(optionsBtn); // Сворачивание

    // Контейнер задачи. Содержит хедер и описание
    const newTaskDiv = $('<div class="task-container"></div>');
    newTaskDiv.append(newTaskHeader); // Хедер задачи с элементами управления
    newTaskDiv.append(`
      <div class="task-description">${newTaskDescription}</div>
    `); // Описание задачи

    // Добавление задачи на страницу
    newTaskDiv.appendTo($('#task-list'));

    // Очищение формы
    $('#new-task-name').val('');
    $('#new-task-desc').val('');

    // Предотвращение отправки
    return false;
  });
});
