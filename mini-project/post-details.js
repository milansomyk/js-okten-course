let ID = new URL(document.URL).searchParams.get('id')
let backgroundDiv = document.getElementById('background')
fetch(`https://jsonplaceholder.typicode.com/posts/${ID}`)
    .then(response => response.json())
    .then(userPost=>{

        console.log(userPost)

        let userPostEntries = Object.entries(userPost);
        let postInfoDiv = document.createElement('div');
        postInfoDiv.classList.add('postInfo')

        backgroundDiv.appendChild(postInfoDiv)
        for (const userPostEntry of userPostEntries) {
            let pElement = document.createElement('p');

            console.log(userPostEntry)

            pElement.innerText=`${userPostEntry[0]}: ${userPostEntry[1]}`
            postInfoDiv.appendChild(pElement)
        }
    })
    .then(()=>{
        fetch(`https://jsonplaceholder.typicode.com/posts/${ID}/comments`)
            .then(response => response.json())
            .then(userPosts=> {

                console.log(userPosts)

                let divElement = document.createElement('div');
                divElement.classList.add('comments')
                backgroundDiv.appendChild(divElement)

                fillObjectInElement(userPosts, divElement)

            })
    })
function fillObjectInElement(object, htmlElement){
    console.log(htmlElement)
    let objectEntries = Object.entries(object)
    for (let objectEntry of objectEntries) {
        if (typeof objectEntry[1] === 'object'){
            let divElement = document.createElement('div');
            console.log(objectEntry);

            divElement.classList.add(`comment`)
            htmlElement.appendChild(divElement)
            fillObjectInElement(objectEntry[1],htmlElement)
        } else {
            let pElement = document.createElement('p');
            pElement.classList.add(`${objectEntry[0]}`)
            pElement.innerText = `${objectEntry[0]}: ${objectEntry[1]}`
            htmlElement.lastChild.appendChild(pElement)
        }
    }
}
