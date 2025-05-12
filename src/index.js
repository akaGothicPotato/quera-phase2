// Imports
import { getFormattedPersianDate } from "./formatDate.js";
import { renderDateToElements } from "./renderDate.js";

// DOM Elements
const trigram = document.getElementById("trigram");
const closeBtn = document.getElementById("closeNav");
const navWrapper = document.getElementById("nav-wrapper");
const body = document.body;
const html = document.querySelector("html");
const htmlClasses = html.classList;
const darkMode = document.getElementById("themeing");
const createTaskBtn = document.getElementById("createTaskBtn");
const form = document.getElementById("taskForm");
const closeAdd = document.getElementById("close-add");
const tagContainer = document.getElementById("tag-container");
const tags = document.getElementById("addTags");
const colorTags = document.querySelectorAll(".color-tag");
const tasksContainer = document.getElementById("tasksContainer");
const doneTasksContainer = document.getElementById("doneTasksContainer");
const doneTasksCount = document.getElementById("doneTasksCount");
const tasksCount = document.getElementById("tasksCount");
const Artboard = document.getElementById("Artboard");
const taskNameInput = document.getElementById("taskName");
const taskDescInput = document.getElementById("taskDescription");

// Edit tracking
let editingTaskElement = null;

// Local Storage Keys
const TASKS_STORAGE_KEY = "persian_todo_tasks";
const DONE_TASKS_STORAGE_KEY = "persian_todo_done_tasks";
const SELECTED_TAG_STORAGE_KEY = "persian_todo_selected_tag";

// Initialize selected tag
let selectedTag = localStorage.getItem(SELECTED_TAG_STORAGE_KEY) || "high";

// Functions

function openNav() {
  navWrapper.classList.remove("max-md:hidden");
  navWrapper.classList.add("max-md:fixed");
  body.classList.add("overflow-hidden");
}

function closeNav() {
  navWrapper.classList.remove("max-md:fixed");
  navWrapper.classList.add("max-md:hidden");
  body.classList.remove("overflow-hidden");
}

function updateTaskCount() {
  const formattedCount = tasksContainer.childElementCount
    .toString()
    .replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  tasksCount.textContent = `${formattedCount} تسک را باید انجام دهید.`;
}

function updateDoneTaskCount() {
  const formattedCount = doneTasksContainer.childElementCount
    .toString()
    .replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  doneTasksCount.textContent = `${formattedCount} تسک را باید انجام دهید.`;
}

function getTagInfo(tag) {
  switch (tag) {
    case "low":
      return {
        bgColorClass: "bg-bg-low",
        textColorClass: "text-low",
        text: "پایین",
        barColorClass: "bg-low",
      };
    case "medium":
      return {
        bgColorClass: "bg-bg-medium",
        textColorClass: "text-medium",
        text: "متوسط",
        barColorClass: "bg-medium",
      };
    case "high":
    default:
      return {
        bgColorClass: "bg-bg-high",
        textColorClass: "text-high",
        text: "بالا",
        barColorClass: "bg-high",
      };
  }
}

