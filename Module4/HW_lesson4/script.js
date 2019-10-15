$(function() {
  const initialState = () => {
    if (localStorage.getItem('tasks') == null) {
      $('.empty-list').show();
    } else {
      $('.empty-list').hide();
      $('#task-list').html(localStorage.getItem('tasks'));
    }
  };

  initialState();

  const addToStorage = () => {
    let content = $('#task-list').html();

    localStorage.setItem('tasks', content);
  };

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
      $('.empty-list').hide();
    }

    // Контейнер задачи. Содержит хедер и описание
    const newTaskDiv = $(`
      <div class="task-container">
        <div class="new-task-header clearfix">
          <h3>${newTaskTitle}</h3>
          <button class="close-btn"></button>
          <button class="options-btn"></button>
        </div>
        <div class="task-description">${newTaskDescription}</div>
      </div>
    `);

    // Добавление задачи на страницу
    newTaskDiv.appendTo($('#task-list'));

    // Очищение формы
    $('#new-task-name').val('');
    $('#new-task-desc').val('');

    addToStorage();

    // Предотвращение отправки
    return false;
  });

  $('body').on('click', '.close-btn', function() {
    $(this)
      .parents('.task-container')
      .remove();

    if (!$('.task-container').length) {
      $('.empty-list').show();
      localStorage.removeItem('tasks');
    }

    addToStorage();
  });

  $('body').on('click', '.options-btn', function() {
    $(this)
      .parents('.task-container')
      .children('.task-description')
      .slideToggle('slow');

    $(this).toggleClass('rotated');
  });
});
