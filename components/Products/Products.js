class Products {
    constructor() {
        this.classNameActive = 'products-element__btn_active';
        this.labelAdd = 'Добавить в корзину';
        this.labelRemove = 'Удалить из корзины';
        this.maxItems = 3; // Максимальное количество товаров в корзине
    }

    handleSetLocationStorage(element, id) {
        const products = localStorageUtil.getProducts();

        if (products.length >= this.maxItems && !products.includes(id)) {
            alert(`Вы можете добавить только ${this.maxItems} товара в корзину.`);
            return;
        }

        const { pushProduct, products: updatedProducts } = localStorageUtil.putProducts(id);
        
        if (pushProduct) {
            element.classList.add(this.classNameActive);
            element.innerHTML = this.labelRemove;
        } else {
            element.classList.remove(this.classNameActive);
            element.innerHTML = this.labelAdd;
        }

        headerPage.render(updatedProducts.length);
        this.updateButtonsState();
    }

    updateButtonsState() {
        const products = localStorageUtil.getProducts();
        const buttons = document.querySelectorAll('.products-element__btn');

        buttons.forEach(button => {
            const id = button.getAttribute('onclick').match(/'(.+)'/)[1];

            if (products.length >= this.maxItems && !products.includes(id)) {
                button.disabled = true;
                button.innerHTML = `${this.labelAdd} (лимит)`;
            } else if (!button.classList.contains(this.classNameActive)) {
                button.disabled = false;
                button.innerHTML = this.labelAdd;
            }
        });
    }

    render() {
        const productsStore = localStorageUtil.getProducts();
        let htmlCatalog = '';

        CATALOG.forEach(({ id, name, price, img }) => {
            let activeClass = '';
            let activeText = '';

            if (productsStore.indexOf(id) === -1) {
                activeText = this.labelAdd;
            } else {
                activeClass = ' ' + this.classNameActive;
                activeText = this.labelRemove;
            }

            htmlCatalog += `
                <li class="products-element">
                    <span class="products-element__name">${name}</span>
                    <img class="products-element__img" src="${img}" />
                    <span class="products-element__price">
                         ${price.toLocaleString()} BYN
                    </span>
                    <button class="products-element__btn${activeClass}" onclick="productsPage.handleSetLocationStorage(this, '${id}');">
                        ${activeText}
                    </button>
                </li>
            `;
        });

        const html = `
            <ul class="products-container">
                ${htmlCatalog}
            </ul>
        `;

        ROOT_PRODUCTS.innerHTML = html;
        this.updateButtonsState(); // Обновляем состояние кнопок после рендеринга
    }
}

const productsPage = new Products();
productsPage.render();
