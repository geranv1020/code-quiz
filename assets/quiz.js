var secondsLabel = document.getElementById("seconds");
var totalSeconds = 76;
setInterval(setTime, 1000);

function setTime() {
  --totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 76);
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const scoreText = document.querySelector('#score');

let currentQuestion = {}
let acceptingAnswers = true
let availableQuestions = []
let score = 0

let questions = [
    {
        question: "Commonly used data types DO Not Include:",
        choice: 'strings',
        choice2: 'booleans',
        choice3: 'alerts',
        choice4: 'numbers',
        answer: 3,
    },
    {
        question: "String values must be enclosed within ______ when being assigned to variables.",
        choice: 'commas',
        choice2: 'curly brackets',
        choice3: 'quotes',
        choice4: 'parenthesis',
        answer: 3,
    },
    {
        question: "The condition in an if / else statement is enclosed with ________.",
        choice: 'quotes',
        choice2: 'curly brackets',
        choice3: 'parenthesis',
        choice4: 'square brackets',
        answer: 3,
    },
    {
        question: "Arrays in JavaScript can be used to store _______.",
        choice: 'numbers and strings',
        choice2: 'other arrays',
        choice3: 'booleans',
        choice4: 'all of the above',
        answer: 4,
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choice: 'JavaScript',
        choice2: 'terminal/bash',
        choice3: 'for loops',
        choice4: 'console.log',
        answer: 4,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestions()
}

getNewQuestions = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/high-score.html')
    }

    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availibleQuestions[questionIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectChoice = e.target
        const selectedAnswer = selectChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
        'incorrect'

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)

    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()