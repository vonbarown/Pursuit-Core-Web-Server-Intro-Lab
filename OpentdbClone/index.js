let select;
let correctOption;
let currQues = 0;
// let data;

document.addEventListener('DOMContentLoaded', () => {
    getServerButton().addEventListener('click', loadDataFromServer)
})

function getServerButton() {
    return document.querySelector("#serverButton")
}

async function loadDataFromServer() {
    const myURL = "http://localhost:3000/"
    const resp = await axios.get(myURL)
    // return resp.data.results
    displayResponseFromServer(resp.data.results)
}

function displayResponseFromServer(response) {
    clearScreen()
    console.log(response)
    getAnswers(response)
    let cardContainer = document.querySelector('#cardContainer')

}

const getAnswers = (data) => {
    iterateQuestion(data)
    console.log(data);
    let answersArray = []
    correctOption = data[currQues].correct_answer
    answersArray.push(data[currQues].correct_answer)
    data[currQues].incorrect_answers.forEach(element => {
        answersArray.push(element)
    });
    console.log(currQues);
    answersArray.forEach(el => {
        createOptions(el)
    })
}

const createOptions = async (el) => {
    select = document.querySelector('select')
    console.log();
    let options = document.createElement('option')
    options.value = el
    options.innerText = el
    select.appendChild(options)
}

const getSelectedMovie = select => select.options[select.selectedIndex]

const iterateQuestion = (data) => currQues === data.length - 1 ? currQues = 0 : currQues++

const multipleChoice = () => {

}

const clearScreen = () => {
    select = document.querySelector('select')
    select.innerText = '';
    let container = document.querySelector('#questionContainer')
    while (container.firstChild) {
        container.removeChild(container.firstChild)
    }
}