function buildTaskHTML(name, description, tagInfo, taskId) {
  return `
    <div class="relative mb-4 border border-Neutral-250 rounded-xl dark:bg-bg-nav-dark dark:border-hidden w-full shadow-blur">
      <div class="absolute top-2 -right-px bottom-2 w-1 rounded-l-lg ${tagInfo.barColorClass}"></div>
      <div class="max-md:py-3 max-md:px-4 md:px-5 md:py-6">
        <div class="relative flex gap-4 mb-1">
          <input type="checkbox" class="w-4 h-4 rounded-sm border-Oil04 accent-primary dark:border-on-primary-light task-checkbox" id="task-checkbox-${taskId}">
          <span id="task-name-${taskId}" class="text-gray-800 font-semibold text-sm md:text-base dark:text-surface-light">
            ${name}
            <span class="max-md:hidden mr-3 ${tagInfo.bgColorClass} ${tagInfo.textColorClass} text-[10px] md:text-xs font-semibold rounded-sm px-2 py-0.5">
              ${tagInfo.text}
            </span>
          </span>
          <img class="more-options-toggle mr-auto cursor-pointer" src="./src/svgs light mode/Frame 33317.svg" alt="more options" title="More Options" id="more-options-toggle-${taskId}">
          <div class="more-options hidden absolute top-6 -left-1 rounded-lg border border-Neutral-100 dark:border-Dark-border-tags" id="more-options-${taskId}">
            <div class="delete-task cursor-pointer m-[5px]" id="delete-btn-${taskId}">
              <img class="size-6 dark:hidden" src="./src/svgs light mode/tabler_trash-x.svg" alt="delete" title="Delete Task">
              <img class="size-6 hidden dark:block" src="./src/svgs dark mode/tabler_trash-x.svg" alt="delete">
            </div>
            <div class="edit-task cursor-pointer m-[5px] pr-2.5 border-r border-Neutral-100 dark:border-Dark-border-tags" id="edit-btn-${taskId}">
              <img class="size-6 dark:hidden" src="./src/svgs light mode/tabler_edit.svg" alt="edit" title="Edit Task">
              <img class="size-6 hidden dark:block" src="./src/svgs dark mode/tabler_edit.svg" alt="edit">
            </div>
          </div>
        </div>
        <div class="mb-4">
          <span class="md:hidden mr-9 ${tagInfo.bgColorClass} ${tagInfo.textColorClass} text-[10px] md:text-xs font-semibold rounded-sm px-2 py-0.5">
            ${tagInfo.text}
          </span>
        </div>
        <p class="mr-9 text-Neutral-700 text-xs md:text-sm dark:text-task-desc-dark" id="task-desc-${taskId}">
          ${description}
        </p>
      </div>
    </div>
  `;
}

function attachTaskEvents(taskElement, taskId) {
  taskElement
    .querySelector(`#more-options-toggle-${taskId}`)
    .addEventListener("click", () => {
      const options = taskElement.querySelector(`#more-options-${taskId}`);
      options.classList.toggle("hidden");
      options.classList.toggle("inline-flex");
    });

  taskElement
    .querySelector(`#delete-btn-${taskId}`)
    .addEventListener("click", () => {
      taskElement.remove();
      updateTaskCount();
      updateDoneTaskCount();
      saveTasks();
    });

  taskElement
    .querySelector(`#edit-btn-${taskId}`)
    .addEventListener("click", () => {
      const name = taskElement
        .querySelector(`#task-name-${taskId}`)
        .childNodes[0].textContent.trim();
      const desc =
        taskElement.querySelector(`#task-desc-${taskId}`)?.textContent.trim() ||
        "";

      taskNameInput.value = name;
      taskDescInput.value = desc;
      form.classList.remove("hidden");
      createTaskBtn.classList.replace("inline-flex", "hidden");
      Artboard.classList.replace("flex", "hidden");
      editingTaskElement = taskElement;
    });

  taskElement
    .querySelector(`#task-checkbox-${taskId}`)
    .addEventListener("change", (e) => {
      if (e.target.checked) {
        doneTasksContainer.appendChild(taskElement);
      } else {
        tasksContainer.appendChild(taskElement);
      }
      updateTaskCount();
      updateDoneTaskCount();
      saveTasks();
    });
}

// Save tasks to local storage
function saveTasks() {
  const tasks = Array.from(tasksContainer.children).map((task) => ({
    id: task.dataset.id,
    name: task
      .querySelector('[id^="task-name-"]')
      .childNodes[0].textContent.trim(),
    description:
      task.querySelector('[id^="task-desc-"]')?.textContent.trim() || "",
    tag: task
      .querySelector(".absolute.top-2.-right-px.bottom-2.w-1")
      .classList.contains("bg-low")
      ? "low"
      : task
          .querySelector(".absolute.top-2.-right-px.bottom-2.w-1")
          .classList.contains("bg-medium")
      ? "medium"
      : "high",
    isDone: false,
  }));

  const doneTasks = Array.from(doneTasksContainer.children).map((task) => ({
    id: task.dataset.id,
    name: task
      .querySelector('[id^="task-name-"]')
      .childNodes[0].textContent.trim(),
    description:
      task.querySelector('[id^="task-desc-"]')?.textContent.trim() || "",
    tag: task
      .querySelector(".absolute.top-2.-right-px.bottom-2.w-1")
      .classList.contains("bg-low")
      ? "low"
      : task
          .querySelector(".absolute.top-2.-right-px.bottom-2.w-1")
          .classList.contains("bg-medium")
      ? "medium"
      : "high",
    isDone: true,
  }));

  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  localStorage.setItem(DONE_TASKS_STORAGE_KEY, JSON.stringify(doneTasks));
}

