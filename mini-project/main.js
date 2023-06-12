let url = new URL(window.location.href)
let split1 = url.pathname.split('/');
let fileName = (split1[split1.length-1]);
let ID = new URL(document.URL).searchParams.get('id')

if (fileName=== 'index.html') {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
            // address company email id name phone username website
            for (const user of users) {
                let divElement = document.createElement('div');
                divElement.classList.add('user')
                divElement.innerHTML = `ID: ${user.id}; Name: ${user.name}`

                let aLink = document.createElement('a')
                aLink.setAttribute('href', `user-details.html?id=${user.id}`)

                let userButton = document.createElement('button');
                userButton.id = user.id
                userButton.innerText = 'Деталі'

                divElement.appendChild(aLink)
                aLink.appendChild(userButton)
                document.body.appendChild(divElement)
            }
        })
}
if (fileName=== 'user-details.html'){

    fetch(`https://jsonplaceholder.typicode.com/users/${ID}`)
        .then(response => response.json())
        // address company email id name phone username website
        .then(user => {
            let divElement = document.createElement("div");
            divElement.classList.add('info')

            document.body.appendChild(divElement)

            console.log(Object.entries(user));

            fillObjectInElement(user, divElement)
    })
        .then(() => {
            fetch(`https://jsonplaceholder.typicode.com/users/${ID}/posts`)
                .then(response => response.json())
                .then(userPosts => {
                    let userPostsButton = document.createElement('button');
                    userPostsButton.innerText='Пости'

                    document.body.appendChild(userPostsButton)

                    userPostsButton.addEventListener('click',function (){

                        let firstRowPosts = document.createElement('div');
                        firstRowPosts.classList.add('firstRowPosts')
                        firstRowPosts.style='display:flex; justify-content: space-around'

                        let secondRowPosts = document.createElement('div')
                        secondRowPosts.style='display:flex; justify-content: space-around'
                        secondRowPosts.classList.add('secondRowPosts')

                        document.body.append(firstRowPosts,secondRowPosts)

                        for (const userPost of userPosts) {
                            let postDiv = document.createElement('div');
                            postDiv.classList.add('post')
                            postDiv.style='width:18%'
                            postDiv.innerHTML=`<p class="title">${userPost.title}</p>`

                            console.log(userPost.id)

                            let postDetailsButton = document.createElement('button');
                            postDetailsButton.innerText='Деталі поста'

                            let aLink = document.createElement('a')
                            aLink.setAttribute('href',`post-details.html?id=${userPost.id}`)

                            postDiv.appendChild(aLink)
                            aLink.appendChild(postDetailsButton)

                            if (firstRowPosts.childElementCount<5){firstRowPosts.appendChild(postDiv)}else{
                                secondRowPosts.appendChild(postDiv)
                            }
                        }
                    })
                })
        })
}
if(fileName=== 'post-details.html'){

    fetch(`https://jsonplaceholder.typicode.com/posts/${ID}`)
        .then(response => response.json())
        .then(userPost=>{

            console.log(userPost)

            let userPostEntries = Object.entries(userPost);

            for (const userPostEntry of userPostEntries) {
                let pElement = document.createElement('p');

                console.log(userPostEntry)

                pElement.innerText=`${userPostEntry[0]}: ${userPostEntry[1]}`
                document.body.appendChild(pElement)
            }
        })
        .then(()=>{
            fetch(`https://jsonplaceholder.typicode.com/posts/${ID}/comments`)
                .then(response => response.json())
                .then(userPosts=> {

                    console.log(userPosts)

                    let divElement = document.createElement('div');
                    document.body.appendChild(divElement)

                    fillObjectInElement(userPosts, divElement)

                })
        })

}

function fillObjectInElement(object, htmlElement){
    console.log(htmlElement)
    let objectEntries = Object.entries(object)
    for (let objectEntry of objectEntries) {
        if (typeof objectEntry[1] === 'object'){
            let pElement = document.createElement('p');
            pElement.innerHTML =`<br>${objectEntry[0]}:`
            pElement.style="font-weight: bold;"
            htmlElement.appendChild(pElement)
            fillObjectInElement(objectEntry[1],htmlElement)
        } else {
            let pElement = document.createElement('p');
            pElement.innerText = `${objectEntry[0]}: ${objectEntry[1]}`
            htmlElement.appendChild(pElement)
        }
    }
}

