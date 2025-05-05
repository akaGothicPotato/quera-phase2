// functions will be added here

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

const html = document.querySelector("html");
const classes = html.classList;

const darkMode = document.getElementById("themeing");
darkMode.addEventListener("click", () => {
  classes.toggle("dark");
});

document
  .getElementById("addTaskInitiate")
  .addEventListener("click", function (e) {
    if ((e.target.Id = "addTaskInitiate")) {
      const newElement = document.createElement("div");
      newElement.innerHTML = `<li
  class="divide-Neutral-250 divide-y-0 relative mb-4 border border-Neutral-250 rounded-xl dark:bg-bg-nav-dark dark:border-hidden shadow-blur"
>
  <div class="flex flex-col mt-4 mx-4">
    <article class="flex flex-col border-b border-Neutral-250">
      <h5 class="mb-2 text-sm font-semibold text-Neutral-700">نام تسک</h5>
      <h6 class="text-xs font-normal text-Neutral-600">توضیحات</h6>
      <div
        class="max-w-18 inline-flex gap-1 px-2 py-1 my-6 border border-Neutral-250 rounded-sm"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.812 2.567h7.627c.453 0 1.02.313 1.26.7l2.787 4.453c.266.433.24 1.113-.067 1.52l-3.453 4.6c-.247.327-.78.593-1.187.593H2.812c-1.167 0-1.873-1.28-1.26-2.273L3.4 9.207c.246-.394.246-1.034 0-1.427L1.552 4.827c-.613-.98.1-2.26 1.26-2.26"
            stroke="#AFAEB2"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <h6 id="addTag" class="text-xs font-semibold text-Neutral-600">
          تگ ها
        </h6>
      </div>
      <div
        class="max-w-[214px] mb-6 inline-flex text-xs font-bold border border-Neutral-250 rounded-lg"
      >
        <div class="my-2.5 mr-2.5 ml-4">
          <button
            class="text-low bg-bg-low px-2 py-0.5 rounded-sm"
            type="button"
          >
            پایین
          </button>
        </div>
        <div class="my-2.5 px-4 border-x border-Neutral-250">
          <button
            class="text-medium bg-bg-medium px-2 py-0.5 rounded-sm"
            type="button"
          >
            متوسط
          </button>
        </div>
        <div class="my-2.5 ml-2.5 mr-4">
          <button
            class="text-high bg-bg-high px-2 py-0.5 rounded-sm"
            type="button"
          >
            بالا
          </button>
        </div>
      </div>
    </article>
    <div class="inline-flex gap-1.5 py-4 self-end">
      <img
        class="size-8.5 p-1.5 bg-bg-close rounded-md"
        src="./src/svgs light mode/close-circle.svg"
        alt=""
      />

      <button
        type="button"
        class="py-1.5 px-4 rounded-md border bg-primary text-on-primary-light text-xs font-semibold"
      >
        اضافه کردن تسک
      </button>
    </div>
  </div>
</li>
`;
      this.replaceWith(newElement);
    }
  });
// document
//   .getElementById("addTaskInitiate")
//   .addEventListener("click", function (e) {
//     // Prevent the click from triggering on child elements
//     if ((e.target.Id = "addTaskInitiate")) {
//       const newElement = document.createElement("article");
//       newElement.classList.add(
//         "relative",
//         "mb-4",
//         "border",
//         "border-Neutral-250",
//         "rounded-[10px]",
//         "dark:bg-bg-nav-dark",
//         "dark:border-hidden",
//         "w-full",
//         "shadow-blur"
//       );

//       newElement.innerHTML = `
//       <div class="absolute top-2 -right-px bottom-2 w-1 rounded-l-lg bg-high"></div>
//       <div class="py-3 pl-4 pr-6">
//         <!-- task title + checkbox + task options -->
//         <div class="flex gap-4 mb-1">
//           <input
//             type="checkbox"
//             class="w-4 h-4 rounded-sm border-Oil04 accent-primary dark:border-on-primary-light task_checkbox"
//           />
//           <span class="text-gray-800 font-semibold text-sm">جلسه با مدیران پروژه</span>
//           <img
//             class="mr-auto cursor-pointer"
//             src="./src/svgs light mode/Frame 33317.svg"
//             alt="more_options"
//           />
//         </div>
//         <!-- priority of task -->
//         <div class="mb-4">
//           <span class="mr-9 bg-bg-high text-high text-[10px] font-semibold rounded-sm px-2 py-0.5">بالا</span>
//         </div>
//         <!-- task description -->
//         <p class="mr-9 text-Neutral-700 text-xs">جلسه با محسن یگانه و مریم جلالی</p>
//       </div>
//     `;

//       // Insert the new element after the button
//       //   this.insertAdjacentElement("afterend", newElement);

//       // Or if you want to replace the button completely:
//       this.replaceWith(newElement);
//     }
//   });

// document.getElementById
