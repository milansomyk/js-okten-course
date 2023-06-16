fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => {
        let usersDiv = document.getElementById('users');
        let array = []

        for (const user of users) {
            let pElement = document.createElement('p');
            pElement.classList.add('user')
            pElement.innerHTML = `ID: ${user.id}; Name: ${user.name}`

            let aLink = document.createElement('a')
            aLink.setAttribute('href', `user-details.html?id=${user.id}`)

            let userButton = document.createElement('button');
            userButton.id = user.id
            userButton.innerText = 'Details'

            let userDiv = document.createElement('div')
            userDiv.classList.add('userDiv')
            aLink.appendChild(userButton)

            userDiv.append(pElement, aLink)
            usersDiv.appendChild(userDiv)
        }
        console.log(array)
    })