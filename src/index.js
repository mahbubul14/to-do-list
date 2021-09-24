import './style.css';
import { isCompleted, isDone } from './status.js';
import {
  add, edit, remove, removeChecked,
} from './addremove.js';

const storage = window.localStorage;
const task = [];
const addBtn = document.getElementById('addBtn');
const clear = document.getElementById('clear');
const form = document.getElementById('form');

function render(taskStorage) {
  taskStorage.forEach((tsk) => {
    const { description } = tsk;
    const list = document.getElementById('list');
    const item = document.createElement('li');
    const checkbox = document.createElement('input');
    const itemText = document.createElement('p');
    // const threeDot = document.createElement('i');
    const removeIcon = document.createElement('i');

    checkbox.setAttribute('type', 'checkbox');
    checkbox.id = 'checkbox';
    checkbox.checked = isDone(task);
    // threeDot.className = 'fas fa-ellipsis-v';
    removeIcon.className = 'far fa-trash-alt';
    removeIcon.id = 'removebtn';
    itemText.innerHTML = description;

    list.appendChild(item);
    item.appendChild(checkbox);
    item.appendChild(itemText);
    // item.appendChild(threeDot);
    item.appendChild(removeIcon);

    removeIcon.addEventListener('click', () => {
      remove(taskStorage, task);
      window.location.reload();
    });

    checkbox.addEventListener('click', () => {
      itemText.style.textDecoration = 'line-through';
      checkbox.addEventListener('click', () => {
        itemText.style.textDecoration = 'none';
      });
      isCompleted(checkbox.checked, tsk);
      storage.setItem('stored', JSON.stringify(taskStorage));
    });

    itemText.addEventListener('click', () => {
      itemText.setAttribute('contenteditable', 'true');
    });

    itemText.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        edit(task, itemText.innerText);
        window.location.reload();
      }
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

addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  add(checkStorage(), document.getElementById('task').value);
  form.reset();
  window.location.reload();
});

clear.addEventListener('click', () => {
  removeChecked(checkStorage());
  window.location.reload();
});

render(checkStorage());
