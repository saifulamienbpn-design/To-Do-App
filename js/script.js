const taskInput = document.getElementById('task-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const taskTable = document.getElementById('task-table');
const deleteAllBtn = document.getElementById('delete-all-btn');

let tasks = [];

function renderTasks() {
  taskTable.innerHTML = '';

  if (tasks.length === 0) {
    const row = taskTable.insertRow();
    const cell = row.insertCell(0);
    cell.colSpan = 4;
    cell.innerText = 'No task found';
    return;
  }

  tasks.forEach((task, index) => {
    const row = taskTable.insertRow();

    row.insertCell(0).innerText = task.text;
    row.insertCell(1).innerText = task.date || '-';
    row.insertCell(2).innerText = task.completed ? 'Done' : 'Pending';

    const actionCell = row.insertCell(3);
    
    const completeBtn = document.createElement('button');
    completeBtn.innerText = '✔';
    completeBtn.className = 'btn-complete';
    completeBtn.onclick = () => toggleComplete(index);
    
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = '✖';
    deleteBtn.className = 'btn-delete';
    deleteBtn.onclick = () => deleteTask(index);

    actionCell.appendChild(completeBtn);
    actionCell.appendChild(deleteBtn);
  });
}

function addTask() {
  const text = taskInput.value.trim();
  const date = dateInput.value;

  if (text === '') {
    alert('Please enter a task');
    return;
  }

  tasks.push({ text, date, completed: false });
  taskInput.value = '';
  dateInput.value = '';
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

addBtn.addEventListener('click', addTask);
deleteAllBtn.addEventListener('click', () => {
  if (confirm("Are you sure you want to delete all tasks?")) {
    tasks = [];
    renderTasks();
  }
});

renderTasks();