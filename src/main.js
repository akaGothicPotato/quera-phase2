// functions will be added here
class Task {
  constructor(taskName, taskDescription, taskTag) {
    this.taskName = taskName;
    this.taskDescription = taskDescription;
    this.taskTag = taskTag;
  }

  addTask() {
    const taskElement = document.createElement("div");
    taskElement.className = `${this.taskTag}`;
    taskElement.innerHTML = `
    <div>
        <h3>${this.taskName}</h3>
        <p>${this.taskDescription}</p>
    </div>
    <div class="task-actions">
        <button class="edit-btn"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1" stroke="#5C5F61" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="m16 5 3 3m1.385-1.415a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3z" stroke="#5C5F61" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <button class="delete-btn"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 7h16M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3m-5 5 4 4m0-4-4 4" stroke="#5C5F61" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <input type="checkbox" class="task-checkbox" ${
          this.isCompleted ? "checked" : ""
        }>
    </div>`;
  }

  // creatTask(){

  // }

  // editTask(){

  // }

  // removeTask(){

  // }

  // completedTask(){
  //     document.getElementById(primarybtn)

  // }
}
