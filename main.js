let addButton = document.getElementById("add-button");
let taskInput = document.getElementById("task-input");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let mode = 'all';
let filterList = [];
let underline = document.getElementById("under-line");

addButton.addEventListener("mousedown", addTask);
taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask(event)
    }
})
console.log(tabs);

for(let i=1;i<tabs.length;i++) {
    tabs[i].addEventListener("click", function (event) {
        filter(event)
    })
}

function addTask() {
    if(taskInput.value === "") return alert("할일을 입력해주세요");
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false,
    };
    taskList.push(task);
    taskInput.value = "";
    filter();
}

function render() {
    let list=[];
    if(mode === "all") {
        list = taskList;
    } else if(mode === "ongoing" || mode === "done") {
        list = filterList
    }

    let resultHTML = "" ;
    for(let i=0;i<list.length;i++){
        if(list[i].isComplete == true) {
            resultHTML += `
            <div class="task">
                <div class="task-done">${list[i].taskContent}</div>
                <div>
                    <button onclick="toggleComplete('${list[i].id}')">Check</button>
                    <button onclick="deleteTask('${list[i].id}')">Delete</button>
                </div>
            </div>`
        } else {
            resultHTML += `
            <div class="task">
                <div>${list[i]["taskContent"]}</div>
                <div>
                    <button onclick="toggleComplete('${list[i].id}')">Check</button>
                    <button onclick="deleteTask('${list[i].id}')">Delete</button>
                </div>
            </div>`
        }
    }
    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
    for(let i=0;i<taskList.length;i++) {
        if(taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    filter();
}

function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function deleteTask(id) {
    for(let i=0;i<taskList.length;i++) {
        if(taskList[i].id == id) {
            taskList.splice(i,1);
            break;
        }
    }
    // taskList = taskList.filter(item => item.id != id);
    
    filter();
}

function filter(event) {
    if(event) {
        mode = event.target.id
        underline.style.left = event.target.offsetLeft + "px";
        underline.style.width = event.target.offsetWidth + "px";
        underline.style.top = event.target.offsetTop + (event.target.offsetHeight - 4) + "px";
    }
    
    filterList = [];
    if (mode === "ongoing") {
        for(let i=0;i<taskList.length;i++) {
            if(taskList[i].isComplete === false) {
                filterList.push(taskList[i]);
            }
        }
    } else if(mode === "done") {
        for(let i=0;i<taskList.length;i++) {
            if(taskList[i].isComplete === true) {
                filterList.push(taskList[i]);
            }
        }
        
    }
    render();
}