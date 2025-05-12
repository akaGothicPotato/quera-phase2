// Imports
import { getFormattedPersianDate } from "./formatDate.js"; // Import function to get formatted Persian date
import { renderDateToElements } from "./renderDate.js"; // Import function to render date to DOM elements

// DOM Elements
// Get references to various DOM elements needed for the application
const trigram = document.getElementById("trigram"); // Hamburger menu button for mobile
const closeBtn = document.getElementById("closeNav"); // Close navigation button
const navWrapper = document.getElementById("nav-wrapper"); // Navigation wrapper
const body = document.body; // Document body element
const html = document.querySelector("html"); // HTML root element
const htmlClasses = html.classList; // ClassList of HTML element (for dark mode)
const darkMode = document.getElementById("themeing"); // Dark mode toggle button
const createTaskBtn = document.getElementById("createTaskBtn"); // Button to create new task
const form = document.getElementById("taskForm"); // Task creation form
const closeAdd = document.getElementById("close-add"); // Button to close task form
const tagContainer = document.getElementById("tag-container"); // Container for task priority tags
const tags = document.getElementById("addTags"); // Tag selection dropdown
const colorTags = document.querySelectorAll(".color-tag"); // Individual priority tag options
const tasksContainer = document.getElementById("tasksContainer"); // Container for active tasks
const doneTasksContainer = document.getElementById("doneTasksContainer"); // Container for completed tasks
const doneTasksCount = document.getElementById("doneTasksCount");
const tasksCount = document.getElementById("tasksCount"); // Element showing task count
const Artboard = document.getElementById("Artboard"); // Artboard/empty state container
const taskNameInput = document.getElementById("taskName"); // Input for task name
const taskDescInput = document.getElementById("taskDescription"); // Input for task description
const formContainer = document.getElementById("form-container");

// Edit tracking
let editingTaskElement = null; // Stores the task element being edited (null when creating new task)

// Functions

// Opens the mobile navigation menu
function openNav() {
  navWrapper.classList.remove("max-md:hidden"); // Show navigation
  navWrapper.classList.add("max-md:fixed"); // Make it fixed position
  body.classList.add("overflow-hidden"); // Prevent body scrolling
}

// Closes the mobile navigation menu
function closeNav() {
  navWrapper.classList.remove("max-md:fixed"); // Remove fixed position
  navWrapper.classList.add("max-md:hidden"); // Hide navigation
  body.classList.remove("overflow-hidden"); // Allow body scrolling
}

// Updates the task counter with Persian numerals
function updateTaskCount() {
  // Convert count to Persian numerals
  const formattedCount = tasksContainer.childElementCount
    .toString()
    .replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  tasksCount.textContent = `${formattedCount} تسک را باید انجام دهید.`; // Update counter text
}

function updateDoneTaskCount() {
  // Convert count to Persian numerals
  const formattedCount = doneTasksContainer.childElementCount
    .toString()
    .replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  doneTasksCount.textContent = `${formattedCount} تسک را باید انجام دهید.`; // Update counter text
}

// Returns style information for different priority tags
function getTagInfo(tag) {
  switch (tag) {
    case "low":
      return {
        bgColorClass: "bg-bg-low", // Background color class for low priority
        textColorClass: "text-low", // Text color class for low priority
        text: "پایین", // Persian text for low priority
        barColorClass: "bg-low", // Side bar color class for low priority
      };
    case "medium":
      return {
        bgColorClass: "bg-bg-medium", // Background color class for medium priority
        textColorClass: "text-medium", // Text color class for medium priority
        text: "متوسط", // Persian text for medium priority
        barColorClass: "bg-medium", // Side bar color class for medium priority
      };
    case "high":
    default:
      return {
        bgColorClass: "bg-bg-high", // Background color class for high priority
        textColorClass: "text-high", // Text color class for high priority
        text: "بالا", // Persian text for high priority
        barColorClass: "bg-high", // Side bar color class for high priority
      };
  }
}

