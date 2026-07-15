function templateDishContainer(indexDish, name, imageFilename, description, price) {
    return `
        <div class="dish-container">
            <img class="dish-img" src="./assets/img/${imageFilename}" alt="${name}">
            <div class="name-and-description-container">
                <p class="font-size-24px" >${name}</p>
                <p class="font-size-16px" >${description}</p>
            </div>
            <div class="price-and-add-container">
                <p class="font-size-24px" >${price}</p>
                <button id="ButtonAddToBasket${indexDish}" onclick="addToBasket(${indexDish})" class="btn-add-to-basket">
                    Add to basket
                </button>
            </div>
        </div>`;
}