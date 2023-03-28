// Getting All Reqired Element
const start = document.querySelector(".start-btn"),
  rulesBox = document.querySelector(".info-box"),
  rulesQuit = rulesBox.querySelector(".quit"),
  rulesRestart = rulesBox.querySelector(".restart"),
  quizBox = document.querySelector(".quiz-box"),
  nextQue = document.querySelector(".next-btn"),
  resultBox = document.querySelector(".result-box"),
  replayQuiz = resultBox.querySelector(".restart"),
  quitQuiz = resultBox.querySelector(".quit"),
  optionsList = document.querySelector(".optins-list"),
  points = document.querySelector(".points"),
  timeLeft = document.querySelector(".time-sec"),
  answer = document.querySelectorAll(".answer"),
  scoreSpan = document.querySelector(".score-text span:first-child");
  console.log(scoreSpan);
  let questions = [
    {
      num: 1,
      question: "What does HTML stand for?",
      answer: "Hyper Text Markup languge",
      options: [
        "Hyper Text Preprocessor",
        "Hyper Text Markup languge",
        "Hyper Text Multiple languge",
        "Hyper Text Tool Multi languge",
      ],
    },
    {
      num: 2,
      question: "Why We Use < br> Element?",
      answer: "To Add Breakline",
      options: [
        "To Make Text Bold",
        "To Make Horizontal Line",
        "To Add Breakline",
        "To Make Text Italic",
      ],
    },
    {
      num: 3,
      question: "Is <img> Element Has Attribute href?",
      answer: "No Its For Anchor Tag < a >",
      options: [
        "Yes",
        "No Its For Anchor Tag < a >",
        "All Element Has This Attribute",
        "Answer 1 And 3 Are Right",
      ],
    },
    {
      num: 4,
      question: "What Is The Element Thats Not Exists In Html5 Semantics?",
      answer: "< blockquote >",
      options: ["< article >", "< section >", "< blockquote >", "< aside >"],
    },
    {
      num: 5,
      question: "In Html Can We Use This Way To Add Attributes?",
      answer: "All Answer Is Right",
      options: [
        "< div class='class-name'> ",
        "< div class=class-name> ",
        '< div class="class-name"> ',
        `All Answer Is Right`,
      ],
    },
  ];
// If Start Quiz button clicked
start.onclick = () => {
  rulesBox.classList.add("active");
};

// If Exit Quiz button clicked
rulesQuit.onclick = () => {
  rulesBox.classList.remove("active");
};

// If continue Quiz button clicked
rulesRestart.onclick = () => {
  rulesBox.classList.remove("active");
  quizBox.classList.add("active");
  showQuestions(0);
};

let queCount = 0;
// Getting Questions And Options From Array
function showQuestions(index) {
  const question = document.querySelector(".quest"),
    questionTag = `<span>${questions[index].question}</span>`;
  question.innerHTML = questionTag;
  questions[index].options.forEach((element, i) => {
    answerTag = `<span>${element}</span>`;
    answer[i].innerHTML = answerTag;
  });
  let rightAns = `<div class="icons tick"><i class="fas fa-check"></i></div>`,
    wrongAns = `<div class="icons times"><i class="fas fa-times"></i></div>`;
  for (let i = 0; i < answer.length; i++) {
    answer[i].onclick = function () {
      optionsList.classList.add("events");
      if (answer[i].innerText === questions[index].answer) {
        answer[i].innerHTML += rightAns;
        answer[i].classList.add("correct");
        points.innerText = Number.parseInt(points.innerText) + 1;
      } else {
        answer[i].innerHTML += wrongAns;
        answer[i].classList.add("wrong");
        correctAns(index, rightAns);
      }
    };
    answer[i].classList.remove("correct");
    answer[i].classList.remove("wrong");
    optionsList.classList.remove("events");
  }
  // Controll Quiz Time Left
  function timer() {
    timeLeft.innerHTML = parseInt(timeLeft.innerHTML) - 1;
    if (timeLeft.innerText === "0") {
      optionsList.classList.add("events");
      correctAns(index, rightAns);
      clearInterval(counter);
    }
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("answer")) {
        clearInterval(counter);
      } else if (e.target.classList.contains("next-btn")) {
        clearInterval(counter);
      }
    });
  }
  let counter = setInterval(timer, 1000);
}

//Show Right Answer If Time Out Or Answer Clicked Is Wrong
function correctAns(i, right) {
  answer.forEach((element) => {
    if (element.innerText === questions[i].answer) {
      element.innerHTML += right;
      element.classList.add("correct");
    }
  });
}

// Show Quiz Result
function quizResult() {
  console.log(points.innerText);
  let scores = points.innerText;
  let scoreSpan = document.querySelector(".score-text span:first-child");
  scoreSpan.innerText = scores;
  // if(Number.parseInt(scoreSpan.innerText) < 3) {
  //     scoreText.innerText += " Sorry, You Should Study More.";
  // }
  // switch(scoreSpan.innerText) {
  //     case "0":
  //     case "1":
  //     case "2":
  //         break;
  //     case "3":
  //         scoreText.innerText += " ,Successful effort.";
  //         break;
  //     case "4":
  //         scoreText.innerText += " ,Well Done 😄 ";
  //         break;
  //     case "5":
  //         scoreText.innerText += " ,Excellent! 😉";
  //         break;
  // }
}

// If Next Quest button clicked
nextQue.onclick = () => {
  timeLeft.innerText = "15";
  if (queCount < questions.length - 1) {
    queCount += 1;
    showQuestions(queCount);
  } else {
    quizResult();
    quizBox.classList.remove("active");
    resultBox.classList.add("active");
  }
};

// If Replay Quiz button clicked
replayQuiz.onclick = () => {
  resultBox.classList.remove("active");
  quizBox.classList.add("active");
  queCount = 0;
  showQuestions(0);
  points.innerText = "0";
};

// If Quit Quiz button clicked
quitQuiz.onclick = () => {
  resultBox.classList.remove("active");
  queCount = 0;
  points.innerText = "0";
};
