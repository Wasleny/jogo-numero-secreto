let listDrawnNumbers = [];
let maxNumber = 10;
let secretNumber = generateRandomNumber();
let amountAttempt = 1;

function showTextOnScreen(tag, text) {
  let field = document.querySelector(tag);
  field.innerHTML = text;
  responsiveVoice.speak(text, "Brazilian Portuguese Female", { rate: 1.2 });
}

function showInitialMessage() {
  showTextOnScreen("h1", "Jogo do número secreto");
  showTextOnScreen("p", `Escolha um número entre 1 e ${maxNumber}`);
}

showInitialMessage();

function checkAttempt() {
  let attempt = document.querySelector("input").value;

  if (attempt == secretNumber) {
    let wordAttempt = amountAttempt > 1 ? "tentativas" : "tentativa";
    let messageAttempts = `Você descobriu o número secreto com ${amountAttempt} ${wordAttempt}!`;
    showTextOnScreen("h1", "Acertou!");
    showTextOnScreen("p", messageAttempts);

    document.getElementById("restart").removeAttribute("disabled");
  } else {
    if (attempt > secretNumber) {
      showTextOnScreen("p", "O número secreto é menor");
    } else {
      showTextOnScreen("p", "O número secreto é maior");
    }

    amountAttempt++;
    clearInput();
  }
}

function generateRandomNumber() {
  let number = parseInt(Math.random() * maxNumber + 1);

  if (listDrawnNumbers.length == maxNumber) {
    listDrawnNumbers = [];
  }
  if (listDrawnNumbers.includes(number)) {
    return generateRandomNumber();
  } else {
    listDrawnNumbers.push(number);
    return number;
  }
}

function clearInput() {
  document.querySelector("input").value = "";
}

function restartGame() {
  secretNumber = generateRandomNumber();
  clearInput();
  amountAttempt = 1;
  showInitialMessage();
  document.getElementById("restart").setAttribute("disabled", true);
}
