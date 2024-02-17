const quizData = [
  {
    question: 'What is 250 x 4?',
    options: ['750', '1000', '100', '500'],
    answer: '1000',
    explanation :' To find the product of two numbers, we multiply them together. In this case, we need to multiply 250 by 4. When we do that, we get 1000. Therefore, the correct answer is 1000',
  },
  {
    question: 'Factorize the expression 2x^2 - 5x - 3',
    options: ['(2x - 6)(x + 1)', '(2x + 3)(x - 1)', '(2x + 1)(x - 3)', '(2x - 1)(x + 3)'],
    answer: '(2x - 6)(x + 1)',
    explanation :'To factorize the expression 2x^2 - 5x - 3, we need to find two binomials that multiply to give this expression. We can use the ac-method or trial and error method. After some calculations, we find that (2x - 6)(x + 1) gives the original expression when multiplied. Therefore, the correct answer is (2x - 6)(x + 1)',
  },
  {
    question: 'What is the simplified form of 6(3x + 4) - (2x - 1)?',
    options: ['20x + 23', '16x + 6', '18x + 5', '20x + 5'],
    answer: '20x + 5',
    explanation :'To simplify the expression, we distribute the 6 and simplify the parentheses:6(3x + 4) - (2x - 1) = 18x + 24 - 2x + 1 = 16x + 25',
  },
  {
    question: 'What is name of the chart pictured below?',
    image: 'bar.jpg'
    options: ['Line Graph', 'Pie Chart', 'Bar Chart', 'Line Plot'],
    answer: 'Bar Chart',
    explanation :'the values are displayed in bars',
  },
  {
    question: 'If x is a positive integer in the equation 12x = q, then q must be',
    options: [
      'a positive even integer',
      'a negative even integer',
      'a positive odd integer',
      'a negative odd integer',
    ],
    answer: 'a positive even integer',
    explanation :'At first glance, this problem appears quite complex. But plug in some numbers and see what happens. For instance, first plug in 1 (the simplest positive integer) for x 12x = q -->12(1) = q -->12 = q Now try 2, then q would be 24 = q',
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
    imageElement.className = 'question-image';
    imageElement.style.width = '200px'; // Adjust the width as needed
  imageElement.style.height = 'auto';
    questionElement.appendChild(imageElement);
  }

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

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
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
        explanations: quizData[currentQuestion].explanation,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';
  showMain.style.display = 'inline-block'


  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}<br>
        <strong> Explanation :</strong> ${incorrectAnswers[i].explanations}

      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

function redirect(){
  
    window.location.href = "index.html"; 
}
submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);
showMain.addEventListener('click', redirect);

displayQuestion();