// Generates HTML for a task element
function buildTaskHTML(name, description, tagInfo) {
  return `
    <div
  class="relative mb-4 border border-Neutral-250 rounded-xl dark:bg-bg-nav-dark dark:border-hidden w-full shadow-blur"
>
  <div
    class="absolute top-2 -right-px bottom-2 w-1 rounded-l-lg ${tagInfo.barColorClass}"
  ></div>
  <div class="max-md:py-3 max-md:px-4 md:px-5 md:py-6">
    <div class="relative flex gap-4 mb-1">
      <input
        type="checkbox"
        class="w-4 h-4 rounded-sm border-Oil04 accent-primary dark:border-on-primary-light task-checkbox"
      />
      <span
        id="Name"
        class="text-gray-800 font-semibold text-sm md:text-base dark:text-surface-light"
      >
        ${name}
        <span
          class="max-md:hidden mr-3 ${tagInfo.bgColorClass} ${tagInfo.textColorClass} text-[10px] md:text-xs font-semibold rounded-sm px-2 py-0.5"
          >${tagInfo.text}</span
        >
      </span>
      <img
        class="more-options-toggle mr-auto cursor-pointer"
        src="./src/svgs light mode/Frame 33317.svg"
        alt="more options"
        title="More Options"
      />
      <div
        class="more-options hidden absolute top-6 -left-1 rounded-lg border border-Neutral-100 dark:border-Dark-border-tags"
      >
        <div id="trash-btn" class="delete-task cursor-pointer m-[5px]">
          <img
            class="size-6 dark:hidden"
            src="./src/svgs light mode/tabler_trash-x.svg"
            alt="delete"
            title="Delete Task"
          />
          <img
            class="size-6 hidden dark:block"
            src="./src/svgs dark mode/tabler_trash-x.svg"
            alt="delete"
          />
        </div>
        <div
          id="edit-btn"
          class="edit-task cursor-pointer m-[5px] pr-2.5 border-r border-Neutral-100 dark:border-Dark-border-tags"
        >
          <img
            class="size-6 dark:hidden"
            src="./src/svgs light mode/tabler_edit.svg"
            alt="edit"
            title="Edit Task"
          />
          <img
            class="size-6 hidden dark:block"
            src="./src/svgs dark mode/tabler_edit.svg"
            alt="edit"
          />
        </div>
      </div>
    </div>
    <div class="mb-4">
      <span
        class="md:hidden mr-9 ${tagInfo.bgColorClass} ${tagInfo.textColorClass} text-[10px] md:text-xs font-semibold rounded-sm px-2 py-0.5"
        >${tagInfo.text}</span
      >
    </div>
    <p
      class="mr-9 text-Neutral-700 text-xs md:text-sm dark:text-task-desc-dark"
    >
      ${description}
    </p>
  </div>
</div>
  `;
}

// Attaches event listeners to a task element
function attachTaskEvents(taskElement) {
  // Toggle more options menu when clicked
  taskElement
    .querySelector(".more-options-toggle")
    .addEventListener("click", () => {
      const options = taskElement.querySelector(".more-options");
      options.classList.toggle("hidden");
      options.classList.toggle("inline-flex");
    });

  // Delete task when delete button is clicked
  taskElement.querySelector("#trash-btn").addEventListener("click", () => {
    taskElement.remove();
    updateTaskCount();
  });

  // Edit task when edit button is clicked
  taskElement.querySelector("#edit-btn").addEventListener("click", () => {
    const name = taskElement
      .querySelector("#Name")
      .childNodes[0].textContent.trim();
    const desc = taskElement.querySelector("p")?.textContent.trim() || "";
    taskNameInput.value = name;
    taskDescInput.value = desc;
    form.classList.remove("hidden");
    taskElement.append(form);
    Artboard.classList.replace("flex", "hidden");
    editingTaskElement = taskElement;
  });
}

// Creates a new task element and returns it
function createTaskElement(name, description, tag) {
  const tagInfo = getTagInfo(tag); // Get styling info for the priority tag
  const taskElement = document.createElement("li"); // Create new list item
  taskElement.innerHTML = buildTaskHTML(name, description, tagInfo); // Set HTML content
  attachTaskEvents(taskElement); // Add event listeners
  updateTaskCount(); // Update task counter
  return taskElement;
}

// Initialization
renderDateToElements(getFormattedPersianDate()); // Render current Persian date to page

// Event Listeners
trigram.addEventListener("click", openNav); // Open nav when hamburger menu clicked
closeBtn.addEventListener("click", closeNav); // Close nav when close button clicked

// Toggle dark mode when dark mode button clicked
darkMode.addEventListener("click", () => htmlClasses.toggle("dark"));

// Show task form when create task button clicked
createTaskBtn.addEventListener("click", () => {
  form.classList.remove("hidden");
  formContainer.append(form);
  createTaskBtn.classList.replace("inline-flex", "hidden");
  Artboard.classList.replace("flex", "hidden");
});

// Hide task form when close button clicked
closeAdd.addEventListener("click", () => {
  form.classList.add("hidden");
  createTaskBtn.classList.replace("hidden", "inline-flex");
  editingTaskElement = null;
});

// Toggle tag selection dropdown when clicked
tagContainer.addEventListener("click", () => {
  tags.classList.toggle("hidden");
  tags.classList.toggle("inline-flex");
});

// Track selected priority tag
let selectedTag = "high"; // Default to high priority
colorTags.forEach((tag) => {
  tag.addEventListener("click", () => {
    colorTags.forEach((t) => t.classList.remove("selected")); // Remove selection from all tags
    tag.classList.add("selected"); // Add selection to clicked tag
    selectedTag = tag.dataset.tag; // Update selected tag value
  });
});

// Handle task form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = taskNameInput.value.trim();
  const desc = taskDescInput.value.trim();

  // Validate input
  if (!name || !desc) {
    alert("لطفاً نام و توضیح تسک را وارد کنید."); // Show alert if fields are empty
    return;
  }

  // If editing existing task
  if (editingTaskElement) {
    const tagInfo = getTagInfo(selectedTag);
    editingTaskElement.innerHTML = buildTaskHTML(name, desc, tagInfo);
    attachTaskEvents(editingTaskElement);
    editingTaskElement = null;
  }
  // If creating new task
  else {
    const taskElement = createTaskElement(name, desc, selectedTag);
    tasksContainer.appendChild(taskElement);
  }

  // Reset form and UI
  form.reset();
  form.classList.add("hidden");
  createTaskBtn.classList.replace("hidden", "inline-flex");
  updateTaskCount();
  updateDoneTaskCount();
});
