function templateDishContainer(indexDish, name, imageFilename, description, price) {
    return `
        <div class="dish-container">
            <img class="dish-img" src="./assets/img/${imageFilename}" alt="${name}">
            <div class="name-and-description-container">
                <h3 class="dish-card">${name}</h3>
                <p class="dish-description">${description}</p>
            </div>
            <div class="price-and-add-container">
                <p class="dish-price">${price}</p>
                <button id="ButtonAddToBasket${indexDish}" onclick="addToBasket(${indexDish})" class="btn-add-to-basket">
                    Add to basket
                </button>
            </div>
        </div>`;
}

function templateEmptyBasket() {
    return `
        <div class="basket">
            <button onclick="closeBasketOverlay()" class="btn-close">
                <img src="./assets/icons/close.svg" alt="Warenkorb schließen">
            </button>
            <h3>Your Basket</h3>
            <p class="p-empty-basket">Nothing here yet.<br>Go ahead and choose something delicious!</p>
            <img src="assets/icons/basket.svg" alt="Einkaufswagen-Icon">
        </div>`;
}

function templateFilledBasket(position) {
    return `
        <div class="basket">
            <button onclick="closeBasketOverlay()" class="btn-close">
                <img src="assets/icons/close.svg" alt="Warenkorb schließen">
            </button>
            <h3>Your Basket</h3>
            <div id="ContainerChoosenDishes${position}" class="choosen-dishes-container"></div>
            <div class="money-calculation">
                <table>
                    <tr>
                        <td>Subtotal</td>
                        <td id="Subtotal${position}"></td>
                    </tr>
                    <tr>
                        <td>Delivery fee</td>
                        <td id="DeliveryFee${position}"></td>
                    </tr>
                    <tr>
                        <th>Total</th>
                        <th id="Total${position}"></th>
                    </tr>
                </table>
                <button onclick="showConfirmationOverlay()" id="BuyNow${position}" class="btn-buy-now"></button>  
            </div>
        </div>`;
}

function templateDishCartInBasket(indexDish, name, amount, basketPrice, deleteButtonHtml, minusButtonHtml) {
    return `
        <div class="choosen-dish-card">
            <div class="choosen-dish-card-child-container card-header-row">
                <p class="dish-title-text">${amount} x ${name}</p>
                ${deleteButtonHtml}
            </div>
            
            <div class="choosen-dish-card-child-container card-controls-row">
                <div class="amount-control">
                    ${minusButtonHtml}
                    <span>${amount}</span>
                    <button onclick="addToBasket(${indexDish})" class="btn-minus-plus">+</button>
                </div>
                <p class="dish-price-text">${basketPrice}</p>
            </div>
        </div>`;
}

function templateDeleteAllButton(indexDish) {
    return `
        <button onclick="removeFromBasket(${indexDish}, true)" class="btn-delete-all text-delete-btn"> 
            <img class="delete-svg" src="assets/icons/trash.svg" alt="Gericht komplett löschen"> 
        </button>`;
}

function templateMinusButton(indexDish, isTrash) {
    if (isTrash) {
        return `
            <button onclick="removeFromBasket(${indexDish}, false)" class="btn-minus-plus btn-trash-control"> 
                <img class="delete-svg-small" src="assets/icons/trash.svg" alt="Entfernen"> 
            </button>`;
    }
    return `<button onclick="removeFromBasket(${indexDish}, false)" class="btn-minus-plus">-</button>`;
}

function templateConfirmationDialog() {
    return `
        <div class="confirmation-overlay"> 
            <img class="delivery-truck-icon" src="assets/icons/delivery.svg" alt="Bestellung bestätigt"> 
            <span class="span-confirmation-dialog">Order confirmed!</span> 
            <p class="p-confirmation-dialog">Your food is on the way!</p> 
        </div>`;
}
