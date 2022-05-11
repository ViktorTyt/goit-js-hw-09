const flatpickr = require('flatpickr').default;
import 'flatpickr/dist/flatpickr.min.css';

console.log(typeof flatpickr);

// =======DOM=============

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

function showsRefs() {
  console.log(refs.input);
  console.log(refs.startBtn);
  console.log(refs.days.value);
  console.log(refs.hours);
  console.log(refs.minutes);
  console.log(refs.seconds);
}
showsRefs();

// =======Function convertMs=============

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

//==========CREATE NEW INSTANCE===========

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

let ms = null;

const ff = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {},
});

const onClose = selectedDates => {
  // console.log(selectedDates[0].getTime());
  if (selectedDates[0] < new Date()) {
    alert('Please choose a date in the future');
    refs.startBtn.setAttribute('disabled');
    return;
  }
  ms = selectedDates[0] - new Date();
  const getConvertMs = convertMs(ms);
  showConvertMsData(getConvertMs);
};
// console.log(flatpickr.config.onClose());
// console.log(typeof gg);

const showConvertMsData = getConvertMs => {
  refs.days.textContent = getConvertMs.days;
  refs.hours.textContent = getConvertMs.hours;
  refs.minutes.textContent = getConvertMs.minutes;
  refs.seconds.textContent = getConvertMs.seconds;
};

console.log(ms);

const handleStartBtnClick = () => {
  console.log('Hello');
  setInterval(() => {
    onClose(ff.selectedDates);
  }, 1000);
};

refs.startBtn.addEventListener('click', handleStartBtnClick);
// console.log(typeof handleStartBtnClick);
