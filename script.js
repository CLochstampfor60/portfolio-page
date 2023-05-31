console.log("Hello World")

// variable for the toggle button
const menuButton = document.querySelector(".menu-toggle")

// variable for the nav element
const nav = document.querySelector("nav")

// function, which listens for the user to click the menu button.
// When the user clicks the button, add the open class to the nav el.
menuButton.addEventListener("click", () => {
  // e.preventDefault()
  nav.classList.toggle("open")
})
