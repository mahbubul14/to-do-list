// import _ from 'lodash';
// import './style.css';
const task =[
  {
    description: 'Adding a new item',
    completed: false,
    index: 0,
  },
  {
    description: "Going shop",
    completed: false,
    index: 1,
  },
  {
    description: "Do Exercise",
    completed: false,
    index: 2,
  },
];

function render() {
  task.forEach((tsk) => {
    const { description } = tsk;
const taskInput = document.getElementById('task')
const list = document.getElementById('list')
const addBtn = document.getElementById('addBtn')


  const item = document.createElement('li');
  const itemInput =document.createElement('input');
  const itemText = document.createElement('p');
  itemText.innerHTML = description;
  const threeDot = document.createElement('i');
  threeDot.className = "fas fa-ellipsis-v";
  // itemText.innerHTML = taskInput.value;
  itemInput.setAttribute("type", "checkbox");
  list.appendChild(item);
  item.appendChild(itemInput);
  item.appendChild(itemText);
  item.appendChild(threeDot);
  })
}
render();