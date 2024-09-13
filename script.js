let questions = [
    {
        question : "Which HTML element is used to embed an image in a webpage?",
        choices : [
            "<picture>",
            "<img>",
            "<figure>",
            "<media>"
        ],
        correctAnswer : "<img>"
    },
    {
        question : "Which HTML attribute is used to define inline styles?",
        choices : [
            "<style>",
            "<class>",
            "<id>",
            "<src>"
        ],
        correctAnswer : "<style>"
    },
    {
        question : "Which HTML element is used to create an unordered list?",
        choices : [
            "<ol>",
            "<li>",
            "<ul>",
            "<list>"
        ],
        correctAnswer : "<ul>"
    },
    {
        question : "Which CSS property is used to make the text italic?",
        choices : [
            "text-decoration: italic;",
            "font-style: italic;",
            "font-weight: italic;",
            "text-transform: italic;"
        ],
        correctAnswer : "font-style: italic;"
    },
    {
        question : "In CSS, how can you make an element's text bold?",
        choices : [
            "font-style: bold;",
            "font-weight: bold;",
            "text-decoration: bold;",
            "font-size: bold;"
        ],
        correctAnswer : "font-weight: bold;"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById('question');
const choiceButtons = document.querySelectorAll('.choice');
const feedbackElement = document.getElementById('feedback');
const nextButton = document.getElementById('next-question');
const scoreElement = document.getElementById('score');


function loadQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    for (let i = 0; i < choiceButtons.length; i++) {
        choiceButtons[i].textContent = currentQuestion.choices[i];
        choiceButtons[i].onclick = selectAnswer;  
    }
}

function resetState() {
    feedbackElement.textContent = '';
    nextButton.style.display = 'none';
    for (let i = 0; i < choiceButtons.length; i++) {
        choiceButtons[i].disabled = false;
        choiceButtons[i].style.backgroundColor = '#007BFF';
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const selectedAnswer = selectedButton.textContent;
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;

    if (selectedAnswer === correctAnswer) {
        selectedButton.style.backgroundColor = '#28a745';
        feedbackElement.textContent = 'Correct!';
        score++;
        scoreElement.textContent = `Score: ${score}`;
    } else {
        selectedButton.style.backgroundColor = '#dc3545';
        feedbackElement.textContent = 'Try Again!';
    }

    for (let i = 0; i < choiceButtons.length; i++) {
        choiceButtons[i].disabled = true;
    }

    nextButton.style.display = 'block';
}


function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showEndScreen();
    }
}

function showEndScreen() {
    questionElement.textContent = `Quiz Complete! You scored ${score} out of ${questions.length}.`;
    choiceButtons.forEach(button => button.style.display = 'none');
    nextButton.textContent = 'Play Again';
    nextButton.addEventListener('click', restartQuiz);
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.textContent = `Score: ${score}`;
    nextButton.textContent = 'Next Question';
    choiceButtons.forEach(button => button.style.display = 'block');
    loadQuestion();
}

nextButton.addEventListener('click', nextQuestion);

document.addEventListener('keydown', (e) => {
    const key = e.key;
    if (key >= 1 && key <= 4) {
        const buttonIndex = key - 1;
        choiceButtons[buttonIndex].click();
    }
 });

loadQuestion();
