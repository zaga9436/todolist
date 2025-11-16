function renderProjects(projects, currentIndex = 0) {
  const projectList = document.getElementById('projects-list');
  const projectSelect = document.getElementById('task-project-select');

  projectList.innerHTML = '';
  projectSelect.innerHTML = '';

  projects.forEach((project, index) => {
    const li = document.createElement('li');
    li.textContent = project.name;
    li.dataset.index = index;

    li.addEventListener('click', () => {
      document.getElementById('current-project-name').textContent = project.name;
      renderTasks(project.todos);
    });

    projectList.appendChild(li);

    const option = document.createElement('option');
    option.value = index;
    option.textContent = project.name;
    projectSelect.appendChild(option);
  });

  // Показываем задачи текущего проекта
  renderTasks(projects[currentIndex].todos);
}

function renderTasks(todos) {
  const taskList = document.getElementById('tasks-list');
  taskList.innerHTML = '';

  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.textContent = `${todo.title} [${todo.priority}] ${todo.completed ? '✔️' : ''}`;
    li.style.color = todo.priority === 'high' ? 'var(--high)' :
                     todo.priority === 'medium' ? 'var(--medium)' : 'var(--low)';

    // Переключение состояния выполнено/не выполнено
    li.addEventListener('click', () => {
      todo.toggleCompleted();
      renderTasks(todos);
    });

    // Кнопка удалить
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Удалить';
    delBtn.addEventListener('click', e => {
      e.stopPropagation();
      todos.splice(index, 1);
      renderTasks(todos);
    });
    li.appendChild(delBtn);

    taskList.appendChild(li);
  });
}

export { renderProjects, renderTasks };
