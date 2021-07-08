let listTask = [];
let input = document.querySelector("#newTask");

function getLocalListItem() {
    if (localStorage.getItem('listTaskLocal')) {
        return JSON.parse(localStorage.getItem('listTaskLocal'));
    } else {
        return -1;
    }
}

renderTask()

function renderTask() {
    if (getLocalListItem() === -1) {
        return;
    } else {
        listTask = getLocalListItem();
    }

    let listTaskCompleted = listTask.filter(item => item.status === true);
    let listTaskTodo = listTask.filter(item => item.status === false);

    let contentCompleted = createContent(listTaskCompleted, true);
    let contentTodo = createContent(listTaskTodo, false);

    document.querySelector("#completed").innerHTML = contentCompleted;
    document.querySelector("#todo").innerHTML = contentTodo;
}

function createContent(arr, isCompleted) {
    let content = ''
    if (isCompleted) {
        arr.forEach(item => {
            content += `
            <li>
                <span>${item.name}</span>
                <div class="buttons d-flex flex-row-reverse">
                    <button onclick="deleteTask(${item.id})">
                        <i class="remove fa fa-trash-alt"></i>
                    </button>

                    <button class="complete" onclick="changeStatus(${item.id})">
                        <i class="fas fa-check-circle"></i>
                    </button>
                </div>
            </li>    
        `
        })
        return content;
    } else {
        arr.forEach(item => {
            content += ` 
                <li>
                    <span>${item.name}</span>
                    <div class="buttons d-flex flex-row-reverse">
                        <button onclick="deleteTask(${item.id})">
                            <i class="remove fa fa-trash-alt"></i>
                        </button>

                        <button class="complete" onclick="changeStatus(${item.id})">
                            <i class="far fa-check-circle"></i>
                        </button>
                    </div>
                </li>
            `
        })
        return content;
    }
}

function changeStatus(id) {
    var result = confirm('Do you want to change status this item?');
    if (result) {
        let itemChange = listTask.find(item => item.id == id);
        itemChange.status = !itemChange.status;
        localStorage.setItem("listTaskLocal", JSON.stringify(listTask));
        renderTask();
        alert('Change status successfully!')
    }

}

function deleteTask(id) {
    var result = confirm('Do you want to delete this item?');
    if (result) {
        listTask = listTask.filter(item => item.id != id);
        localStorage.setItem("listTaskLocal", JSON.stringify(listTask));
        renderTask();
        alert('Deleted successfully!')
    }
}

document.querySelector("#addItem").addEventListener("click", () => {
    var isEmpty = input.value === '';
    var isExisted = listTask.find(item => item.name === input.value);

    //check empty
    if (isEmpty) {
        //notify
        notiInput.innerHTML = 'You have nothing to-do!'
        notiInput.style.display = 'block';
        return;
    }

    //check existed
    if (isExisted) {
        notiInput.innerHTML = 'You have yet to complete any tasks.'
        notiInput.style.display = 'block';
        return;
    }

    addTask()
})

function addTask() {
    let newTask = new Task(input.value);
    listTask.push(newTask);
    localStorage.setItem("listTaskLocal", JSON.stringify(listTask));
    renderTask();
    alert('Added successfully!');
    input.value = '';

}

input.addEventListener('input', function () {
    var isEmpty = this.value === '';
    var isExisted = listTask.find(item => item.name === input.value);

    //check empty
    if (isEmpty) {
        //notify
        notiInput.innerHTML = 'You have nothing to-do!'
        notiInput.style.display = 'block';
        return;
    }

    notiInput.innerHTML = ''
    notiInput.style.display = 'none';

    //check existed
    if (isExisted) {
        notiInput.innerHTML = 'You have yet to complete any tasks.'
        notiInput.style.display = 'block';
        return;
    }

    notiInput.innerHTML = ''
    notiInput.style.display = 'none';
});

renderTask();