const openMenu = () => {
  const menu = document.querySelector(".header-menu");
  const overlay = document.querySelector("#overlay");

  menu.classList.toggle("active");

  if(menu.classList.contains("active")) {
    document.querySelector("header .material-icons").innerHTML = "close";
    overlay.style.display = "block"; // Show the overlay
  } else {
    document.querySelector("header .material-icons").innerHTML = "menu";
    overlay.style.display = "none"; // Hide the overlay
  }
}

// Add event listener to the overlay to close the menu when clicked
document.querySelector("#overlay").addEventListener("click", () => {
  closeMenu();
});

// Function to close the menu
const closeMenu = () => {
  const menu = document.querySelector(".header-menu");
  const overlay = document.querySelector("#overlay");

  menu.classList.remove("active");
  overlay.style.display = "none";
  document.querySelector("header .material-icons").innerHTML = "menu";
}

// Add event listeners to menu items to close the menu when clicked
document.querySelectorAll(".header-menu li a").forEach(item => {
  item.addEventListener("click", () => {
    closeMenu();
  });
});
