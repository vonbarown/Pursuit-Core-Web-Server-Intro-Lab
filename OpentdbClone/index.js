let select;
let correctOption;
let currQues = -1;


document.addEventListener('DOMContentLoaded', () => {
    getServerButton().addEventListener('click', loadDataFromServer)
    // multipleChoice()
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
    console.log(response)
    getAnswers(response)
    let select = document.querySelector('select')
    select.addEventListener('change', () => {
        multipleChoice()
    })
    // question(response)
    // multipleChoice()
}

const getAnswers = async (data) => {
    clearScreen()
    iterateQuestion(data)
    // console.log(data);
    let answersArray = []
    correctOption = data[currQues].correct_answer
    answersArray.push(data[currQues].correct_answer)
    data[currQues].incorrect_answers.forEach(element => {
        answersArray.push(element)
    });
    console.log(currQues);
    let shuffledArray = shuffleAnswers(answersArray)
    shuffledArray.forEach(el => {
        createOptions(el);
    })
    question(data)
}

const createOptions = (el) => {
    select = document.querySelector('select');
    console.log();
    let options = document.createElement('option');
    options.value = el;
    options.innerText = el;
    select.appendChild(options);
}

const getSelectedChoice = select => select.options[select.selectedIndex];

const iterateQuestion = (data) => currQues === data.length - 1 ? currQues = 0 : currQues++;

const shuffleAnswers = (arr) => {
    return arr.sort(() => Math.random() - 0.5);
}

const question = (data) => {
    let questionContainer = document.querySelector('#questionContainer')

    let questionTag = document.createElement('p');
    let category = document.createElement('p');
    let difficulty = document.createElement('p');
    let results = document.createElement('p');
    results.id = 'results'

    questionTag.innerText = `Question: ${data[currQues].question}`;
    category.innerText = `Category: ${data[currQues].category}`;
    difficulty.innerText = `Difficulty: ${data[currQues].difficulty}`;

    questionContainer.append(category, questionTag, difficulty, results)
}

const multipleChoice = () => {
    select = document.querySelector('select')
    let results = document.querySelector('#results')
    let opt = getSelectedChoice(select);
    console.log(opt);
    opt.value === correctOption ? results.innerText = `Congratulations you chose the correct answer: ${correctOption}` :
        results.innerText = `You chose the incorrect answer! \nThe correct answer is: ${correctOption}`;
}

const clearScreen = () => {
    select = document.querySelector('select');
    select.innerText = '';
    let container = document.querySelector('#questionContainer');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}