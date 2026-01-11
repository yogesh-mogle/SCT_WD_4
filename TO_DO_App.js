const taskInput = document.getElementById('task-input');
const taskDate = document.getElementById('task-date');
const taskTime = document.getElementById('task-time');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// get/load the tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
renderTasks();

addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    const date = taskDate.value;
    const time = taskTime.value;

    if (!taskText) {
        alert('Please enter a task');
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        date,
        time,
        completed: false
    };

    tasks.push(task);
    saveTasks();
    renderTasks();
    taskInput.value = '';
    taskDate.value = '';
    taskTime.value = '';
});

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';

        li.innerHTML = `
            <div class="task-info">
                <span>${task.text}</span>
                <small>${task.date ? task.date : ''} ${task.time ? task.time : ''}</small>
            </div>
            <div class="task-buttons">
                <button class="complete">${task.completed ? 'Undo' : 'Complete'}</button>
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </div>
        `;

        // for Complete button
        li.querySelector('.complete').addEventListener('click', () => {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        });

        // for  Edit button
        li.querySelector('.edit').addEventListener('click', () => {
            taskInput.value = task.text;
            taskDate.value = task.date;
            taskTime.value = task.time;
            tasks = tasks.filter(t => t.id !== task.id);
            saveTasks();
            renderTasks();
        });

        // for Delete button
        li.querySelector('.delete').addEventListener('click', () => {
            tasks = tasks.filter(t => t.id !== task.id);
            saveTasks();
            renderTasks();
        });

        taskList.appendChild(li);
    });
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
