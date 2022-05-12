const flatpickr = require('flatpickr').default;
import 'flatpickr/dist/flatpickr.min.css';

// console.log(typeof flatpickr);

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
  // console.log(refs.input);
  // console.log(refs.startBtn);
  // console.log(refs.days.value);
  // console.log(refs.hours);
  // console.log(refs.minutes);
  // console.log(refs.seconds);
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
// let ms = null;
// console.log(ms);
// let selData = null;
// console.log(selData);

const options = {
  enableTime: false,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (this.enableTime) {
      return;
    }

    const countdownTimerDataTraget = selectedDates[0];
    this.enableTime = true;

    setInterval(() => {
      // console.log(selectedDates[0].getTime());

      const countdownTimerDataStart = new Date();
      console.log(countdownTimerDataStart.getTime());
      // console.log(countdownTimerDataTraget);
      if (countdownTimerDataTraget < countdownTimerDataStart) {
        alert('Please choose a date in the future');
      } else {
        const ms = countdownTimerDataTraget - countdownTimerDataStart;
        const getConvertMs = convertMs(ms);
        showConvertMsData(getConvertMs);
        refs.startBtn.disabled = false;
      }
    }, 1000);
  },
  // onselectstart() {
  //   this.enableTime = true;
  // },
};

//====
flatpickr('#datetime-picker', options);

const showConvertMsData = getConvertMs => {
  refs.days.textContent = getConvertMs.days;
  refs.hours.textContent = getConvertMs.hours;
  refs.minutes.textContent = getConvertMs.minutes;
  refs.seconds.textContent = getConvertMs.seconds;
};

//====
// console.log(timer.config);

const handleStartBtnClick = () => {
  // options.onselectstart();
};

refs.startBtn.addEventListener('click', handleStartBtnClick);
console.log(typeof handleStartBtnClick);
