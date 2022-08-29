export function getTasks(task) {
    return fetch('http://localhost:4000/tasks', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    }).then(response => response.json())
}

export function addTask(task) {
    return fetch('http://localhost:4000/tasks', {
        method: 'POST',
        headers:  {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })
        .then(response => response.json())
}

export function deleteTask(taskId) {
    return fetch('http://localhost:4000/tasks/' + taskId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

export function updateTask(task) {
    return fetch('http://localhost:4000/tasks/' + task.id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })
}