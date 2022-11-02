import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', returnPromise);

function returnPromise(event) {
  event.preventDefault();

  const {
    elements: { delay, step, amount },
  } = event.currentTarget;
  const delayValue = Number(delay.value),
    stepValue = Number(step.value),
    amountValue = Number(amount.value);

  for (let i = 1; i <= amountValue; i += 1) {
    let delayNew = delayValue + (i - 1) * stepValue;
    createPromise(i, delayNew).then(onSuccess).catch(onFail);
  }
}

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve(`Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
  return promise;
}

function onSuccess(result) {
  Notiflix.Notify.success(result);
}

function onFail(error) {
  Notiflix.Notify.failure(error);
}
