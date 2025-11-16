import { createProject, createTodo } from './logic.js';

function saveData(projects) {
  localStorage.setItem('projects', JSON.stringify(projects));
}

function loadData() {
  const data = localStorage.getItem('projects');
  if (!data) return [];

  const projectsData = JSON.parse(data);
  return projectsData.map(p => {
    const proj = createProject(p.name);
    proj.todos = p.todos.map(t => {
      const todo = createTodo(t.title, t.description, t.dueDate, t.priority);
      todo.completed = t.completed || false;
      return todo;
    });
    return proj;
  });
}

export { saveData, loadData };
