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

}