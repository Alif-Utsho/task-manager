import '../styles/index.scss'

const $ = selector => {
    return document.querySelector(selector);
}

let taskField = $('#input')
let addBtn = $('#btn')
let list = $('#list-root')
let allTask = $('#allTask')
let inputValue = ''

taskField.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        
        if (event.target.value === "") {
            alert('Task cannot be empty')
        } else {
            //addList(list, event.target.value);
            addTask(allTask, event.target.value)
            
            event.target.value = ""
        }
    }
    inputValue = event.target.value
})

addBtn.addEventListener('click', (event) => {
console.log(inputValue);
    if (inputValue === "") {
        alert('Task cannot be empty')
    } else {
        //addList(inputValue, inputValue); 
        addTask(allTask, inputValue)
    }
})

const addTask = (parent, task) => {
    let col = document.createElement('div')
    col.className = 'col-sm-3'
    
    let singleTask = document.createElement('div')
    singleTask.className = 'single-task d-flex'
    
    let p = document.createElement('p')
    p.innerHTML = task
    singleTask.appendChild(p)

    let crossBtn = createCrossButton()
    singleTask.appendChild(crossBtn)
    crossBtn.addEventListener('click', () => {
        parent.removeChild(col)
    })
    singleTask.addEventListener('mouseenter', () => {
        crossBtn.style.visibility = 'visible'
    })
    singleTask.addEventListener('mouseleave', () => {
        crossBtn.style.visibility = 'hidden'
    })

    let controlPanel = createControlPanel(singleTask);
    singleTask.appendChild(controlPanel)
    singleTask.onmouseenter = () => {
        controlPanel.style.visibility='visible'
    }
    singleTask.onmouseleave = () => {
        controlPanel.style.visibility = 'hidden'
    }
    
    col.appendChild(singleTask)
    parent.appendChild(col)
}

const createControlPanel = (parent) => {
    let cp = document.createElement('div')
    cp.className = 'task-control-panel align-items-center'
    cp.style.visibility = 'hidden'
    
    let colorBar = createColorBar(parent)
    cp.appendChild(colorBar)
    
    return cp
}

const createColorBar = (parent) => {
    let colors = ['red', 'green', 'grey', 'blue', 'violet', 'skyblue', 'palegreen']
    let colorDiv = document.createElement('div')
    colorDiv.className = 'd-flex'
    
    colors.forEach(color => {
        let div = document.createElement('div')
        div.className = 'color-circle mx-1'
        div.style.background = color
        div.style.cursor = 'pointer'
        div.addEventListener('click', () => {
            parent.style.background = color
        })
        colorDiv.appendChild(div)
    })

    return colorDiv
}

const createCrossButton = () => {
    let button = document.createElement('span')
    button.innerHTML = `<i class="fas fa-times-circle"></i>`
    button.className = 'ms-auto'
    button.style.cursor = 'pointer'
    button.style.visibility = 'hidden'

    return button;
}

const addList = (list, value) => {
    let li = document.createElement('li')
    li.className = 'list-group-item bg-dark d-flex'
    li.innerHTML = value

    let span = document.createElement('span')
    span.innerHTML = 'X'
    span.className = 'ms-auto '
    span.style.color = 'white'
    span.style.cursor = 'pointer'
    span.style.visibility= 'hidden'
    
    li.appendChild(span)

    span.addEventListener('click', () => {
        list.removeChild(li)
    })

    li.addEventListener('mouseenter', () => {
        span.style.visibility = 'visible'
        li.classList.remove('bg-dark')
        li.style.background = 'gray'
    })

    li.addEventListener('mouseleave', () => {
        span.style.visibility = 'hidden'
        li.classList.add('bg-dark');
    })

    list.appendChild(li)
}
