// *************TOP*******************
// variable for the toggle button
const menuButton = document.querySelector('.menu-toggle')

// variable for the nav element
const nav = document.querySelector('nav')

// function, which listens for the user to click the menu button.
// When the user clicks the button, add the open class to the nav el.
menuButton.addEventListener('click', () => {
  // e.preventDefault()
  nav.classList.toggle('open')
})

// Grabbing all the link elements inside the top navigation bar.
const navLinks = document.querySelectorAll('nav a')

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open')
  })
})

// *************GITHUB FETCH*************
// Fetch data using my own Github Repository Link.
fetch('https://api.github.com/users/CLochstampfor60/repos')
  .then((response) => response.json())
  .then((data) => {
    // Sort by calendar date
    data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

    // Limit the number to 6
    const limitedData = data.slice(0, 6)
    // Repositories Container variable
    const reposContainer = document.getElementById('reposContainer')

    // Create a loop to process through each repo and pull specific information/grab properties.
    for (let i = 0; i < limitedData.length; i++) {
      const repo = limitedData[i]

      const repoInfoDiv = document.createElement('div')

      // Add a class
      repoInfoDiv.classList.add('repo-info')
      repoInfoDiv.innerHTML = `
			<h3>${repo.name}</h3>
			<p class='desc'>${repo.description || ''}</p>
			<ul id="language-${repo.name}"></ul>	
			<a href='${repo.html_url}' target='_blank'>View on Githb &rarr;</a>
			`
      // <ul id='language'>${repo.language || ''}</ul>

      // Most important data: Name, Description, HTML, URL
      reposContainer.appendChild(repoInfoDiv)

      // Fetching Language Types
      fetch(repo.languages_url)
        .then((response) => response.json())
        .then((languagesData) => {
          const languagesList = document.getElementById(`language-${repo.name}`)

          Object.keys(languagesData).forEach((language) => {
            const newLanguageEl = document.createElement('li')
            newLanguageEl.textContent = language
            languagesList.appendChild(newLanguageEl)
          })
        })
    }
  })
  // Function to catch any errors and to console log them to the browser for the dev.
  .catch((error) => {
    console.error(error)
  })
