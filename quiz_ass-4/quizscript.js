const allQuestions = document.querySelectorAll(".singleQuestion");
const nextQuestionButton = document.getElementById("nextQuestionButton");
const previousQuestionButton = document.getElementById("previousQuestionButton");
const submitQuizButton = document.getElementById("submitQuizButton");
const resetQuizButton = document.getElementById("resetQuizButton");
const finalScoreDisplay = document.getElementById("finalScoreDisplay");
const timeRemainingDisplay = document.getElementById("timeRemainingDisplay");

const correctAnswerList = ["a", "b", "a", "b", "b"];

let currentVisibleQuestionIndex = 0;
let totalTimeRemaining = 60;
let countdownTimer;

function showCurrentQuestion(questionIndex) {
    allQuestions.forEach(question => question.classList.remove("activeQuestion"));
    allQuestions[questionIndex].classList.add("activeQuestion");
}

function startCountdownTimer() {
    countdownTimer = setInterval(() => {
        totalTimeRemaining--;
        timeRemainingDisplay.textContent = totalTimeRemaining;

        if (totalTimeRemaining <= 0) {
            clearInterval(countdownTimer);
            calculateAndShowScore();
        }
    }, 1000);
}

function calculateAndShowScore() {
    clearInterval(countdownTimer);
    let totalScore = 0;

    allQuestions.forEach((questionBlock, questionIndex) => {
        const selectedOption = document.querySelector(`input[name="question${questionIndex}"]:checked`);
        const allOptions = questionBlock.querySelectorAll("label");

        allOptions.forEach(option => {
            option.classList.remove("correctAnswer", "wrongAnswer");
        });

        if (selectedOption) {
            if (selectedOption.value === correctAnswerList[questionIndex]) {
                totalScore++;
                selectedOption.parentElement.classList.add("correctAnswer");
            } else {
                selectedOption.parentElement.classList.add("wrongAnswer");

                allOptions.forEach(option => {
                    if (option.querySelector("input").value === correctAnswerList[questionIndex]) {
                        option.classList.add("correctAnswer");
                    }
                });
            }
        }
    });

    finalScoreDisplay.textContent = "Your Score: " + totalScore + " / 5";
}

function resetEntireQuiz() {
    clearInterval(countdownTimer);
    document.getElementById("quizForm").reset();
    finalScoreDisplay.textContent = "";
    totalTimeRemaining = 60;
    timeRemainingDisplay.textContent = totalTimeRemaining;

    allQuestions.forEach(questionBlock => {
        const allOptions = questionBlock.querySelectorAll("label");
        allOptions.forEach(option => {
            option.classList.remove("correctAnswer", "wrongAnswer");
        });
    });

    currentVisibleQuestionIndex = 0;
    showCurrentQuestion(currentVisibleQuestionIndex);
    startCountdownTimer();
}

nextQuestionButton.addEventListener("click", () => {
    if (currentVisibleQuestionIndex < allQuestions.length - 1) {
        currentVisibleQuestionIndex++;
        showCurrentQuestion(currentVisibleQuestionIndex);
    }
});

previousQuestionButton.addEventListener("click", () => {
    if (currentVisibleQuestionIndex > 0) {
        currentVisibleQuestionIndex--;
        showCurrentQuestion(currentVisibleQuestionIndex);
    }
});

submitQuizButton.addEventListener("click", calculateAndShowScore);
resetQuizButton.addEventListener("click", resetEntireQuiz);

showCurrentQuestion(currentVisibleQuestionIndex);
startCountdownTimer();