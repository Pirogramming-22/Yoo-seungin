// 스톱워치 관련 변수
let stopwatchInterval;  // 스톱워치 정지, 재시작 관련
let stopwatchTime = 0;  // 스톱워치 경과 시간 (초기에는 0으로 설정)
let stopRun = false;    // 스톱워치 작동 여부 (처음엔 작동중이 아니니 false로 설정)
let records = [];       // 기록들을 담을 배열 생성

// 타이머 관련 변수 
let timerInterval;      // 타이머 정지, 재시작 관련
let timerTime = 0;      // 타이머 남은 시간 (버튼을 누르기 전에는 0)
let timerRun = false;   // 타이머 작동 여부 


const stopwatchDisplay = document.querySelector('.stopwatch .display');  // 스톱워치 표시
const timerDisplay = document.querySelector('.timer .display'); // 타이머 표시
const startStopBtn = document.getElementById('startStop');  // 스톱워치 시작,정지
const resetStopBtn = document.getElementById('resetStop');  // 스톱워치 초기화
const recordStopBtn = document.getElementById('recordStop');  // 스톱워치 기록
const recordList = document.getElementById('record-stop');    // 스톱워치 기록 목록
const selectDeleteBtn = document.getElementById('selectDelete');  // 선택 삭제
const deleteAllBtn = document.getElementById('deleteAll');    // 전체 삭제
const selectAllBtn = document.getElementById('selectAll');    // 전체 선택
const startTimerBtn = document.getElementById('startTimer');  // 타이머 시작,정지
const resetTimerBtn = document.getElementById('resetTimer');  // 타이머 리셋

// 스톱워치 시작 관련 함수 
function startStopwatch() {
  if (!stopRun) {   // 스톱워치가 작동 중이 아니라면 
    stopRun = true;   // 작동 상태로 변경하고 
    startStopBtn.textContent = '정지';    // 버튼 텍스트 정지로 변경
    stopwatchInterval = setInterval(() => { // setInterval을 통해 반복적으로 스톱워치 시간 증가 
      stopwatchTime += 10;    // 밀리초 단위로 시간 증가 
      updateDisplay(stopwatchDisplay, stopwatchTime);
    }, 10);
  } else {    // 작동 중이면
    stopRun = false;    // 정지 상태로 변경하고 
    startStopBtn.textContent = '시작';  // 버튼 텍스트 시작으로 변경 
    clearInterval(stopwatchInterval);   // clearInterval로 setInterval 정지 
  }
}

// 스톱워치 리셋 관련 함수 
function resetStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchTime = 0;  // 스톱워치 시간 초기화
  stopRun = false;    // 작동 상태도 초기화
  startStopBtn.textContent = '시작';  // 버튼 텍스트 시작으로 변경
  updateDisplay(stopwatchDisplay, stopwatchTime); // 화면 초기화 
}

// 스톱워치 기록 관련 함수 
function recordStopwatch() {  
  const recordTime = formatTimeStopwatch(stopwatchTime);
  records.push(recordTime);  // 기록 배열에 해당 기록 추가시킴
  updateRecordList();   // 기록 업데이트
}

// 목록 업데이트 관련 함수 
function updateRecordList() {
  recordList.innerHTML = '';   // 기존 목록 초기화 
  records.forEach((record, index) => {  // 기록 배열을 순회하기 위해 forEach 사용 
    const li = document.createElement('li');
    // 기록 관련 체크박스 밑 해당 기록을 보여주는 ui 생성 
    li.innerHTML = `  
      <input type="checkbox" id="record-${index}">   
      <label for="record-${index}">${record}</label>
    `;
    recordList.appendChild(li);  // 목록에 추가 
  });
}


// 선택 삭제 관련 함수 
function selectDelete() {
  // 체크함수 선택 
  const checkboxes = recordList.querySelectorAll('input[type="checkbox"]');
  records = records.filter((_, index) => !checkboxes[index].checked);  // 선택한 체크박스 항목 삭제 
  updateRecordList(); // 목록 업데이트 
}

// 전체 삭제 관련 함수 
function deleteAll() {
  records = [];   // records에 있는 전체 기록들 빈 배열로 만들어서 전체 삭제하기 
  updateRecordList(); // 목록 업데이트 
}

