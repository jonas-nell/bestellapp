function getCategoryTemplate(category){
    return /*html*/`
        <section>
            <div class="content">
                <div class="dish-header">
                    <h2>${category.title}</h2>
                    <img class="dish-icon" src="${category.icon}" alt="">
                </div>
                <div class="dish-container" id="${category.type}-container"></div>
            </div>
        </section>
    `;
}

function getDishTemplate(dish){
    return /*html*/`
        <div class="dish">
            <img class="dish-img" src="${dish.dishPicture}" alt="">
            <h3>${dish.dishName}</h3>
            <p class="ingredients">${dish.ingredients.join(", ")}</p>
            <div class="bottom-dish">
                <span class = "price">${dish.price.toFixed(2).replace('.', ',')} €</span>
                <button class="addBtn" onclick="addToBasket(${dish.id})">Add to basket</button>
            </div>
        </div>
    `
}

function getEmptyBasketTemplate(){
    return /*html*/`
                <h4>Your Basket</h4>
                <img class="close-icon" onclick="closeBasket()" src="./assets/icons/close.png" alt="">
                <p>Nothing here yet. Go ahead and choose something delicious!</p>
                <img src="./assets/icons/shopping-cart-icon-basket.png" alt="">
    `
}

function getOrderTemplate(dish, item){
    return /*html*/`
        <div class = order-card>
            <p>${item.amount} x ${dish.dishName}</p>
            <img class="delete" onclick="deleteDish(${item.id})" src="./assets/icons/delete.png" alt="">
            <div class="order-bottom">
                <div>
                    <button onclick="subtractDish(${item.id})">-</button>
                    ${item.amount}
                    <button onclick="addDish(${item.id})">+</button>
                </div>
                ${getDishPrice(dish, item)}
            </div>
        </div>
    `
}

function getCalculationTemplate(subtotal, deliveryCost, totalPrice){
    return /*html*/`
        <div class="basket-calculations">
            <div class="calc-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2).replace('.', ',')} €</span>
            </div>
            <div class ="calc-row">
                <span>Delivery</span>
                <span>${deliveryCost.toFixed(2).replace('.', ',')} €</span>
            </div>
        </div>
        <hr class="basket-line">
        <div class="calc-row">
            <strong>Total</strong>
            <strong>${totalPrice.toFixed(2).replace('.', ',')} €</strong>
        </div>
        <button class="buy-btn" onclick="openOrderConfirmation()">Buy now (${totalPrice.toFixed(2).replace('.', ',')} €)</button>
    `;

}

function getBasketTemplate(){
    return /*html*/`
        <h4>Your Basket</h4>
        <img class="close-icon" onclick="closeBasket()" src="./assets/icons/close.png" alt="">
        <div id="order"></div>
        <div id="basket-calculations"></div>
    `;
}