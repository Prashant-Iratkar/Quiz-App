//----questions and answer in object form----//
const questions = [
    {
        question : "Which is largest animal in the world ?",
        answers : [
            {text: "Shark", correct: false},
            {text: "Blue Whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false},
        ]
    },
    {
        question : "Which is the Capital Of India ?",
        answers : [
            {text: "Chandigad", correct: false},
            {text: "Ayodhay", correct: false},
            {text: "Delhi", correct: true},
            {text: "Nagpur", correct: false},
        ]
    },
    {
        question : "Which is the Financial Capital Of India ?",
        answers : [
            {text: "Mumbai", correct: true},
            {text: "Ayodhay", correct: false},
            {text: "Delhi", correct: false},
            {text: "Nagpur", correct: false},
        ]
    },
    {
        question : "Which is the National Bird Of India ?",
        answers : [
            {text: "Duck", correct: false},
            {text: "Crow", correct: false},
            {text: "Parrot", correct: false},
            {text: "Peacock", correct: true},
        ]
    }
];

//----declare variables to access elements dynamically---//
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

//---for question number and score---//
let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

//----to show current question and number---//
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

//----display the answer---//
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        //----it is add true or false from data set---//
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    })
}

//----for reset previous questions and answer----//
function  resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

//----after click on the button for show right or wrong----//
function selectAnswer(e){
    const selectedBtn = e.target;
    const iscorrect = selectedBtn.dataset.correct === "true";
    if(iscorrect){
        selectedBtn.classList.add("correct");
        score++; // it will increse the score by 1
    }
    else{
        selectedBtn.classList.add("incorrect");
    }

//-----for chainging the color of button after clicking---//
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

//---for display the score--//
function showScore() {
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!!!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

//---to handel the next button for next question---//
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz();