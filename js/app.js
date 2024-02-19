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
        <p class="recipe-category">${meal.strTags}</p>
        <div class="recipe-ingredients">
            <h3>Ingredients</h3>
            <p>${meal.strIngredient1 +" -- "+ meal.strMeasure1}</p>
            <p>${meal.strIngredient2 +" -- "+ meal.strMeasure2}</p>
            <p>${meal.strIngredient3 +" -- "+ meal.strMeasure3}</p>
            <p>${meal.strIngredient4 +" -- "+ meal.strMeasure4}</p>
            <p>${meal.strIngredient5 +" -- "+ meal.strMeasure5}</p>
            <p>${meal.strIngredient6 +" -- "+ meal.strMeasure6}</p>
            <p>${meal.strIngredient7 +" -- "+ meal.strMeasure7}</p>
            <p>${meal.strIngredient8 +" -- "+ meal.strMeasure8}</p>
            <p>${meal.strIngredient9 +" -- "+ meal.strMeasure9}</p>
        </div>
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