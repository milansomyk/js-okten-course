let button = document.getElementById("only-one-button");
let form = document.getElementById("only-one-form");
let localItem = localStorage.getItem("itemsList");
let div = document.getElementById("items-list");

let itemList = [];
function loadDiv(){
    localItem? itemList = JSON.parse(localItem) : localStorage.setItem("itemsList","");
    for (const item of itemList) {
        let paragraphElement = document.createElement("p");
        paragraphElement.classList.add('item');
        paragraphElement.innerText=item;
        div.appendChild(paragraphElement);
    }
}
    loadDiv();


button.addEventListener("click",function(e){
    e.preventDefault();
    let items;
    console.log(localItem)
    localStorage.getItem("itemsList")? items = JSON.parse(localStorage.getItem("itemsList")) : items = [];
    items.push(form.itemValue.value)

    localStorage.setItem("itemsList",JSON.stringify(items));
    let paragraphElement = document.createElement("p");
    paragraphElement.classList.add("item");
    paragraphElement.innerText=form.itemValue.value;
    div.appendChild(paragraphElement);

    // loadDiv();
})
fetch('https://jsonplaceholder.typicode.com/users').then(res=>res.json()).then(json=>{
    let jsonDiv = document.getElementById("json-placeholder");
    for (const user of json) {
        let htmlParagraphElement = document.createElement("p");
        htmlParagraphElement.classList.add("user");
        htmlParagraphElement.innerText=`${user.id}: ${user.name}: ${user.email}\n`;
        jsonDiv.append(htmlParagraphElement)
    }
})