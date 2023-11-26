const Notiflix = require('notiflix');

// Обгортка DOMContentLoaded для виклику коду при повному завантаженні DOM
document.addEventListener('DOMContentLoaded', function () {
  // Обробник події submit для форми
  document.querySelector('.form').addEventListener('submit', function (event) {
    event.preventDefault();

    // Отримання значень з полів форми
    const formElements = event.target.elements;
    const firstDelay = parseInt(formElements.delay.value, 10);
    const step = parseInt(formElements.step.value, 10);
    const amount = parseInt(formElements.amount.value, 10);

    // Виклик функції для створення промісів
    createPromises(firstDelay, step, amount);
  });

  // Функція для створення промісів
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

  // Функція для створення промісів з використанням createPromise
  function createPromises(firstDelay, step, amount) {
    for (let i = 1; i <= amount; i++) {
      const delay = firstDelay + (i - 1) * step;

      createPromise(i, delay)
        .then(({ position, delay }) => {
          // Обробка виконаного промісу
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          // Обробка відхиленого промісу
          console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }
  }
});
