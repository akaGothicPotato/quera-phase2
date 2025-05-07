document.addEventListener("DOMContentLoaded", () => {
  const todoList = document.getElementById("todo-list");
  const doneList = document.getElementById("done-list");

  // Function: to move a task to the other list and update styling
  function moveTask(listItem, targetList, shouldLineThrough) {
    targetList.appendChild(listItem);
    const taskTitle = listItem.querySelector(".task-title");
    if (taskTitle) {
      taskTitle.classList.toggle("line-through", shouldLineThrough);
    }
  }

  // Event listener: for changes in the To Do list
  todoList.addEventListener("change", function (event) {
    if (event.target.type === "checkbox") {
      const listItem = event.target.closest("li");
      if (event.target.checked) {
        moveTask(listItem, doneList, true);
      }
    }
  });

  // Event listener: for changes in the Done list
  doneList.addEventListener("change", function (event) {
    if (event.target.type === "checkbox") {
      const listItem = event.target.closest("li");
      if (!event.target.checked) {
        moveTask(listItem, todoList, false);
      }
    }
  });
});
