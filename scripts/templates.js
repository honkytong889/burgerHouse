function templateDishContainer(indexDish, name, imageFilename, description, price) {
    return `
        <div class="dish-container">
            <img class="dish-img" src="./assets/img/${imageFilename}" alt="${name}">
            <div class="name-and-description-container">
                <h3 class="dish-card" >${name}</h3>
                <p class="dish-description" >${description}</p>
            </div>
            <div class="price-and-add-container">
                <p class="dish-price" >${price}</p>
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
            <img class="" src="assets/icons/basket.svg" alt="Einkaufswagen-Icon">
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
                        <th>Total </th>
                        <th id="Total${position}"></th>
                    </tr>
                </table>
                <button onclick="showConfirmationOverlay()" id="BuyNow${position}" class="btn-buy-now"></button>  
            </div>
        </div>`;
}