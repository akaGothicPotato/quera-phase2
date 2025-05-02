// functions will be added here

// nav handle start
// DOM elements
const trigramLight = document.getElementById("trigram-light");
const trigramDark = document.getElementById("trigram-dark");
const closeNavLight = document.getElementById("close-nav-light");
const closeNavDark = document.getElementById("close-nav-dark");
const navWrapper = document.getElementById("nav-wrapper");
const body = document.body;

// Function to open navigation
function openNav() {
  navWrapper.classList.remove("-right-64");
  navWrapper.classList.add("right-0");
  body.classList.add("overflow-hidden"); // Prevent scrolling when nav is open
}

// Function to close navigation
function closeNavHandler() {
  navWrapper.classList.remove("right-0");
  navWrapper.classList.add("-right-64");
  body.classList.remove("overflow-hidden");
}

// Event listeners
trigramLight.addEventListener("click", openNav);
trigramDark.addEventListener("click", openNav);
closeNavLight.addEventListener("click", closeNavHandler);
closeNavDark.addEventListener("click", closeNavHandler);

// Close nav when clicking outside of it
document.addEventListener("click", (event) => {
  const isClickInsideNav = navWrapper.contains(event.target);
  const isClickOnTrigram =
    event.target === trigramLight || event.target === trigramDark;

  if (
    !isClickInsideNav &&
    !isClickOnTrigram &&
    navWrapper.classList.contains("right-0")
  ) {
    closeNavHandler();
  }
});
// nav handle end
