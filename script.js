const dishesInBasket = { "dishes": [], "amounts": [] };

function init() {
    renderAllDishContainer();
    renderEmptyBasket();
}

function renderAllDishContainer() {
    for (let indexDish = 0; indexDish < allDishes.length; indexDish++) {
        const category = allDishes[indexDish].category;
        const name = allDishes[indexDish].name;
        const imageFilename = allDishes[indexDish].imageFilename;
        const description = allDishes[indexDish].description;
        const price = allDishes[indexDish].price.toFixed(2).toString().replace(".", ",") + " €";

        const dishContainerRef = document.getElementById('Container' + category);
        if (dishContainerRef) {
            dishContainerRef.innerHTML += templateDishContainer(indexDish, name, imageFilename, description, price);
        }
    }
}

function renderBasket() {
    (dishesInBasket.dishes.length == 0) ? renderEmptyBasket() : renderFilledBasket();
}


function renderEmptyBasket() {

    const shoppingCartRef = document.getElementById('ShoppingCart');
    if (shoppingCartRef) shoppingCartRef.classList.remove("dishes-added-to-basket");

    const amountDishesRef = document.getElementById('AmountDishes');
    if (amountDishesRef) amountDishesRef.classList.add("d-none");

    const mobileAmountRef = document.getElementById('MobileBasketAmount');
    if (mobileAmountRef) {
        mobileAmountRef.classList.add("d-none");
        mobileAmountRef.innerHTML = "0";
    }

    const basketAsideRef = document.getElementById('BasketAside');
    if (basketAsideRef) basketAsideRef.innerHTML = templateEmptyBasket();

    const basketDialogRef = document.getElementById('BasketDialog');
    if (basketDialogRef) basketDialogRef.innerHTML = templateEmptyBasket();
}

