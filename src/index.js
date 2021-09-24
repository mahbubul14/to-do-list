import './style.css';
import { isCompleted, isDone } from './status.js';
import {
  add, edit, remove, removeChecked,
} from './addremove.js'

const storage = window.localStorage;
const task = [];
const addBtn = document.getElementById('addBtn')
const clearBtn = document.getElementById('clearBtn')
const list = document.getElementById('list')

function render(taskStorage) {
  taskStorage.forEach((tsk) => {
    const { description } = tsk;
    const list = document.getElementById('list');
    const item = document.createElement('li');
    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.checked = isDone(tsk);
    const itemText = document.createElement('p');
    const threeDot = document.createElement('i');
    threeDot.className = 'fas fa-ellipsis-v';
    itemText.innerHTML = description;
    list.appendChild(item);
    item.appendChild(checkBox);
    item.appendChild(itemText);
    item.appendChild(threeDot);
    checkBox.addEventListener('click', () => {
      isCompleted(checkBox.checked, tsk);
      storage.setItem('stored', JSON.stringify(taskStorage));
    });
  });
}
function checkStorage() {
  const taskStorage = JSON.parse(storage.getItem('stored'));
  if (taskStorage === null) {
    storage.setItem('stored', JSON.stringify(task));
    return JSON.parse(storage.getItem('stored'));
  }
  return taskStorage;
}
render(checkStorage());