// 전체 선택 관련 함수 
function selectAll() {
  const checkboxes = recordList.querySelectorAll('input[type="checkbox"]');  // 체크박스 모두 선택 
  const allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked); // 전체 선택 여부 확인하기 
  checkboxes.forEach(checkbox => checkbox.checked = !allChecked); // 모두 선택 또는 모두 해제 
}

// 타이머 시작 관련 함수 
function startTimer() {
  if (!timerRun) {  // 타이머가 작동 중이 아니라면 
    const hours = parseInt(document.getElementById('hours').value) || 0;      // 시,분,초 가져와서 정수로 변환 
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;
    timerTime = hours * 3600 + minutes * 60 + seconds;

    if (timerTime > 0) { // 타이머 시간이 00:00:00 보다 크면 
      timerRun = true;  // 작동 상태로 변경 
      startTimerBtn.textContent = '정지'; // 버튼 텍스트 정지로 변경 
      updateDisplay(timerDisplay, timerTime, true);  // 화면 업데이트 
      timerInterval = setInterval(() => {
        if (timerTime > 0) {  
          timerTime--;  // 시간이 0이 될때까지 시간 감소 
          updateDisplay(timerDisplay, timerTime, true);
        } else {   // 시간이 다 된다면 
          clearInterval(timerInterval);  // interval 해제 
          timerRun = false; // 작동 상태 다시 false로 설정
          startTimerBtn.textContent = '시작'; // 버튼 텍스트도 시작으로 변경
          alert('설정하신 시간이 모두 종료되었습니다.');    // alert 창으로 타이머 종료 알려줌
        }
      }, 1000);
    }
  } else {  // 타이머가 작동 중이면 
    clearInterval(timerInterval);  // interval 해제
    timerRun = false; 
    startTimerBtn.textContent = '시작';
  }
}

// 타이머 리셋 관련 함수 
function resetTimer() {
  clearInterval(timerInterval);  // interval 해제
  timerTime = 0;      // 시간 0으로 초기화
  timerRun = false;   // 작동 상태 초기화
  startTimerBtn.textContent = '시작'; // 버튼 텍스트 시작으로 변경 
  updateDisplay(timerDisplay, timerTime, true); // 화면 초기화 
  document.getElementById('hours').value = '';    // 각각의 시,분,초 입력값 초기화 
  document.getElementById('minutes').value = '';
  document.getElementById('seconds').value = '';
}

// 화면 표시 업데이트 관련 함수 
function updateDisplay(display, time, isTimer = false) {
  display.textContent = isTimer ? formatTimeTimer(time) : formatTimeStopwatch(time);   // 타이머라면 formatTimeTimer 사용, 아니라면 formatTimeStopwatch 사용
}


// 현재 스톱워치와 타이머의 시작 시간 단위가 다르기 때문에 두개를 분리해서 함수 생성
// 스톱워치 시간 관련 함수 
function formatTimeStopwatch(time) {  // 스톱워치 시간 (분,초,밀리초)
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);
  return `${addZero(minutes)}:${addZero(seconds)}:${addZero(milliseconds)}`;
}

// 타이머 시간 관련 함수
function formatTimeTimer(time) {    // 타이머 시간 (시,분,초)
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  if (hours > 0) {
    return `${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;
  } else {
    return `${addZero(minutes)}:${addZero(seconds)}`;
  }
}

// 숫자를 두 자리로 표시하기 위한 함수 
function addZero(num) {
  return num.toString().padStart(2, '0');   // 앞에 0을 추가하여 한자리수 숫자들도 두자리로 표현 (ex) 5초 => 05초) 
}

// 모든 버튼들에 클릭 이벤트 리스너 적용 
startStopBtn.addEventListener('click', startStopwatch);  // 스톱워치 시작,정지
resetStopBtn.addEventListener('click', resetStopwatch);  // 스톱워치 리셋
recordStopBtn.addEventListener('click', recordStopwatch); // 기록 추가
selectDeleteBtn.addEventListener('click', selectDelete); // 선택 삭제
deleteAllBtn.addEventListener('click', deleteAll);   // 전체 삭제
selectAllBtn.addEventListener('click', selectAll);   // 전체 선택,전체 해제
startTimerBtn.addEventListener('click', startTimer);    // 타이머 시작,정지
resetTimerBtn.addEventListener('click', resetTimer);    // 타이머 리셋
