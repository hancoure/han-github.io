"use strict"
const TELEGRAM_BOT_TOKEN = '7441938502:AAFk34CU9KWUeXChk2RpRK-Nu1nZgKcR018';
const TELEGRAM_CHAT_ID = '-4258062356';
const API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`


async function sendEmailTelegram(event) {
    event.preventDefault();

    const form = event.target;
    const formBtn = document.querySelector('.shopping__checkout')
    const formSendResult = document.querySelector('.form__send-result')
    formSendResult.textContent = '';


    const { name, adress, phone, pass } = Object.fromEntries(new FormData(form).entries());
    
    const text = `Заявка от ${name}!\nАдрес: ${adress}\nТелефон: ${phone}\nПасспортные данные: ${pass}`;


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
        })
        
        if (response.ok) {
            formSendResult.textContent = 'Заказ успешно оформлен! Ожидайте доставки, наши курьеры с вами свяжутся!';
            form.reset()
        } else {
            throw new Error(response.statusText);
        }

    } catch (error) {
        console.error(error);
        formSendResult.textContent = 'Анкета не отправлена! Попробуйте позже.';
        formSendResult.style.color = 'red';

    } finally {
        formBtn.textContent = 'Отправить';
    }
}