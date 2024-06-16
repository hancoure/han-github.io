class Shopping {
    handleClear() {
        ROOT_SHOPPING.innerHTML = '';
    }

    handleCheckout() {
        alert('Proceeding to checkout');
    }

    render() {
        const productsStore = localStorageUtil.getProducts();
        let htmlCatalog = '';
        let sumCatalog = 0;

        CATALOG.forEach(({ id, name, price }) => {
            if (productsStore.indexOf(id) !== -1) {
                htmlCatalog += `
                    <tr>
                        <td class="shopping-element__name"> ✪ ${name}</td>
                        <td class="shopping-element__price">${price.toLocaleString()} BYN</td>
                    </tr>
                `;
                sumCatalog += price;
            }
        });

        const html = `
            <div class="shopping-container">
                <div class="shopping__close" onclick="shoppingPage.handleClear();"></div>
                <table>
                    ${htmlCatalog}
                    <tr>
                        <td class="shopping-element__name"> Сумма:</td>
                        <td class="shopping-element__price">${sumCatalog.toLocaleString()} BYN</td>
                    </tr>
                </table>

                        <form class="form" onsubmit="sendEmailTelegram(event)">
            <div class="form__stripes-block">
                <div class="form__line"></div>
            </div>
            <h3>Оформление заказа</h3>
            <div class="form__group">
                <label id="name">Имя</label>
                <input type="text" name="name" autocomplete="off" maxlength="50" required>

                <label id="pass">Паспортные данные</label>
                <input type="text" name="pass" autocomplete="off" maxlength="50" required>

                <label id="adress">Адрес доставки</label>
                <input type="text" name="adress" autocomplete="off" maxlength="50" required>

                <label id="phone">Номер телефона</label>
                <input type="tel" name="phone" autocomplete="off" maxlength="15" required>
            </div>
            <div class="form__submit-block">
                <div class="shopping__buttons">
                    <button class="shopping__checkout">Оформить</button>
                </div>
            </div>
            <div class="form__send-result"></div>
        </form>

            </div>

            
        `;
        ROOT_SHOPPING.innerHTML = html;
    }
}

const shoppingPage = new Shopping();