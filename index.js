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
    console.log(data.results[0].name.title)

    data.results.forEach(el => {
        let card = document.createElement('div');
        let container = document.createElement('div');
        card.className = 'card';
        container.className = 'container'
        let img = document.createElement('img')
        img.src = "https://4848.cupe.ca/files/2019/08/black-profile-pic-.jpg"
        img.alt = "Avatar"


        console.log(el);

        let title = document.createElement('p')
        let first = document.createElement('strong')
        let lastName = document.createElement('p')
        let titleAndFirstName = document.createElement('p')

        first.innerText = el.name.first
        title.innerText = `${el.name.title}: `
        title.append(first)
        lastName.innerText = el.name.last

        container.append(img, title, lastName);
        card.appendChild(container)
        document.body.appendChild(card)
    });
}