const answer = "APPLE";

let index = 0;
let attempts = 0;
let timer;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료되었습니다.";
    div.style =
      "display:flex;justify-content:center;align-items:center;position:absolute;top:40vh;left:46vw;background-color:white;width:200px;height:50px;";
    document.body.appendChild(div);
  };
  const nextLine = () => {
    if (attempts === 6) return gameover();
    attempts += 1;
    index = 0;
  };
  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    clearInterval(timer);
  };
  const handleEnterKey = () => {
    let correct_num = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-column[data-index='${attempts}${i}']`
      );
      const inputLetter = block.innerText;
      const answerLetter = answer[i];
      if (inputLetter === answerLetter) {
        correct_num += 1;
        block.style.background = "#6aaa64";
      } else if (answer.includes(inputLetter))
        block.style.background = "#c9b458";
      else block.style.background = "#787c7e";

      block.style.color = "white";
    }
    if (correct_num === 5) gameover();
    else nextLine();
  };
  const hadleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-column[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };
  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-column[data-index='${attempts}${index}']`
    );
    if (event.key === "Backspace") hadleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (keyCode >= 65 && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
    }
  };
  const startTimer = () => {
    const start_time = new Date();

    function setTime() {
      const present_time = new Date();
      const flow_time = new Date(present_time - start_time);
      const min = flow_time.getMinutes().toString().padStart(2, "0");
      const sec = flow_time.getSeconds().toString().padStart(2, "0");
      const timeDiv = document.querySelector("#time");
      timeDiv.innerText = `${min}:${sec}`;
    }
    timer = setInterval(setTime, 1000);
  };
  startTimer();
  window.addEventListener("keydown", handleKeydown);
}

appStart();
