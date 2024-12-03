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

  //다음줄로 이동
  const nextLine = () => {
    if (attempts === 6) return gameover();
    attempts += 1;
    index = 0;
  };

  //게임오버
  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    clearInterval(timer);
  };

  //엔터키 입력 처리
  const handleEnterKey = () => {
    let correct_num = 0;
    // 입력된 글자가 정답이고 위치도 정확하면 초록색 정답이고 위치는 다르면 노란색 오답이면 진한회색
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-column[data-index='${attempts}${i}']`
      );
      const inputLetter = block.innerText;
      const answerLetter = answer[i];
      if (inputLetter === answerLetter) {
        correct_num += 1;
        block.style.background = "#6aaa64"; // 초록색
      } else if (answer.includes(inputLetter)) {
        block.style.background = "#c9b458"; // 노란색
      } else {
        block.style.background = "#787c7e"; // 회색
      }

      block.style.color = "white"; // 텍스트 색상 설정
      keyboardColor(inputLetter); // 키보드 색상 업데이트
    }

    if (correct_num === 5) {
      flipBoard(); // 정답을 맞췄을 때 보드 뒤집기
      gameover();
    } else nextLine();
  };

  //백스페이스 처리
  const hadleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-column[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };

  //키보드 입력 처리
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

  //키보드 색상 업데이트
  const keyboardColor = (inputLetter) => {
    const keyButton = document.querySelector(`[data-key='${inputLetter}']`);
    if (!keyButton) return;

    if (answer.includes(inputLetter)) {
      keyButton.style.background = "#6aaa64";
      keyButton.style.borderColor = "#6aaa64";
    } else {
      keyButton.style.background = "#787c7e";
      keyButton.style.borderColor = "#787c7e";
    }
  };

  //마우스 클릭 이벤트 처리
  const clickKey = (e) => {
    const thisBlock = document.querySelector(
      `.board-column[data-index="${attempts}${index}"]`
    );
    const dataKey = e.target.dataset.key;

    if (dataKey === "Backspace") hadleBackspace();
    else if (index === 5) {
      if (dataKey === "Enter") handleEnterKey();
      else return;
    } else if (dataKey.length < 2) {
      thisBlock.innerText = e.target.innerText;
      index += 1;

      keyboardColor(e.target.innerText); // 키보드 색상 업데이트
    }
  };

  //키보드 클릭 이벤트 리스너 추가
  const keyBlocks = document.querySelectorAll(".keyboard-column");
  for (let keyBlock of keyBlocks) {
    keyBlock.addEventListener("click", clickKey);
  }

  //타이머 시작
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

  // 정답을 맞췄을 때 보드를 뒤집는 함수
  const flipBoard = () => {
    const allBlocks = document.querySelectorAll(".board-column"); // 모든 칸을 선택

    let delay = 0;
    allBlocks.forEach((block) => {
      setTimeout(() => {
        block.classList.add("flipped"); // 뒤집기 애니메이션 적용
      }, delay);
      delay += 100; // 각 칸마다 100ms씩 지연
    });
  };
}

appStart();