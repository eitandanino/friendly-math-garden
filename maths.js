var answer;
var score = 0;
var backgourdImages = [];

function nextQuestion() {
  const n1 = Math.ceil(Math.random() * 5);
  document.getElementById("n1").innerHTML = n1;

  const n2 = Math.floor(Math.random() * 5);
  document.getElementById("n2").innerHTML = n2;

  answer = n1 + n2;
}

async function checkAnswer() {
  const prediction = await predictImage();
  if (prediction == answer) {
    score++;
    if (score <= 6) {
      backgourdImages.push(`url('images/background${score}.svg')`);
    } else {
      alert("Well done! Your math garden is at full bloom!");
      score = 0;
      backgourdImages = [];
    }
    document.body.style.backgroundImage = backgourdImages;
  } else {
    if (score != 0) {
      score--;
    }
    backgourdImages.pop();
    document.body.style.backgroundImage = backgourdImages;
  }
  nextQuestion();
}
