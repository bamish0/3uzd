document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const clearTasksBtn = document.getElementById('clear-tasks');

    // Ielādējam uzdevumus no localStorage, ja tie ir saglabāti
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Attēlojam esošos uzdevumus no localStorage
    function displayTasks() {
        taskList.innerHTML = '';
        tasks.forEach(function(task, index) {
            const li = document.createElement('li');
            li.textContent = task;
            li.setAttribute('data-index', index); // Saglabājam indeksu datu atribūtā
            taskList.appendChild(li);
        });
    }

    // Pievienojam uzdevumu
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            tasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            displayTasks();
            taskInput.value = '';
        } else {
            alert('Lūdzu, ievadiet uzdevumu!');
        }
    });

    // Nodzēšam uzdevumu
    taskList.addEventListener('click', function(e) {
        if (e.target.tagName === 'LI') {
            const index = e.target.getAttribute('data-index');
            tasks.splice(index, 1); // Nodzēšam uzdevumu no masīva
            localStorage.setItem('tasks', JSON.stringify(tasks));
            displayTasks();
        }
    });

    // Notīrīt visus uzdevumus
    clearTasksBtn.addEventListener('click', function() {
        tasks = []; // Izdzēšam visus uzdevumus no masīva
        localStorage.removeItem('tasks'); // Noņemam uzdevumus no localStorage
        displayTasks();
    });

    // Attēlojam sākotnējos uzdevumus, kad lapa ir ielādēta
    displayTasks();
});
