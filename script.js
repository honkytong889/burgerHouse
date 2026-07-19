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

function renderFilledBasket() {
    renderShoppingCartIcon();

    const basketAsideRef = document.getElementById('BasketAside');
    if (basketAsideRef) basketAsideRef.innerHTML = templateFilledBasket('Aside');

    const basketDialogRef = document.getElementById('BasketDialog');
    if (basketDialogRef) basketDialogRef.innerHTML = templateFilledBasket('Dialog');

    renderDishesInBasket('Aside');
    renderDishesInBasket('Dialog');
}

function renderShoppingCartIcon() {
    const amountDishes = dishesInBasket.amounts.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    const shoppingCartRef = document.getElementById('ShoppingCart');
    if (shoppingCartRef) shoppingCartRef.classList.add("dishes-added-to-basket");

    const amountDishesRef = document.getElementById('AmountDishes');
    if (amountDishesRef) {
        amountDishesRef.classList.remove("d-none");
        amountDishesRef.innerHTML = amountDishes;
    }
    const mobileAmountRef = document.getElementById('MobileBasketAmount');
    if (mobileAmountRef) {
        mobileAmountRef.classList.remove("d-none");
        mobileAmountRef.innerHTML = amountDishes;
    }
}

function renderDishesInBasket(position) {
    let subtotal = 0;
    const choosenDishesRef = document.getElementById(`ContainerChoosenDishes${position}`);

    if (!choosenDishesRef) return;

    choosenDishesRef.innerHTML = "";
    for (let indexBasket = 0; indexBasket < dishesInBasket.dishes.length; indexBasket++) {
        const indexDish = dishesInBasket.dishes[indexBasket];
        const amount = dishesInBasket.amounts[indexBasket];
        const name = allDishes[indexDish].name;
        const basketPrice = (amount * allDishes[indexDish].price);

        subtotal += basketPrice;
        choosenDishesRef.innerHTML += templateDishCartInBasket(position, indexDish, name, amount, basketPrice.toFixed(2).toString().replace(".", ",") + " €");
        toggleDeleteIcon(position, indexDish, amount);
    }

    renderMoneyCalculation(position, subtotal);
}

function toggleDeleteIcon(position, indexDish, amount) {
    const deleteAllRef = document.getElementById(`DeleteAll${indexDish}${position}`);
    const deleteOneRef = document.getElementById(`DeleteOne${indexDish}${position}`);

    if (deleteAllRef) {
        deleteAllRef.classList.toggle("d-none", amount === 1);
    }


    if (deleteOneRef) {
        if (amount === 1) {
            deleteOneRef.classList.add("btn-delete-one");
            deleteOneRef.innerHTML = `<img src="assets/icons/trash.svg" alt="Löschen" class="delete-svg icon-trash-minus">`;

        } else {
            deleteOneRef.classList.remove("btn-delete-one");
            deleteOneRef.innerHTML = `-`;
        }
    }
}

function renderMoneyCalculation(position, subtotal) {
    const deliveryFee = 4.99;
    const total = (subtotal + deliveryFee).toFixed(2).toString().replace(".", ",") + " €";

    const subtotalRef = document.getElementById(`Subtotal${position}`);
    const deliveryFeeRef = document.getElementById(`DeliveryFee${position}`);
    const totalRef = document.getElementById(`Total${position}`);
    const buyNowRef = document.getElementById(`BuyNow${position}`);

    if (subtotalRef) subtotalRef.innerHTML = subtotal.toFixed(2).toString().replace(".", ",") + " €";
    if (deliveryFeeRef) deliveryFeeRef.innerHTML = deliveryFee.toFixed(2).toString().replace(".", ",") + " €";
    if (totalRef) totalRef.innerHTML = total;
    if (buyNowRef) buyNowRef.innerHTML = `Buy now (${total})`;
}

function addToBasket(indexDish) {
    if (!dishesInBasket.dishes.includes(indexDish)) {
        dishesInBasket.dishes.push(indexDish);
        dishesInBasket.amounts.push(1);
    } else {
        const i = dishesInBasket.dishes.indexOf(indexDish);
        dishesInBasket.amounts[i] += 1;
    }

    changeAddButton(indexDish);
    renderFilledBasket();
}

function deleteOneFromBasket(indexDish) {
    const i = dishesInBasket.dishes.indexOf(indexDish);

    if (dishesInBasket.amounts[i] == 1) {
        dishesInBasket.dishes.splice(i, 1);
        dishesInBasket.amounts.splice(i, 1);
    } else {
        dishesInBasket.amounts[i] -= 1;
    }

    changeAddButton(indexDish);
    renderBasket();
}

function deleteAllFromBasket(indexDish) {
    const i = dishesInBasket.dishes.indexOf(indexDish);

    dishesInBasket.dishes.splice(i, 1);
    dishesInBasket.amounts.splice(i, 1);

    changeAddButton(indexDish);
    renderBasket();
}

function deleteCompleteBasket() {
    for (let indexBasket = dishesInBasket.dishes.length - 1; indexBasket >= 0; indexBasket--) {
        const indexDish = dishesInBasket.dishes[indexBasket];
        const addButtonRef = document.getElementById(`ButtonAddToBasket${indexDish}`);
        if (addButtonRef) {
            addButtonRef.innerHTML = `Add to basket`;
            addButtonRef.classList.remove("btn-added-to-basket");
        }
    }

    dishesInBasket.dishes = [];
    dishesInBasket.amounts = [];
    renderEmptyBasket();
}

function changeAddButton(indexDish) {
    const addButtonRef = document.getElementById(`ButtonAddToBasket${indexDish}`);
    if (!addButtonRef) return;

    if (dishesInBasket.dishes.includes(indexDish)) {
        const i = dishesInBasket.dishes.indexOf(indexDish);
        const amount = dishesInBasket.amounts[i];

        addButtonRef.innerHTML = `Added ${amount}`;
        addButtonRef.classList.add("btn-added-to-basket");
    } else {
        addButtonRef.innerHTML = `Add to basket`;
        addButtonRef.classList.remove("btn-added-to-basket");
    }
}


function showBasketOverlay() {
    const basketDialogRef = document.getElementById('BasketDialog');
    if (basketDialogRef) {
        basketDialogRef.classList.add('show');
        document.body.style.overflow = 'hidden';
        renderBasket();
    }
}


function closeBasketOverlay() {
    const basketDialogRef = document.getElementById('BasketDialog');
    if (basketDialogRef) {
        basketDialogRef.classList.remove('show');
        document.body.style.overflow = '';
    }
}


function showConfirmationOverlay() {
    const confirmationDialogRef = document.getElementById('ConfirmationDialog');

    if (confirmationDialogRef) {

        const hornSound = new Audio('assets/sounds/universfield-double-car-honk-352443.mp3');
        hornSound.volume = 0.5;

        deleteCompleteBasket();
        closeBasketOverlay();
        confirmationDialogRef.innerHTML = templateConfirmationDialog();
        confirmationDialogRef.showModal();

        setTimeout(() => {
            hornSound.play().catch(error => {
                console.warn("Audio-Autoplay vom Browser blockiert:", error);
            });
        }, 500);

        setTimeout(() => closeConfirmationOverlay(), 2500);
    }
}

function closeConfirmationOverlay() {
    const confirmationDialogRef = document.getElementById('ConfirmationDialog');
    if (confirmationDialogRef) confirmationDialogRef.close();
}

