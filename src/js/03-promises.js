const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
  createBtn: document.querySelector('.form > button'),
};

let intervalId = null;

const createPromise = (position, delay, delayA) => {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delayA });
        // (console.log(`${position} -'ok'`));
      } else {
        reject({ position, delayA });
        // (console.log(`${position} -'err'`));
      }
    }, delay);
  });
  // console.log({ promise });
};

const onCreatePromise = event => {
  event.preventDefault();

  const formData = event.currentTarget.elements;
  const delay = formData.delay.value;
  const step = formData.step.value;
  const amount = formData.amount.value;

  let counter = 0;
  let delayA = 0;
  intervalId = setInterval(() => {
    // console.log(intervalId);
    counter += 1;
    delayA = Number(delay) + Number(step) * counter - Number(step);
    // console.log(delayA);
    if (counter <= amount) {
      createPromise(counter, delay, delayA)
        .then(({ position, delayA }) => {
          // console.log(position);
          console.log(`✅ Fulfilled promise ${position} in ${delayA}ms`);
        })
        .catch(({ position, delayA }) => {
          console.log(`❌ Rejected promise ${position} in ${delayA}ms`);
        });
    } else {
      clearInterval(intervalId);
      return;
    }
  }, step);
};

refs.form.addEventListener('submit', onCreatePromise);
