function getCategoryTemplate(category){
    return /*html*/`
        <section>
            <div class="content">
                <div class="dish-header">
                    <h2>${category.title}</h2>
                    <img class="dish-icon" src="${category.icon}" alt="">
                </div>
                <div id="${category.type}-container"></div>
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
