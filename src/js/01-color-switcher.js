const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

refs.stopBtn.setAttribute('disabled', '');

let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const changeBodyColor = () => {
  refs.body.style.background = getRandomHexColor();
};

const hadleStartBtn = () => {
  timerId = setInterval(changeBodyColor, 1000);
  refs.startBtn.setAttribute('disabled', '');
  refs.stopBtn.removeAttribute('disabled', '');
};

const hadleStopBtn = () => {
  clearInterval(timerId);
  refs.startBtn.removeAttribute('disabled', '');
  refs.stopBtn.setAttribute('disabled', '');
};

refs.startBtn.addEventListener('click', hadleStartBtn);
refs.stopBtn.addEventListener('click', hadleStopBtn);
