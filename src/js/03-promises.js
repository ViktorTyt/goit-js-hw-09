const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
  createBtn: document.querySelector('.form > button'),
};

let intervalId = null;

const createPromise = (position, delay, delayByStep) => {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delayByStep });
      } else {
        reject({ position, delayByStep });
      }
    }, delay);
  });
};

const onCreatePromise = event => {
  event.preventDefault();

  const formData = event.currentTarget.elements;
  const delay = formData.delay.value;
  const step = formData.step.value;
  const amount = formData.amount.value;

  let counter = 0;
  let delayByStep = 0;

  intervalId = setInterval(() => {
    counter += 1;
    delayByStep = Number(delay) + Number(step) * counter - Number(step);

    if (counter <= amount) {
      createPromise(counter, delay, delayByStep)
        .then(({ position, delayByStep }) => {
          console.log(`✅ Fulfilled promise ${position} in ${delayByStep}ms`);
        })
        .catch(({ position, delayByStep }) => {
          console.log(`❌ Rejected promise ${position} in ${delayByStep}ms`);
        });
    } else {
      clearInterval(intervalId);
      return;
    }
  }, step);
};

refs.form.addEventListener('submit', onCreatePromise);
