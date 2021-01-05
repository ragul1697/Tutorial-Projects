// UI Variables
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');

// Load Event listener
loadEventListeners();

function loadEventListeners() {
  // DOM Load Event
  document.addEventListener('DOMContentLoaded', displayTasks);

  // Creating the Eventlistener to Submit button
  form.addEventListener('submit', addTasks);

  // Remove the tasks
  taskList.addEventListener('click', removeTask);


  // Clear all tasks
  clearBtn.addEventListener('click', clearTask);

  // Filter the tasks
  filter.addEventListener('keyup', filterTasks)
}

// Add task function
function addTasks(e) {
  if (taskInput.value === '') {
    alert('Enter a task');
  }
  // Create li element dynamically
  const li = document.createElement('li');
  // Add Class to li
  li.className = 'collection-item';
  // Append "Task Input Value" to li element
  li.appendChild(document.createTextNode(taskInput.value));

  // Create a tag to delete tasks
  const link = document.createElement('a');
  // Add class to "a" tag
  link.className = 'delete-item secondary-content';
  // Add icon to "a" tag
  link.innerHTML = '<i class = "fa fa-remove"></i>';
  // Append "a" tag to li element
  li.appendChild(link);


  // Append li to ul 
  taskList.appendChild(li);

  // Store to Local Storage
  storeTaskInLocalStorage(taskInput.value);

  // Clearing Task Input field
  taskInput.value = "";

  e.preventDefault();
}


// Remove Tasks
function removeTask(e) {

  if (e.target.parentElement.classList.contains('delete-item')) {

    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();

      // Remove Tasks from Local Storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Clear Tasks
function clearTask(e) {
  // using innerHTML 
  // taskList.innerHTML = '';

  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // Clear Tasks from Local Storage
  clearTasksFromLocalStorage();
}

// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(
    function (task) {

      const item = task.firstChild.textContent;

      if (item.toLowerCase().indexOf(text) != -1) {
        task.style.display = "block";
      }

      else {
        task.style.display = "none";
      }


    }
  );
}

// LOCAL STORAGE Functions

// Get Tasks from Local Storage
function displayTasks() {
  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  }

  else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task) {

    // Create li element dynamically
    const li = document.createElement('li');
    // Add Class to li
    li.className = 'collection-item';
    // Append "Task Input Value" to li element
    li.appendChild(document.createTextNode(task));

    // Create a tag to delete tasks
    const link = document.createElement('a');
    // Add class to "a" tag
    link.className = 'delete-item secondary-content';
    // Add icon to "a" tag
    link.innerHTML = '<i class = "fa fa-remove"></i>';
    // Append "a" tag to li element
    li.appendChild(link);


    // Append li to ul 
    taskList.appendChild(li);
  });
}


// Store Task to Local Storage

function storeTaskInLocalStorage(task) {
  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  }

  else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Tasks
function removeTaskFromLocalStorage(taskItem) {
  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  }

  else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks
function clearTasksFromLocalStorage() {
  localStorage.clear();
}