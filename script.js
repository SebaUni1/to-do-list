const taskForm = document.querySelector('#task-form');
const taskInput = document.querySelector('#task-input');
const taskList = document.querySelector('#task-list');
const emptyState = document.querySelector('#empty-state');
const taskCount = document.querySelector('#task-count');

// Keep the current tasks in memory while the page is open.
const tasks = [];

function updateTaskSummary() {
  const remainingTasks = tasks.filter((task) => !task.completed).length;
  const taskWord = remainingTasks === 1 ? 'task' : 'tasks';

  taskCount.textContent = `${remainingTasks} ${taskWord} remaining`;
  emptyState.hidden = tasks.length > 0;
}

function createTaskElement(task) {
  const listItem = document.createElement('li');
  listItem.className = 'task-item';
  listItem.dataset.taskId = task.id;

  const checkbox = document.createElement('input');
  checkbox.className = 'task-checkbox';
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  checkbox.setAttribute('aria-label', `Mark "${task.text}" as complete`);

  const taskText = document.createElement('span');
  taskText.className = 'task-text';
  taskText.textContent = task.text;

  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete-button';
  deleteButton.type = 'button';
  deleteButton.textContent = 'Delete';
  deleteButton.setAttribute('aria-label', `Delete "${task.text}"`);

  if (task.completed) {
    listItem.classList.add('completed');
  }

  // Update only the selected task when its checkbox changes.
  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked;
    listItem.classList.toggle('completed', task.completed);
    updateTaskSummary();
  });

  // Remove only the task associated with this row.
  deleteButton.addEventListener('click', () => {
    const taskIndex = tasks.findIndex((item) => item.id === task.id);
    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);
      listItem.remove();
      updateTaskSummary();
    }
  });

  listItem.append(checkbox, taskText, deleteButton);
  return listItem;
}

function addTask() {
  const taskText = taskInput.value.trim();

  if (!taskText) {
    taskInput.focus();
    return;
  }

  const task = {
    id: Date.now() + Math.random(),
    text: taskText,
    completed: false
  };

  tasks.push(task);
  taskList.appendChild(createTaskElement(task));
  taskInput.value = '';
  updateTaskSummary();
  taskInput.focus();
}

taskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  addTask();
});

updateTaskSummary();
