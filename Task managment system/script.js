const taskForm = document.getElementById('task-form');
const taskTable = document.getElementById('task-table').getElementsByTagName('tbody')[0];

// Fetch and display all tasks
const fetchTasks = async () => {
    try {
        const response = await fetch('http://localhost:3000/tickets');
        if (!response.ok) throw new Error('Failed to fetch tasks');
        const tasks = await response.json();
        displayTasks(tasks);
    } catch (error) {
        alert(error.message);
    }
};

// Display tasks in the table
const displayTasks = (tasks) => {
    taskTable.innerHTML = ''; // Clear the table before displaying new data
    tasks.forEach(task => {
        const row = taskTable.insertRow();
        row.innerHTML = `
            <td>${task.title}</td>
            <td>${task.description}</td>
            <td>${task.status}</td>
            <td>${new Date(task.dueDate).toLocaleString()}</td>
            <td>${task.status === 'Open' ? 'High' : task.status === 'In Progress' ? 'Medium' : 'Low'}</td>
            <td>
                <button onclick="editTask(${task.id})">Edit</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </td>
        `;
    });
};

// Create a new task
taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;
    const dueDate = document.getElementById('task-dueDate').value;
    const status = document.getElementById('task-status').value;

    const newTask = { title, description, dueDate, status };
    try {
        const response = await fetch('http://localhost:3000/tickets', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTask)
        });
        if (!response.ok) throw new Error('Failed to add task');
        fetchTasks(); // Refresh the task list
    } catch (error) {
        alert(error.message);
    }
});

// Edit an existing task
const editTask = async (id) => {
    const title = prompt('Edit task title:');
    const description = prompt('Edit task description:');
    const status = prompt('Edit task status: Open, In Progress, or Closed:');
    const dueDate = prompt('Edit task due date (YYYY-MM-DD):');

    const updatedTask = { title, description, status, dueDate };
    try {
        const response = await fetch(`http://localhost:3000/tickets/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTask)
        });
        if (!response.ok) throw new Error('Failed to update task');
        fetchTasks(); // Refresh the task list
    } catch (error) {
        alert(error.message);
    }
};

// Delete a task
const deleteTask = async (id) => {
    if (confirm('Are you sure you want to delete this task?')) {
        try {
            const response = await fetch(`http://localhost:3000/tickets/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Failed to delete task');
            fetchTasks(); // Refresh the task list
        } catch (error) {
            alert(error.message);
        }
    }
};

// Initial fetch to display tasks on page load
window.onload = fetchTasks;
