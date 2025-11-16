function createProject(name) {
  return {
    name,
    todos: [],
    addTodo(todo) {
      this.todos.push(todo);
    }
  };
}

function createTodo(title, description, dueDate, priority) {
  return {
    title,
    description,
    dueDate,
    priority,
    completed: false,
    toggleCompleted() {
      this.completed = !this.completed;
    }
  };
}

export { createProject, createTodo };
