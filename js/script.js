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
        for (const item of basket){
            basketContainer.innerHTML += getBasketTemplate(item);
        }
    }
}