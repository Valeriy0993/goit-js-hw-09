import Notiflix from 'notiflix';

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.form');
  const createButton = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const formElements = event.target.elements;
    const firstDelay = parseInt(formElements.delay.value, 10);
    const step = parseInt(formElements.step.value, 10);
    const amount = parseInt(formElements.amount.value, 10);

    const createButton = form.querySelector('button[type="submit"]');

    if (!createButton.hasAttribute('disabled')) {
      createButton.disabled = true;

      createPromises(firstDelay, step, amount).finally(() => {
        createButton.disabled = false;

        form.reset();
      });
    }
  });

  function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;

      setTimeout(() => {
        if (shouldResolve) {
          resolve({ position, delay });
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        } else {
          reject({ position, delay });
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        }
      }, delay);
    });
  }

  function createPromises(firstDelay, step, amount) {
    const promises = [];

    for (let i = 1; i <= amount; i++) {
      const delay = firstDelay + (i - 1) * step;

      const promise = createPromise(i, delay)
        .then(({ position, delay }) => {
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        });

      promises.push(promise);
    }

    return Promise.all(promises);
  }
});
