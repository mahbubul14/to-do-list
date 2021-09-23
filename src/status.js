export function isDone(task) {
  return !!task.completed;
}

export function isCompleted(box, task) {
  task.completed = box;
}