const body = document.body;
const btnTheme = document.querySelector(".fa-moon");
const btnHamburger = document.querySelector(".fa-bars");
const favicon = document.getElementById("favicon");
const logo = document.getElementById("logo");
const getBodyTheme = localStorage.getItem("portfolio-theme");
const getBtnTheme = localStorage.getItem("portfolio-btn-theme");

//Theme
const addThemeClass = (bodyClass, btnClass) => {
  body.classList.add(bodyClass);
  btnTheme.classList.add(btnClass);
};

const setTheme = (bodyClass, btnClass) => {
  if (bodyClass == "dark") {
    favicon.href = "favicon-dark.ico";
    logo.src = "favicon-dark.ico";
  }
  if (bodyClass == "light") {
    favicon.href = "favicon-light.ico";
    logo.src = "favicon-light.ico";
  }

  body.classList.remove(localStorage.getItem("portfolio-theme"));
  btnTheme.classList.remove(localStorage.getItem("portfolio-btn-theme"));

  addThemeClass(bodyClass, btnClass);

  localStorage.setItem("portfolio-theme", bodyClass);
  localStorage.setItem("portfolio-btn-theme", btnClass);
};

const isDark = () => body.classList.contains("dark");
const toggleTheme = () =>
  isDark() ? setTheme("light", "fa-moon") : setTheme("dark", "fa-sun");
btnTheme.addEventListener("click", toggleTheme);
addThemeClass(getBodyTheme, getBtnTheme);
const initTheme = () => setTheme(getBodyTheme, getBtnTheme);

//Navbar
const displayList = () => {
  const navUl = document.querySelector(".nav__list");

  if (btnHamburger.classList.contains("fa-bars")) {
    btnHamburger.classList.remove("fa-bars");
    btnHamburger.classList.add("fa-times");
    navUl.classList.add("display-nav-list");
  } else {
    btnHamburger.classList.remove("fa-times");
    btnHamburger.classList.add("fa-bars");
    navUl.classList.remove("display-nav-list");
  }
};
btnHamburger.addEventListener("click", displayList);

//Scroll
const scrollUp = () => {
  const btnScrollTop = document.querySelector(".scroll-top");

  if (body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
    btnScrollTop.style.display = "block";
  } else {
    btnScrollTop.style.display = "none";
  }
};
document.addEventListener("scroll", scrollUp);

// MOVE ELEMENT DEPENDING ON SCREEN WIDTH
function movePosition() {
  // set element variables
  var $roleSection = document.getElementById("aboutRole");
  var $image = document.getElementById("profileImg");
  var $imageHold = document.getElementById("imgContainer");

  // get window width
  var $windowWidth = document.documentElement.clientWidth;
  // positioning if statement
  if ($windowWidth < 800) {
    // if below 800px insert after the title and above paragraph
    $roleSection.parentNode.insertBefore($image, $roleSection);
    $imageHold.remove();
  } else {
    // if above 800px move imageHold (sidebar loctaction)
    $imageHold.appendChild($image);
  }
}

// check document is ready
var domReady = function (callback) {
  document.readyState === "interactive" || document.readyState === "complete"
    ? callback()
    : document.addEventListener("DOMContentLoaded", callback);
};

// on document ready
domReady(function () {
  // run move function
  movePosition();
  initTheme();
});

// on window resize
window.onresize = function (event) {
  // run move function
  movePosition();
};
