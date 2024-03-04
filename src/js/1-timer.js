// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const startBtn = document.querySelector('[data-start]');
const inputData = document.querySelector('#datetime-picker');
const daysValue = document.querySelector('span[data-days]');
const hoursValue = document.querySelector('span[data-hours]');
const minutesValue = document.querySelector('span[data-minutes]');
const secondsValue = document.querySelector('span[data-seconds]');

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0].getTime() <= Date.now()) {
      startBtn.disabled = true;
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
    } else {
      startBtn.disabled = false;
    }
  },
};

const creatСalendar = flatpickr(inputData, options);

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

startBtn.addEventListener('click', () => {
  const dateInterval = setInterval(() => {
    let delta = new Date(inputData.value) - new Date();
    startBtn.disabled = true;

    if (delta >= 0) {
      let leadingTime = convertMs(delta);
      daysValue.textContent = addLeadingZero(leadingTime.days);
      hoursValue.textContent = addLeadingZero(leadingTime.hours);
      minutesValue.textContent = addLeadingZero(leadingTime.minutes);
      secondsValue.textContent = addLeadingZero(leadingTime.seconds);
    } else {
      clearInterval(dateInterval);
      startBtn.disabled = false;
    }
  }, 1000);
});

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
