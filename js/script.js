let dishes = [];
let basket = [];

async function loadDishes(){
    const savedDishes = localStorage.getItem("dishesData");

    if (savedDishes){
        dishes = JSON.parse(savedDishes);
    } else {
        const response = await fetch("./data/dishes.json");
        dishes = await response.json();

        saveToLocalStorage();
    }
    init()
}

function init(){
    renderCategories();
    renderDishes();
    renderBasket();
}

function saveToLocalStorage(){
    localStorage.setItem("dishesData", JSON.stringify(dishes));
}

function renderCategories(){
    const main = document.getElementById("main");

    for (const category of categories){
        main.innerHTML += getCategoryTemplate(category);
    }
}

function renderDishes(){
    for (const dish of dishes){
        const container = document.getElementById(`${dish.type}-container`);
        container.innerHTML += getDishTemplate(dish);
    }
}

function addToBasket(dishId){

    const basketItem = basket.find(item => item.id ===dishId);

    if(basketItem){
        basketItem.amount++;
    } else{
        basket.push({
            id: dishId,
            amount: 1
        });
    }
    
    renderBasket();
    renderOrder();
}

function toggleBasket(){
    
    document.getElementById("basket").classList.toggle("open");

}

function closeBasket(){
    document.getElementById("basket").classList.remove("open");

}

function renderBasket(){
    const basketContainer = document.getElementById("basket");

    if (basket.length === 0){
        basketContainer.innerHTML = getEmptyBasketTemplate();
    } else{
        const {subtotal, deliveryCost, totalPrice} = calculateBasketTotals();
        basketContainer.innerHTML = "";
        
        basketContainer.innerHTML += getBasketTemplate(subtotal, deliveryCost, totalPrice);
        }
        renderOrder();
}

function renderOrder(){
    const order = document.getElementById("order");

    order.innerHTML = "";

    for (const item of basket){
        const dish = dishes.find(d => d.id === item.id);

        order.innerHTML += getOrderTemplate(dish, item);
    }
}

function getDishPrice(dish, item){
    let dishPrice = item.amount * dish.price
    return dishPrice
}

function addDish(dishId){
    const basketItem = basket.find(item => item.id === dishId);

    basketItem.amount ++;

    renderBasket();
    renderOrder();
}

function subtractDish(dishId){
    const basketItem = basket.find(item => item.id === dishId);

    basketItem.amount --;

    if (basketItem.amount === 0){
        basket = basket.filter(item => item.id !== dishId);
    }
    
    renderBasket();
    renderOrder();
}

function deleteDish(dishId){
    const basketItem = basket.find(item => item.id === dishId);

    basketItem.amount = 0;

    if (basketItem.amount === 0){
        basket = basket.filter(item => item.id !== dishId);
    }

    renderBasket();
    renderOrder();
}

function calculateBasketTotals(){
    let subtotal = 0;

    for (const item of basket) {
        const dish = dishes.find(d => d.id === item.id);
        if (dish){
            subtotal+=dish.price * item.amount;  
        }
    }

    const deliveryCost = 4.99;

    const totalPrice = subtotal + deliveryCost;

    return {
        subtotal: subtotal,
        deliveryCost: deliveryCost,
        totalPrice: totalPrice
    };
}