const input = document.getElementById("txtTaskName");
const form = document.getElementById("addTaskForm");
const tasklist = document.getElementById("task-list");
const deletebtn = document.getElementById("btnDeleteAll");
form.addEventListener("submit", addItem);


/////Get items from local storage
load()

function load() {
    items = localStorageGet();
    items.forEach(function add2(text) {
            const li = document.createElement('li');
            li.className = 'list-group-item list-group-item-secondary';
            li.textContent = text;
            const a = document.createElement("a");
            a.classList = "delete-item float-right";
            a.setAttribute("href", "#");
            a.innerHTML = '<i class="fas fa-times"></i>';
            li.appendChild(a);
            tasklist.appendChild(li);
        }

    )

}

function localStorageGet() {
    if (localStorage.getItem("items") === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem("items"));
    }
    return items

}

/////////Add new item to list and call set function
form.addEventListener("submit", addItem);

function addItem(e) {
    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-secondary';
    li.textContent = input.value;
    localStorageSet(li.textContent)
    const a = document.createElement("a");
    a.classList = "delete-item float-right";
    a.setAttribute("href", "#");
    a.innerHTML = '<i class="fas fa-times"></i>';
    li.appendChild(a);
    tasklist.appendChild(li);
    e.preventDefault();
    input.value = ""

}

////Set function---add new item to local storage
function localStorageSet(text) {
    items = localStorageGet();
    items.push(text);
    localStorage.setItem("items", JSON.stringify(items));

}


///delete item

tasklist.addEventListener("click", deleteItem);

function deleteItem(e) {
    if (e.target.className === "fas fa-times") {
        e.target.parentElement.parentElement.remove();
        // delete
        let indexDelete = items.indexOf(e.target.parentElement.parentElement.textContent);
        items.splice(indexDelete, 1);
        localStorage.setItem("items", JSON.stringify(items));
    }
}

///delete-all

deletebtn.addEventListener("click", deleteAll)

function deleteAll() {
    if (confirm("are you sure?") === true) {
        while (tasklist.firstChild) {
            tasklist.removeChild(tasklist.firstChild)
        }
        localStorage.clear();
    }
}