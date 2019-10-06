document.addEventListener('DOMContentLoaded', () => {
    getServerButton().addEventListener('click', loadDataFromServer)
})

function getServerButton() {
    return document.querySelector("#serverButton")
}

async function loadDataFromServer() {
    const myURL = "http://localhost:3000/"
    const resp = await axios.get(myURL)
    displayResponseFromServer(resp.data)
}

function displayResponseFromServer(data) {
    clearScreen()
    console.log(data.results[0].name.title)

    let cardContainer = document.querySelector('#cardContainer')
    data.results.forEach(el => {
        let card = document.createElement('div');
        let container = document.createElement('div');
        card.className = 'card';
        container.className = 'container'
        let img = document.createElement('img')
        img.src = "https://4848.cupe.ca/files/2019/08/black-profile-pic-.jpg"
        img.alt = "Avatar"


        console.log(el);

        let nationality = document.createElement('p')
        let lastName = document.createElement('p')
        let titleAndFirstName = document.createElement('h3')

        titleAndFirstName.innerText = `${el.name.title}: ${el.name.first}`
        lastName.innerText = el.name.last
        nationality.innerText = `Nationality: ${el.nat}`

        container.append(img, titleAndFirstName, lastName, nationality);
        card.appendChild(container)
        cardContainer.appendChild(card)
    });
}

const clearScreen = () => {
    let container = document.querySelector('#cardContainer')
    while (container.firstChild) {
        container.removeChild(container.firstChild)
    }
}