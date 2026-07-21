
const dishesInBasket = {
    "dishes": [],
    "amounts": []
};

const DELIVERY_FEE = 4.99;

function formatPrice(amount) {
    return amount.toFixed(2).replace(".", ",") + " €";
}

function getBasketIndex(indexDish) {
    return dishesInBasket.dishes.indexOf(indexDish);
}


function init() {
    renderAllDishContainer();
    renderEmptyBasket();
}

function renderAllDishContainer() {
    for (let indexDish = 0; indexDish < allDishes.length; indexDish++) {
        const dish = allDishes[indexDish];
        const dishContainerRef = document.getElementById('Container' + dish.category);

        if (dishContainerRef) {
            const formattedPrice = formatPrice(dish.price);
            dishContainerRef.innerHTML += templateDishContainer(
                indexDish, dish.name, dish.imageFilename, dish.description, formattedPrice
            );
        }
    }
}

function renderBasket() {
    (dishesInBasket.dishes.length === 0) ? renderEmptyBasket() : renderFilledBasket();
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

    ['BasketAside', 'BasketDialog'].forEach(id => {
        const ref = document.getElementById(id);
        if (ref) ref.innerHTML = templateEmptyBasket();
    });
}

function renderFilledBasket() {
    renderShoppingCartIcon();

    ['Aside', 'Dialog'].forEach(position => {
        const ref = document.getElementById(`Basket${position}`);
        if (ref) ref.innerHTML = templateFilledBasket(position);
        renderDishesInBasket(position);
    });
}

function renderShoppingCartIcon() {
    const amountDishes = dishesInBasket.amounts.reduce((acc, curr) => acc + curr, 0);

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
    const choosenDishesRef = document.getElementById(`ContainerChoosenDishes${position}`);
    if (!choosenDishesRef) return;

    let subtotal = 0;
    choosenDishesRef.innerHTML = "";

    for (let indexBasket = 0; indexBasket < dishesInBasket.dishes.length; indexBasket++) {
        const indexDish = dishesInBasket.dishes[indexBasket];
        const amount = dishesInBasket.amounts[indexBasket];
        const dish = allDishes[indexDish];
        const basketPrice = amount * dish.price;
        subtotal += basketPrice;

        const deleteButtonHtml = (amount > 1) ? templateDeleteAllButton(indexDish) : '';
        const minusButtonHtml = templateMinusButton(indexDish, amount === 1);

        choosenDishesRef.innerHTML += templateDishCartInBasket(
            indexDish, dish.name, amount, formatPrice(basketPrice), deleteButtonHtml, minusButtonHtml
        );
    }

    renderMoneyCalculation(position, subtotal);
}

function renderMoneyCalculation(position, subtotal) {
    const total = subtotal + DELIVERY_FEE;

    const subtotalRef = document.getElementById(`Subtotal${position}`);
    const deliveryFeeRef = document.getElementById(`DeliveryFee${position}`);
    const totalRef = document.getElementById(`Total${position}`);
    const buyNowRef = document.getElementById(`BuyNow${position}`);

    if (subtotalRef) subtotalRef.innerHTML = formatPrice(subtotal);
    if (deliveryFeeRef) deliveryFeeRef.innerHTML = formatPrice(DELIVERY_FEE);
    if (totalRef) totalRef.innerHTML = formatPrice(total);
    if (buyNowRef) buyNowRef.innerHTML = `Buy now (${formatPrice(total)})`;
}

function addToBasket(indexDish) {
    const i = getBasketIndex(indexDish);

    if (i === -1) {
        dishesInBasket.dishes.push(indexDish);
        dishesInBasket.amounts.push(1);
    } else {
        dishesInBasket.amounts[i] += 1;
    }

    changeAddButton(indexDish);
    renderFilledBasket();
}

function removeFromBasket(indexDish, deleteAll = false) {
    const i = getBasketIndex(indexDish);
    if (i === -1) return;

    if (deleteAll || dishesInBasket.amounts[i] === 1) {
        dishesInBasket.dishes.splice(i, 1);
        dishesInBasket.amounts.splice(i, 1);
    } else {
        dishesInBasket.amounts[i] -= 1;
    }

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

    const i = getBasketIndex(indexDish);

    if (i !== -1) {
        addButtonRef.innerHTML = `Added ${dishesInBasket.amounts[i]}`;
        addButtonRef.classList.add("btn-added-to-basket");
    } else {
        addButtonRef.innerHTML = `Add to basket`;
        addButtonRef.classList.remove("btn-added-to-basket");
    }
}

function showBasketOverlay() {
    const basketDialogRef = document.getElementById('BasketDialog');
    if (!basketDialogRef) return;


    if (basketDialogRef.open) {
        closeBasketOverlay();
    } else {
        basketDialogRef.showModal();
        document.body.style.overflow = 'hidden';
        renderBasket();
    }
}



function closeBasketOverlay() {
    const basketDialogRef = document.getElementById('BasketDialog');
    if (basketDialogRef) {
        basketDialogRef.close();
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

    function closeConfirmationOverlay() {
        const confirmationDialogRef = document.getElementById('ConfirmationDialog');
        if (confirmationDialogRef) {
            confirmationDialogRef.close();
            document.body.style.overflow = '';
        }
    }

    ['BasketDialog', 'ConfirmationDialog'].forEach(id => {
        document.addEventListener('click', function (event) {
            const dialogRef = document.getElementById(id);
            if (dialogRef && event.target === dialogRef) {
                if (id === 'BasketDialog') closeBasketOverlay();
                if (id === 'ConfirmationDialog') closeConfirmationOverlay();
            }
        });
    });
}
