const quizData = [
  {
    question: 'What is name of the chart pictured below?',
    image: 'bar.jpg',
    options: ['Line Graph', 'Pie Chart', 'Bar Chart', 'Line Plot'],
    answer: 'Bar Chart',
    explanation: 'the values are displayed in bars',
  },
  {
    question: 'Factorize the expression 2x^2 - 5x - 3',
    options: ['(2x - 6)(x + 1)', '(2x + 3)(x - 1)', '(2x + 1)(x - 3)', '(2x - 1)(x + 3)'],
    answer: '(2x - 6)(x + 1)',
    explanation: 'To factorize the expression 2x^2 - 5x - 3, we need to find two binomials that multiply to give this expression. We can use the ac-method or trial and error method. After some calculations, we find that (2x - 6)(x + 1) gives the original expression when multiplied. Therefore, the correct answer is (2x - 6)(x + 1)',
  },
  {
    question: 'What is the simplified form of 6(3x + 4) - (2x - 1)?',
    options: ['20x + 23', '16x + 6', '18x + 5', '20x + 5'],
    answer: '20x + 5',
    explanation: 'To simplify the expression, we distribute the 6 and simplify the parentheses:6(3x + 4) - (2x - 1) = 18x + 24 - 2x + 1 = 16x + 25',
  },
  
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');
const showMain = document.getElementById('mainPage');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  if (questionData.image) {
    const imageElement = document.createElement('img');
    imageElement.src = questionData.image;
    imageElement.style.width = '200px'; // Adjust the width as needed
  imageElement.style.height = 'auto';
  imageElement.style.display = 'block';
  imageElement.style.margin = '0 auto';
    imageElement.className = 'question-image';
    questionElement.appendChild(imageElement);
  }

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';
  optionsElement.style.textAlign = 'left';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);

  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion === quizData.length) {
      displayResult();
    } else {
      displayQuestion();
    }
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  resultContainer.style.display = 'block';
  resultContainer.style.width = '100%';

  
  const scoreElement = document.createElement('p');
  scoreElement.innerHTML = `You scored ${score} out of ${quizData.length} questions.`;
  resultContainer.appendChild(scoreElement);
  resultContainer.style.textAlign = 'left';

  if (incorrectAnswers.length > 0) {
    const incorrectAnswersElement = document.createElement('div');
    incorrectAnswersElement.className = 'incorrect-answers';

    const headingElement = document.createElement('h2');
    headingElement.innerHTML = 'Incorrect Answers:';
    incorrectAnswersElement.appendChild(headingElement);

    for (let i = 0; i < incorrectAnswers.length; i++) {
      const questionElement = document.createElement('p');
      questionElement.innerHTML = incorrectAnswers[i].question;
      questionElement.style.fontWeight = '900';

      const incorrectAnswerElement = document.createElement('p');
      incorrectAnswerElement.innerHTML = `Your answer: ${incorrectAnswers[i].incorrectAnswer}`;
      incorrectAnswerElement.style.color = 'red';

      const correctAnswerElement = document.createElement('p');
  correctAnswerElement.innerHTML = `Correct answer: ${quizData[i].answer}`
  correctAnswerElement.style.color = 'green';

      const explanationElement = document.createElement('p');
      explanationElement.innerHTML = `Explanation: ${quizData[i].explanation}`;

      incorrectAnswersElement.appendChild(questionElement);
      incorrectAnswersElement.appendChild(incorrectAnswerElement);
      incorrectAnswersElement.appendChild(correctAnswerElement);
      incorrectAnswersElement.appendChild(explanationElement);
    }
    
    resultContainer.appendChild(incorrectAnswersElement);

  }



  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';
  showMain.style.display = 'inline-block';
  
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  resultContainer.innerHTML = '';
  quizContainer.style.display = 'block';
  submitButton.style.display = 'block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
showMain.style.display = 'none';
  displayQuestion();
}

function showAnswer() {
  const explanationElement = document.createElement('p');
  explanationElement.innerHTML = `Explanation: ${quizData[currentQuestion].explanation}`;
explanationElement.style.textAlign = 'left';
  resultContainer.appendChild(explanationElement);
  showAnswerButton.style.display = 'none';

}

function redirect(){
  
    window.location.href = "index.html"; 
}



submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);
showMain.addEventListener('click', redirect);
displayQuestion();