const flatpickr = require('flatpickr').default;
import 'flatpickr/dist/flatpickr.min.css';

console.log(typeof flatpickr);

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
};

console.log(refs.input);
console.log(refs.startBtn);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

const ff = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
});

const getTime = ff.config.defaultDate.getTime();
console.log(getTime);
// console.log(typeof flatpickr);

const handleStartBtnClick = () => {
  //   console.log(refs.input.flatpickr());
};

refs.startBtn.addEventListener('click', handleStartBtnClick);
// console.log(typeof handleStartBtnClick);
