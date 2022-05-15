const flatpickr = require('flatpickr').default;
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.setAttribute('disabled', '');

let selectedDates = null;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDates = selectedDates[0].getTime();
    if (selectedDates > options.defaultDate) {
      getSelectedDate(selectedDates);
      refs.startBtn.removeAttribute('disabled', '');
    } else {
      alert('Please choose a date in the future');
    }
  },
};

flatpickr('#datetime-picker', options);

const getSelectedDate = date => {
  selectedDates = date;
};

const showConvertMsData = ({ days, hours, minutes, seconds }) => {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
};

const startTimer = () => {
  const resultTime = selectedDates - new Date();

  if (resultTime < 0) {
    clearInterval(intervalId);
  } else {
    const getConvertsMs = convertMs(resultTime);

    showConvertMsData(getConvertsMs);
  }
};

const addLeadingZero = value => {
  return String(value).padStart(2, '0');
};

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

refs.startBtn.addEventListener('click', () => {
  intervalId = setInterval(() => {
    startTimer();
    refs.startBtn.setAttribute('disabled', '');
  }, 1000);
});
