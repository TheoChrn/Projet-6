// DOM
const sort = document.querySelector('#sort')
const dropMenu = document.querySelector('#dropdown-trigger')

// Toggle Menu
dropMenu.addEventListener('click', toggleMenu)

// Toggle Menu Function
function toggleMenu () {
  sort.classList.toggle('drop')
}
