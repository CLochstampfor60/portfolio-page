console.log('Hello World')

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

// Fetch my own Github Repository Link.
fetch('https://api.github.com/users/CLochstampfor60/repos')
  .then((response) => response.json())
  .then((data) => {
    // Sort by calendar date
    data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

    // Limit the number to 6
    const limitedData = data.slice(0, 6)
    // Repositories Container variable
    const reposContainer = document.getElementById('reposContainer')

    // Create loop to scrub through each repo and pull specific information/grab properties.
    for (let i = 0; i < limitedData.length; i++) {
      const repo = limitedData[i]
      const repoInfoDiv = document.createElement('div')
      // Add a class
      repoInfoDiv.classList.add('repo-info')
      repoInfoDiv.innerHTML = `
			<h3>${repo.name}</h3>
			<p class='desc'>${repo.description || ''}</p>
						<p class='language'>${repo.language || ''}</p>
									<a href='${repo.html_url}' target='_blank'>View on Githb &rarr;</a>
			`
      // Most important data: Name, Description, HTML, URL
      reposContainer.appendChild(repoInfoDiv)
    }
  })
  .catch((error) => {
    console.error(error)
  })
