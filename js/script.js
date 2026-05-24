let dishes = [];

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

    for (let category of categories){
        main.innerHTML += getCategoryTemplate(category);
    }
}

function renderDishes(){
    for (const dish of dishes){
        const container = document.getElementById(`${dish.type}-container`);
        container.innerHTML += getDishTemplate(dish);
    }
}