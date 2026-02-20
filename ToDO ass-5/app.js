const taskNameInput = document.getElementById('taskNameInput');
const taskDueTimeInput = document.getElementById('taskDueTimeInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskListContainer = document.getElementById('taskListContainer');

addTaskButton.addEventListener('click', () => {
    const taskName = taskNameInput.value.trim();
    const taskDueTime = taskDueTimeInput.value;

    if (!taskName || !taskDueTime) {
        alert("Please enter both task name and due time!");
        return;
    }

    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
        <span class="taskText">${taskName} - ${taskDueTime}</span>
        <div>
            <button class="editTaskButton">Edit</button>
            <button class="deleteTaskButton">Delete</button>
        </div>
    `;

    const deleteButton = taskItem.querySelector('.deleteTaskButton');
    deleteButton.addEventListener('click', () => {
        taskItem.remove();
    });

    const editButton = taskItem.querySelector('.editTaskButton');
    editButton.addEventListener('click', () => {
        const newTaskName = prompt("Edit task:", taskName);
        if (newTaskName !== null && newTaskName.trim() !== "") {
            taskItem.querySelector('.taskText').textContent = `${newTaskName.trim()} - ${taskDueTime}`;
        }
    });

    taskListContainer.appendChild(taskItem);

    taskNameInput.value = '';
    taskDueTimeInput.value = '';

    const taskTimer = setInterval(() => {
        const now = new Date();
        const [dueHour, dueMinute] = taskDueTime.split(':').map(Number);

        if (now.getHours() === dueHour && now.getMinutes() === dueMinute) {
            taskItem.classList.add('highlight');
            alert(`Task due now: ${taskName}`);
            clearInterval(taskTimer);
        }
    }, 1000);
});