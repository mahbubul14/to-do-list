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

const render = (taskStorage) => {
  taskStorage.forEach((task) => {
    const { description } = task;
    const list = document.getElementById('list');
    const item = document.createElement('li');
    const checkbox = document.createElement('input');
    const itemText = document.createElement('p');
    const removeIcon = document.createElement('i');

    checkbox.setAttribute('type', 'checkbox');
    checkbox.checked = isDone(task);
    removeIcon.className = 'far fa-trash-alt';
    itemText.innerHTML = description;

    list.appendChild(item);
    item.appendChild(checkbox);
    item.appendChild(itemText);
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
      isCompleted(checkbox.checked, task);
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
};

const checkStorage = () => {
  const taskStorage = JSON.parse(storage.getItem('stored'));
  if (taskStorage === null) {
    storage.setItem('stored', JSON.stringify(task));
    return JSON.parse(storage.getItem('stored'));
  }
  return taskStorage;
};

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
