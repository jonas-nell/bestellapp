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
                <span>${dish.price.toFixed(2)} €</span>
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

function getBasketTemplate(){
    return /*html*/`
        <h4>Your Basket</h4>
        <img class="close-icon" onclick="closeBasket()" src="./assets/icons/close.png" alt="">
        <div id="order"></div>
        <div>subtotal</div>
        <div>deliv fee</div>
        <div>total</div>
        <button> Buy now (price)</button>
    `
}

function getOrderTemplate(dish, item){
    return /*html*/`
        <div class = order-card>
            <p>${item.amount} x ${dish.dishName}</p>
            <div class="order-bottom">
                <div>
                    <button>-</button>
                    ${item.amount}
                    <button>+</button>
                </div>
                price
            </div>
        </div>
    `
}