// Load tasks from local storage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY)) || [];
  const doneTasks =
    JSON.parse(localStorage.getItem(DONE_TASKS_STORAGE_KEY)) || [];

  tasksContainer.innerHTML = "";
  doneTasksContainer.innerHTML = "";

  // Load active tasks with their saved priority
  tasks.forEach((task) => {
    const taskElement = createTaskElement(
      task.name,
      task.description,
      task.tag
    );
    taskElement.dataset.id = task.id;
    tasksContainer.appendChild(taskElement);
  });

  // Load done tasks with their saved priority
  doneTasks.forEach((task) => {
    const taskElement = createTaskElement(
      task.name,
      task.description,
      task.tag
    );
    taskElement.dataset.id = task.id;
    const checkbox = taskElement.querySelector('[id^="task-checkbox-"]');
    checkbox.checked = true;
    doneTasksContainer.appendChild(taskElement);
  });

  updateTaskCount();
  updateDoneTaskCount();
}

let taskIdCounter = 1;
function createTaskElement(name, description, tag) {
  const taskId = taskIdCounter++;
  const tagInfo = getTagInfo(tag);
  const taskElement = document.createElement("li");
  taskElement.innerHTML = buildTaskHTML(name, description, tagInfo, taskId);
  taskElement.dataset.id = taskId;
  attachTaskEvents(taskElement, taskId);
  return taskElement;
}

function initializeTaskIdCounter() {
  const tasks = JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY)) || [];
  const doneTasks =
    JSON.parse(localStorage.getItem(DONE_TASKS_STORAGE_KEY)) || [];
  const allTasks = [...tasks, ...doneTasks];

  if (allTasks.length > 0) {
    const maxId = Math.max(...allTasks.map((task) => parseInt(task.id)));
    taskIdCounter = maxId + 1;
  }
}

// Initialize selected tag UI
function initializeSelectedTagUI() {
  colorTags.forEach((tag) => {
    tag.classList.remove("selected");
    if (tag.dataset.tag === selectedTag) {
      tag.classList.add("selected");
    }
  });
}

// Initialization
renderDateToElements(getFormattedPersianDate());
initializeTaskIdCounter();
initializeSelectedTagUI();
loadTasks();

// Event Listeners
trigram.addEventListener("click", openNav);
closeBtn.addEventListener("click", closeNav);

darkMode.addEventListener("click", () => {
  htmlClasses.toggle("dark");
  localStorage.setItem("darkMode", htmlClasses.contains("dark"));
});

// Initialize dark mode from storage
if (localStorage.getItem("darkMode") === "true") {
  htmlClasses.add("dark");
}

createTaskBtn.addEventListener("click", () => {
  form.classList.remove("hidden");
  createTaskBtn.classList.replace("inline-flex", "hidden");
  Artboard.classList.replace("flex", "hidden");
  editingTaskElement = null;
});

closeAdd.addEventListener("click", () => {
  form.classList.add("hidden");
  createTaskBtn.classList.replace("hidden", "inline-flex");
  editingTaskElement = null;
});

tagContainer.addEventListener("click", () => {
  tags.classList.toggle("hidden");
  tags.classList.toggle("inline-flex");
});

colorTags.forEach((tag) => {
  tag.addEventListener("click", () => {
    colorTags.forEach((t) => t.classList.remove("selected"));
    tag.classList.add("selected");
    selectedTag = tag.dataset.tag;
    localStorage.setItem(SELECTED_TAG_STORAGE_KEY, selectedTag);
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = taskNameInput.value.trim();
  const desc = taskDescInput.value.trim();

  if (!name) {
    alert("لطفاً نام تسک را وارد کنید.");
    return;
  }

  if (editingTaskElement) {
    const taskId = editingTaskElement.dataset.id;
    const tagInfo = getTagInfo(selectedTag);
    editingTaskElement.innerHTML = buildTaskHTML(name, desc, tagInfo, taskId);
    editingTaskElement.dataset.id = taskId;
    attachTaskEvents(editingTaskElement, taskId);
    editingTaskElement = null;
  } else {
    const taskElement = createTaskElement(name, desc, selectedTag);
    tasksContainer.appendChild(taskElement);
  }

  form.reset();
  form.classList.add("hidden");
  createTaskBtn.classList.replace("hidden", "inline-flex");
  updateTaskCount();
  updateDoneTaskCount();
  saveTasks();
});
