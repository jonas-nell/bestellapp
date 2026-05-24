function renderCategories(){
    const main = document.getElementById("main");

    for (let category of categories){
        main.innerHTML += getCategoryTemplate(category);
    }
}

function init(){
    renderCategories();
}