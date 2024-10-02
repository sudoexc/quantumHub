document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.querySelector('#phone-inp');

    phoneInput.addEventListener('focus', function(e) {
        phoneInput.setAttribute('maxlength', '13'); // Учитывая дефисы, длина будет 16

        if (e.target.value === "") {
            e.target.value = "+998";
        }
    });

    phoneInput.addEventListener('input', function(e) {
        let inputVal = e.target.value.replace(/\D/g, ''); // Убираем все нецифровые символы
        if (inputVal.length >= 3) {
            inputVal = "+998" + inputVal.substring(3); // Оставляем +998 в начале
        }

        // маска номеру
        // if (inputVal.length > 6) {
        //     inputVal = inputVal.slice(0, 6) + '-' + inputVal.slice(6);
        // }
        // if (inputVal.length > 9) {
        //     inputVal = inputVal.slice(0, 10) + '-' + inputVal.slice(10);
        // }
        // if (inputVal.length > 12) {
        //     inputVal = inputVal.slice(0, 13) + '-' + inputVal.slice(13);
        // }

       // e.target.value = inputVal;  Обновляем значение в инпуте с дефисами
    });

    phoneInput.addEventListener('keydown', function(e) {
        // Разрешить только цифры и некоторые специальные клавиши
        if (e.key.length === 1 && !/\d/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
            e.preventDefault(); // Запретить ввод нецифровых символов
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const firstBtn = document.querySelector('#sct-btn');
    const contactSection = document.querySelector('#btn-finish'); 

    firstBtn.addEventListener('click', function () {
        contactSection.scrollIntoView({
            behavior: 'smooth' 
        });
    });
});


 // Обработчик для кнопки отправки формы
const sendButton = document.getElementById('sendButton');
const nameInput = document.querySelector('.name');
const phoneInput = document.querySelector('.tel');
const botToken = '8047946259:AAHYh1J-FQuuiCjp1bHWfwZWHb-Bjabspug';
const chatId = '5812918934';
const successModal = document.getElementById('successModal');
const errorModal = document.getElementById('errorModal');
const closeModals = document.querySelectorAll('.modal .close');

sendButton.addEventListener('click', function(event) {
  event.preventDefault();
  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();

  if (!name || !phone) {
    // Показать модальное окно с ошибкой
    errorModal.classList.add('show');
    setTimeout(() => {
      errorModal.classList.remove('show');
    }, 3000); // Закрыть модальное окно через 3 секунды
    return;
  }

  const message = 
    `Новая заявка:\nИмя: ${name}\nТелефон: ${phone}`;

  fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.ok) {
      nameInput.value = '';
      phoneInput.value = '';
      // Показать модальное окно с успехом
      successModal.classList.add('show');
      setTimeout(() => {
        successModal.classList.remove('show');
      }, 3000); // Закрыть модальное окно через 3 секунды
    } else {
      alert('Ошибка при отправке сообщения.');
    }
  })
  .catch(error => {
    console.error('Ошибка:', error);
    alert('Произошла ошибка при отправке.');
  });
});

// Закрытие модальных окон при клике на кнопку закрытия
closeModals.forEach(closeModal => {
  closeModal.addEventListener('click', () => {
    closeModal.closest('.modal').classList.remove('show');
  });
});

// Закрытие модальных окон при клике вне их области
window.addEventListener('click', (event) => {
  if (event.target.classList.contains('modal')) {
    event.target.classList.remove('show');
  }
});