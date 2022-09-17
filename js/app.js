const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// Event Listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});


// Devuelve las recetas que coincidan con el ingrediente buscado
function getMealList() {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                     <div class="meal-item" data-id="${meal.idMeal}">
                         <div class="meal-img">
                             <img src="${meal.strMealThumb}" alt="foto de la receta">
                         </div>
                         <div class="meal-name">
                             <h3>${meal.strMeal}</h3>
                             <a href="" class="recipe-btn">Get Recipe</a>
                         </div>
                     </div>
                     `;
                });
                mealList.classList.remove('notFound');
            } else {
                html = "Lo sentimos, no hemos encontrado recetas con este ingrediente.";
            }
            mealList.innerHTML = html;
            mealList.classList.add('notFound');
        })
}


// Muestra la receta de la comida
function getMealRecipe(e) {
    e.preventDefault(); //Este método evita que el navegador ejecute el comportamiento predeterminado del elemento seleccionado
    if (e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        console.log(mealItem);
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then(response => response.json())
            .then(data => mealRecipeModal(data.meals));
    }
}

//Crear Modal // Ventana de receta
function mealRecipeModal(meal) {
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class="recipe-title">${meal.strMeal}</h2>
        <p class="recipe-category">${meal.strCategory}</p>
        <p class="recipe-category">${meal.strArea}</p>
        <div class="recipe-instruct">
            <h3>Intructions</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class="recipe-meal-img">
            <img src="${meal.strMealThumb}" alt="">
        </div>
        <div class="recipe-link">
            <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}