// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const inputDelay = document.querySelector('[type="number"]');
const promisBtn = document.querySelector('[type="submit"]');
const inpunBtnRadio = document.querySelectorAll('[name="state"]');
const form = document.querySelector('.form');

function createPromise(delay, status) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (status === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const delay = inputDelay.value;
  const status = [...inpunBtnRadio].find(input => input.checked).value;
  createPromise(delay, status)
    .then(delay => {
      iziToast.success({
        title: 'Ok',
        titleColor: '#FFFFFF',
        position: 'topRight',
        progressBar: false,
        backgroundColor: '#59A10D',
        timeout: 3000,
        progressBar: false,
        close: false,
        message: `✅ Fulfilled promise in ${delay}ms`,
        messageColor: '#FFFFFF',
        iconColor: '#FFFFFF',
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        titleColor: '#FFFFFF',
        position: 'topRight',
        progressBar: false,
        backgroundColor: '#EF4040',
        timeout: 3000,
        progressBar: false,
        close: false,
        message: `Illegal operation`,
        messageColor: '#FFFFFF',
        iconColor: '#FFFFFF',
      });
    });
});

