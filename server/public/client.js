

console.log('JS');

function getLibrary() {
    let div = document.querySelector('#library')
    div.innerHTML = ''
    axios.get('http://localhost:8000/books')
    .then((res) => res.data)
    .then((data) => {
        console.log(data)
        for(let book of data) {
            div.innerHTML += `<h3>${book.title} : ${book.text}</h3>`
        }
        
    })
}
function formSubmit(event) {
    event.preventDefault()
    let data = event.target.parentElement.querySelectorAll('input')
    let title = data[0].value
    let text = data[1].value
    console.log(data)
    axios.post('http://localhost:8000/books', {'title': title, 'text': text})
    .then((res) => {
        console.log(res.status)
    });
    getLibrary()
}

getLibrary()