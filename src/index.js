import './styles.css';
import { createTodo, createProject } from './logic.js';
import { saveData, loadData } from './storage.js';
import { renderProjects } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
  let projects = loadData();

  if (projects.length === 0) {
    const defaultProject = createProject('Default');
    defaultProject.addTodo(createTodo('Купить хлеб', '', '2025-01-01', 'high'));
    projects.push(defaultProject);
    saveData(projects);
  }

  renderProjects(projects);

  const addProjectBtn = document.getElementById('btn-new-project');
  const addTaskBtn = document.getElementById('btn-new-task');

  addProjectBtn.addEventListener('click', () => {
    const input = document.getElementById('new-project-name');
    const name = input.value.trim();
    if (!name) return;
    const newProject = createProject(name);
    projects.push(newProject);
    input.value = '';
    saveData(projects);
    renderProjects(projects);
  });

  addTaskBtn.addEventListener('click', () => {
    const title = document.getElementById('new-task-title').value.trim();
    if (!title) return;
    const description = document.getElementById('new-task-desc').value.trim();
    const dueDate = document.getElementById('new-task-due').value;
    const priority = document.getElementById('new-task-priority').value;
    const projectIndex = parseInt(document.getElementById('task-project-select').value);

    const newTodo = createTodo(title, description, dueDate, priority);
    projects[projectIndex].addTodo(newTodo);

    // Сброс полей
    document.getElementById('new-task-title').value = '';
    document.getElementById('new-task-desc').value = '';
    document.getElementById('new-task-due').value = '';

    saveData(projects);
    renderProjects(projects, projectIndex);
  });
});
