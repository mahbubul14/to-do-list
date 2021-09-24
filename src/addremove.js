export const add = (tasks, description) => {
  tasks.push({ description, completed: false, index: tasks.length + 1 });
  window.localStorage.setItem('stored', JSON.stringify(tasks));
};

export const updateIndex = (tasks) => {
  tasks.forEach((task) => {
    task.index = tasks.indexOf(task) + 1;
  });
  window.localStorage.setItem('stored', JSON.stringify(tasks));
};

export const remove = (tasks, taskToRemove) => {
  tasks = tasks.filter((task) => task.index !== taskToRemove.index);
  updateIndex(tasks);
};

export const removeChecked = (tasks) => {
  tasks = tasks.filter((task) => task.completed === false);
  updateIndex(tasks);
};

export const edit = (task, description) => {
  const tasks = JSON.parse(window.localStorage.getItem('stored'));
  tasks[task.index - 1].description = description;
  window.localStorage.setItem('stored', JSON.stringify(tasks));
};