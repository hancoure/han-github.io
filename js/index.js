"use strict"
const TELEGRAM_BOT_TOKEN = '7441938502:AAFk34CU9KWUeXChk2RpRK-Nu1nZgKcR018';
const TELEGRAM_CHAT_ID = '-4258062356';
const API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
    const re = /^[0-9\-\+\(\) ]{7,}$/;
    return re.test(String(phone));
}

async function sendEmailTelegram(event) {
    event.preventDefault();

    const form = event.target;
    const formBtn = document.querySelector('.button');
    const formSendResult = document.querySelector('.form__send-result');
    formSendResult.textContent = '';

    const { name, email, phone, pass } = Object.fromEntries(new FormData(form).entries());

    if (!name || !email || !phone || !pass) {
        formSendResult.textContent = 'Все поля должны быть заполнены!';
        formSendResult.style.color = 'red';
        return;
    }

    if (!validateEmail(email)) {
        formSendResult.textContent = 'Неправильный формат email!';
        formSendResult.style.color = 'red';
        return;
    }

    if (!validatePhone(phone)) {
        formSendResult.textContent = 'Неправильный формат телефона!';
        formSendResult.style.color = 'red';
        return;
    }

    const text = `Заявка от ${name}!\nEmail: ${email}\nТелефон: ${phone}\nСообщение: ${pass}`;

    try {
        formBtn.textContent = 'Loading...';

        const response = await fetch(API, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text,
            })
        });

        if (response.ok) {
            formSendResult.textContent = 'Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.';
            formSendResult.style.color = 'green';
            form.reset();
        } else {
            throw new Error(response.statusText);
        }

    } catch (error) {
        console.error(error);
        formSendResult.textContent = 'Анкета не отправлена! Попробуйте позже.';
        formSendResult.style.color = 'red';

    } finally {
        formBtn.textContent = 'Отправлено!';
    }
}
