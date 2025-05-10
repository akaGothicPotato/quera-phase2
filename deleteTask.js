document.addEventListener("DOMContentLoaded", () => {
  const todoList = document.getElementById("todo-list");
  const doneList = document.getElementById("done-list");

  // Function: to move a task to the other list and update styling
  function moveTask(listItem, targetList, shouldLineThrough) {
    targetList.appendChild(listItem);
    const taskTitle = listItem.querySelector("#task-title");
    const priorityDiv = listItem.querySelector("#priority");
    const descriptionParagraph = listItem.querySelector("#description");

    if (taskTitle) {
      taskTitle.classList.toggle("line-through", shouldLineThrough);
    }

    // Hide priority and description if moving to Done, show if moving back to To Do
    if (targetList === doneList) {
      if (priorityDiv) {
        priorityDiv.style.display = "none";
      }
      if (descriptionParagraph) {
        descriptionParagraph.style.display = "none";
      }
    } else {
      if (priorityDiv) {
        priorityDiv.style.display = "";
      }
      if (descriptionParagraph) {
        descriptionParagraph.style.display = "";
      }
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
