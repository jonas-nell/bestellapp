let dishes = [];
let basket = [];

async function loadDishes() {
    const savedDishes = localStorage.getItem("dishesData");

    if (savedDishes) {
        dishes = JSON.parse(savedDishes);
    } else {
        const response = await fetch("./data/dishes.json");
        dishes = await response.json();

        saveToLocalStorage();
    }
    init();
}

function init() {
    renderCategories();
    renderDishes();
    renderBasketUI();
}

function saveToLocalStorage() {
    localStorage.setItem("dishesData", JSON.stringify(dishes));
}

function renderCategories() {
    const main = document.getElementById("main-content");

    for (const category of categories) {
        main.innerHTML += getCategoryTemplate(category);
    }
}

function renderDishes() {
    for (const dish of dishes) {
        const container = document.getElementById(`${dish.type}-container`);
        container.innerHTML += getDishTemplate(dish);
    }
}

function addToBasket(dishId) {
    const basketItem = basket.find((item) => item.id === dishId);

    if (basketItem) {
        basketItem.amount++;
    } else {
        basket.push({
            id: dishId,
            amount: 1,
        });
    }

    renderBasketUI();
}

function addDish(dishId) {
    const basketItem = basket.find((item) => item.id === dishId);

    basketItem.amount++;

    renderBasketUI();
}

function subtractDish(dishId) {
    const basketItem = basket.find((item) => item.id === dishId);

    basketItem.amount--;

    if (basketItem.amount === 0) {
        basket = basket.filter((item) => item.id !== dishId);
    }

    renderBasketUI();
}

function deleteDish(dishId) {
    basket = basket.filter((item) => item.id !== dishId);

    renderBasketUI();
}

function renderBasketUI() {
    const basketContainer = document.getElementById("basket");

    if (basket.length === 0) {
        basketContainer.innerHTML = getEmptyBasketTemplate();
        updateCartBadge();
        return;
    }

    basketContainer.innerHTML = getBasketTemplate();

    renderOrderItems();
    renderBasketTotals();
    updateCartBadge();
}

function renderOrderItems() {
    const order = document.getElementById("order");

    order.innerHTML = "";

    for (const item of basket) {
        const dish = dishes.find((d) => d.id === item.id);

        order.innerHTML += getOrderTemplate(dish, item);
    }
}

function renderBasketTotals() {
    const container = document.getElementById("basket-calculations");

    if (basket.length === 0) {
        container.innerHTML = "";
        return;
    }

    const { subtotal, deliveryCost, totalPrice } = calculateBasketTotals();

    container.innerHTML = getCalculationTemplate(
        subtotal,
        deliveryCost,
        totalPrice,
    );
}

function getDishPrice(dish, item) {
    let dishPrice = item.amount * dish.price;
    return dishPrice.toFixed(2).replace(".", ",") + "€";
}

function calculateBasketTotals() {
    let subtotal = 0;

    for (const item of basket) {
        const dish = dishes.find((d) => d.id === item.id);
        if (dish) {
            subtotal += dish.price * item.amount;
        }
    }

    const deliveryCost = 4.99;
    const totalPrice = subtotal + deliveryCost;

    return {
        subtotal: subtotal,
        deliveryCost: deliveryCost,
        totalPrice: totalPrice,
    };
}

function toggleBasket() {
    const basket = document.getElementById("basket");

    basket.classList.toggle("open");

    document.body.classList.toggle(
        "no-scroll",
        basket.classList.contains("open"),
    );
}

function closeBasket() {
    document.getElementById("basket").classList.remove("open");
    document.body.classList.remove("no-scroll");
}

function updateCartBadge() {
    const badge = document.getElementById("cart-badge");
    const cartIcon = document.getElementById("cart-icon");

    const totalItems = basket.reduce((sum, item) => sum + item.amount, 0);

    if (totalItems === 0) {
        badge.style.display = "none";
        cartIcon.src = "./assets/icons/shopping-cart-white.png";
        return;
    }

    badge.style.display = "flex"; //toggling class doesnt work, badge.hidden, doesnt work
    badge.innerText = totalItems;
    cartIcon.src = "./assets/icons/shopping-cart-orange.png";
}

function openOrderConfirmation() {
    const dialog = document.getElementById("confirmation");
    dialog.showModal();
    document.body.classList.add("no-scroll");

    dialog.addEventListener("click", (event) => {
        closeOrderConfirmation();
        closeBasket();
    });
}

function closeOrderConfirmation() {
    const dialog = document.getElementById("confirmation");
    dialog.close();
    basket = [];
    document.body.classList.remove("no-scroll");
    renderBasketUI();
}
