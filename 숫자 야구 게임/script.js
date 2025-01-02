/*  변하는 변수들은 let, 변하지않는 변수들은 const로 설정하기
    함수 or 변수 이름 알아보기 쉽도록 신경쓰기 
    alert 활용하기, 최대한 자세한 주석 작성 */

let attempts = 9; // 시도 횟수 9번 
let correctNumber = createRandomNumber(); // 컴퓨터가 임의로 정답 생성 

const resultDiv = document.getElementById('results');       // HTML에서 id = results 가져오기      
const attemptsSpan = document.getElementById('attempts');   // HTML에서 id = attempts 가져오기   
const gameResultImg = document.getElementById('game-result-img'); // HTML에서 id = game-result-img 가져오기   

attemptsSpan.textContent = attempts;

function createRandomNumber() {   // 랜덤 숫자 생성 함수 
    const numbers = new Set();      // Set을 통하여 중복 방지 
    while (numbers.size < 3) {      // 중복되지 않는 0~9 사이 3개의 숫자 랜덤 생성 
        numbers.add(Math.floor(Math.random() * 10));
    }
    console.log("정답 숫자:", Array.from(numbers)); // 내가 계속 시도해보기 힘들어서 콘솔에 정답 보이도록 설정,,,,
    return Array.from(numbers);
}

function check_numbers() {
    const number1 = document.getElementById('number1').value;   // 각각 입력한 input 값 가져오기
    const number2 = document.getElementById('number2').value;
    const number3 = document.getElementById('number3').value;

    // 입력값 검증
    if (number1 === "" || number2 === "" || number3 === "") {     // input에 하나라도 숫자가 입력되지 않으면 alert 창 띄우고 input 입력 초기화
        alert('모든 칸에 숫자를 입력해주세요.');
        clearInputs();
        return;
    }

    const userInput = [parseInt(number1), parseInt(number2), parseInt(number3)]; // 사용자가 입력한 input들 정수로 변환 후 배열로 저장 

    if (new Set(userInput).size !== 3) {    // input에 중복 된 숫자 입력 못하도록 하는 로직 추가
        alert('중복된 숫자는 입력할 수 없습니다.');
        clearInputs();
        return;
    }

    let strikes = 0;
    let balls = 0;
    const checkNumber = new Set(); // 이미 처리된 정답 숫자 인덱스를 저장하여 중복 방지

    userInput.forEach((num, index) => {
        if (num === correctNumber[index]) { // 숫자와 위치가 모두 맞으면 스크라이크 
            strikes++;
            checkNumber.add(index); // 스트라이크로 처리된 인덱스 저장
        }
    });

    userInput.forEach((num, index) => { 
        if (num !== correctNumber[index] && correctNumber.includes(num)) { // 숫자가 같은 위치에 없고 정답에 있다면 
            const targetNumber = correctNumber.indexOf(num);
            if (!checkNumber.has(targetNumber)) {   // 이미 스크라이크로 처리 됐으면 제외하기 
                balls++;
                checkNumber.add(targetNumber); // 볼로 처리된 인덱스도 저장
            }
        }
    });

    console.log(`입력값: ${userInput}, 스트라이크: ${strikes}, 볼: ${balls}`);  // 보기 편하도록 콘솔에도 입력한 결과들 출력 

    let resultMessage = '';
    if (strikes === 0 && balls === 0) {   // 0 스크라이크 0 볼이면 O 출력
        resultMessage = '<span class="num-result out">O</span>';  // .out css 적용 
    } else {  // 맞은 스크라이크,볼 개수 출력
        resultMessage = `<span class="num-result strike">${strikes}S</span> <span class="num-result ball">${balls}B</span>`;  // .strike, .ball css 적용 
    }

    const resultBox = `<div style="margin-bottom: 20px;">${userInput.join('')} : ${resultMessage}</div>`; // 결과들 너무 붙어있어서 margin-bottom 추가 
    resultDiv.innerHTML += resultBox;

    clearInputs(); // 입력값 초기화

    if (strikes === 3) {   // 3s 면 승리 
        endGame(true);
    } else {    // 아니면 남은 횟수 -1 씩
        attempts--;
        attemptsSpan.textContent = attempts;

        if (attempts === 0) {  // 시도 횟수 0이면 게임 실패
            endGame(false);
        }
    }
}

function clearInputs() {    // 각각의 input 초기화 후 첫번째 input에 포커스 적용하는 함수 
    document.getElementById('number1').value = '';
    document.getElementById('number2').value = '';
    document.getElementById('number3').value = '';
    document.getElementById('number1').focus();
}

function endGame(correct) {
    const message = correct ? '정답입니다!' : '틀렸습니다 ㅠㅠ 정답은 ' + correctNumber.join('') + '입니다.';   // 틀리면 정답이 뭔지 알려주는 로직 추가
    alert(message); 

    gameResultImg.src = correct ? 'success.png' : 'fail.png';  // 맞으면 성공 이미지 출력, 틀리면 실패 이미지 출력 

    document.querySelector('.submit-button').disabled = true;  // 정답 맞추면 확인하기 버튼 누르지 못하도록 설정 
}
