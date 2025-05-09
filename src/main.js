// functions will be added here

// const tasksCount = document.getElementById("taskscontainer").childElementCount;
// document.getElementById(
//   "tasksCount"
// ).textContent = `${tasksCount} تسک را باید انجام دهید.`;

// nav handle start
// DOM elements
const trigram = document.getElementById("trigram");
const closeBtn = document.getElementById("closeNav");
const navWrapper = document.getElementById("nav-wrapper");
const body = document.body;

// Function to open navigation
function openNav() {
  navWrapper.classList.remove("max-md:hidden");
  navWrapper.classList.add("max-md:fixed");
  body.classList.add("overflow-hidden"); // Prevent scrolling when nav is open and dims background
}

// Function to close navigation
function closeNav() {
  navWrapper.classList.remove("max-md:fixed");
  navWrapper.classList.add("max-md:hidden");
  body.classList.remove("overflow-hidden");
}

// Event listeners
trigram.addEventListener("click", openNav);
closeBtn.addEventListener("click", closeNav);

// Close nav when clicking outside of it
document.addEventListener("click", (event) => {
  const isClickInsideNav = navWrapper.contains(event.target);
  const isClickOnTrigram = event.target === trigram;

  if (
    !isClickInsideNav &&
    !isClickOnTrigram &&
    navWrapper.classList.contains("max-md:hidden")
  ) {
    closeNav();
  }
});
// nav handle end

// darkMode toggle:
const html = document.querySelector("html");
const htmlClasses = html.classList;

const darkMode = document.getElementById("themeing");
darkMode.addEventListener("click", () => {
  htmlClasses.toggle("dark");
});

// addTask initiate:
class Task {
  constructor(taskName, taskDescription, taskTag) {
    this.taskName = taskName;
    this.taskDescription = taskDescription;
    this.taskTag = taskTag;
    this.isCompleted = false;
  }

  getTagInfo() {
    switch (this.taskTag) {
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

  createTask() {
    const taskElement = document.createElement("li");
    const tagInfo = this.getTagInfo();
    taskElement.innerHTML = `<div
    class="relative mb-4 border border-Neutral-250 rounded-xl dark:bg-bg-nav-dark dark:border-hidden w-full shadow-blur"
  >
    <div
      class="absolute top-2 -right-px bottom-2 w-1 rounded-l-lg ${
        tagInfo.barColorClass
      }"
    ></div>
    <div class="max-md:py-3 max-md:px-4 md:px-5 md:py-6">
      <!-- task title + checkbox + task options -->
      <div class="relative flex gap-4 mb-1">
        <input type="checkbox" class="w-4 h-4 rounded-sm border-Oil04
        accent-primary dark:border-on-primary-light task-checkbox" ${
          this.isCompleted ? "checked" : ""
        }>
        <span class="text-gray-800 font-semibold text-sm"
                  >${this.taskName}<span
                    class="max-md:hidden mr-3 ${tagInfo.bgColorClass} ${
      tagInfo.textColorClass
    } text-[10px] font-semibold rounded-sm px-2 py-0.5"
                    >${tagInfo.text}</span
                  ></span
                >
        <img
          id="more_options"
          class="mr-auto cursor-pointer"
          src="./src/svgs light mode/Frame 33317.svg"
          alt="more_options"
        />
        <div
          id="more-options-btns"
          class="hidden absolute top-6 -left-1 rounded-lg border border-Neutral-100"
        >
          <div id="trash-btn" class="cursor-pointer m-[5px]">
            <img
              class="size-6 dark:hidden"
              src="./src/svgs light mode/tabler_trash-x.svg"
              alt="edit-btn"
            />
            <img
              class="size-6 hidden dark:block"
              src="./src/svgs dark mode/tabler_trash-x.svg"
              alt="edit-btn"
            />
          </div>
          <div
            id="edit-btn"
            class="cursor-pointer m-[5px] pr-2.5 border-r border-Neutral-100"
          >
            <img
              class="size-6 dark:hidden"
              src="./src/svgs light mode/tabler_edit.svg"
              alt="edit-btn"
            />
            <img
              class="size-6 hidden dark:block"
              src="./src/svgs dark mode/tabler_edit.svg"
              alt="edit-btn"
            />
          </div>
        </div>
      </div>
      <!-- priority of task -->
      <div class="mb-4">
        <span
          class="md:hidden mr-9 ${tagInfo.bgColorClass} ${
      tagInfo.textColorClass
    } text-[10px] font-semibold rounded-sm px-2 py-0.5"
          >${tagInfo.text}</span
        >
      </div>
      <!-- task description -->
      <p class="mr-9 text-Neutral-700 text-xs">${this.taskDescription}</p>
    </div>
  </div>
        `;
    createTaskBtn.classList.replace("inline-flex", "hidden");
    const moreOptions = taskElement.querySelector("#more_options");
    moreOptions.addEventListener("click", () => {
      const optionBTN = taskElement.querySelector("#more-options-btns");

      if (optionBTN.classList.contains("hidden")) {
        optionBTN.classList.replace("hidden", "inline-flex");
      } else {
        optionBTN.classList.replace("inline-flex", "hidden");
      }
    });

    return taskElement;
  }
}

// Toggle form visibility
const createTaskBtn = document.getElementById("createTaskBtn");
const form = document.getElementById("taskForm");
createTaskBtn.addEventListener("click", () => {
  form.classList.remove("hidden");
  createTaskBtn.classList.replace("inline-flex", "hidden");
});

const closeAdd = document.getElementById("close-add");
closeAdd.addEventListener("click", () => {
  form.classList.add("hidden");
  createTaskBtn.classList.replace("hidden", "inline-flex");
});

// Toggle tags visibility
document.getElementById("tag-container").addEventListener("click", () => {
  const tags = document.getElementById("addTags");
  if (tags.classList.contains("hidden")) {
    tags.classList.replace("hidden", "inline-flex");
  } else {
    tags.classList.replace("inline-flex", "hidden");
  }
});

// Color tag selection
let selectedTag = "high"; // Default selection
const colorTags = document.querySelectorAll(".color-tag");
colorTags.forEach((tag) => {
  tag.addEventListener("click", () => {
    // Remove 'selected' class from all tags
    colorTags.forEach((t) => t.classList.remove("selected"));
    // Add 'selected' to clicked tag
    tag.classList.add("selected");
    selectedTag = tag.dataset.tag;
  });
});

// Form submission
document.getElementById("taskForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("taskName").value;
  const desc = document.getElementById("taskDescription").value;

  const task = new Task(name, desc, selectedTag);
  task.domElement = task.createTask();
  document.getElementById("tasksContainer").appendChild(task.domElement);

  // Reset and hide form
  form.reset();
});
