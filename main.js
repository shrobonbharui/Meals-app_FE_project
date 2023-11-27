// Get DOM elements
const search = document.getElementById('search');
const searchButton = document.getElementById('button');
const searchResult = document.getElementById('search-results');
const list = document.getElementById('l3');
const reset = document.getElementById('l2');

// Initialize an empty array to store fav meals
const favlist = [];

// take value from user and fetch in api
searchButton.addEventListener('click',()=>{
    
    const searchQuery = search.value;

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`).then(response => response.json()).then(data => {

        if(data.meals === null){
            alert('meal is not found');            
        }
        else{
            searchResultDisplay(data.meals);
        };
    }).catch(error => {
        console.error(error);
    });

});

// Define a function to display meal items on screen
function searchResultDisplay(meals) {
    searchResult.innerHTML='';

    meals.forEach(meal => {
        const mealElement = document.createElement('div');
        mealElement.classList.add('meal');

        const mealImage = document.createElement('img');
        mealImage.src = meal.strMealThumb;
        mealImage.alt = meal.strMeal;
        mealElement.appendChild(mealImage);

        const mealName = document.createElement('h2');
        mealName.innerText = meal.strMeal;
        mealElement.appendChild(mealName);

        const mealIngredients = document.createElement('ul');
        for(let i=1; i<+20; i++){
            if(meal[`strIngredients${i}`]){
                const ingredient = document.createElement('li');
                ingredient.innerText =`${meal[`strIngredients${i}`]} - ${meal[`strMeasure${i}`]}`;
                mealIngredients.appendChild(ingredient);
            };
        };
        mealElement.appendChild(mealIngredients);

        const mealDescription = document.createElement('p');
        mealDescription.classList.add('description');
        mealDescription.innerText = meal.strInstructions;
        mealElement.appendChild(mealDescription);
    
        const readMoreButton = document.createElement('button');
        readMoreButton.innerHTML = 'Read More';
        readMoreButton.addEventListener('click', () => {
          mealDescription.classList.toggle('show');
        });
        mealElement.appendChild(readMoreButton);
    
        const favoriteButton = document.createElement('button');
        favoriteButton.innerHTML = '<i class="fas fa-heart"></i> Add to Favorites';
        favoriteButton.addEventListener('click', () => {
          addToFavorites(meal);
        });
        mealElement.appendChild(favoriteButton);
    
        searchResult.appendChild(mealElement);
    });
};

// Define a function to add a meal in favorites
function addToFavorites(meal){
    if(!favlist.includes(meal)){
        favlist.push(meal);
        alert(`${meal.strMeal} has added to your list`)
    }
    else{
        alert(`${meal.strMeal} is already in your list`)
    }
    list.addEventListener('click', showFav);
};

// Define a function to show all fav meal which are in favr array
function showFav(){
    searchResult.innerHTML = '';
    if(favlist.length === 0){
        const noFavMassage = document.createElement('p');
        noFavMassage.innerText = 'no favorite meals';
        searchResult.appendChild(noFavMassage);
    }
    else{
        favlist.forEach(meal => {
            const mealElement = document.createElement('div');
            mealElement.classList.add('meal');
    
            const mealImage = document.createElement('img');
            mealImage.src = meal.strMealThumb;
            mealImage.alt = meal.strMeal;
            mealElement.appendChild(mealImage);
    
            const mealName = document.createElement('h2');
            mealName.innerText = meal.strMeal;
            mealElement.appendChild(mealName);
    
            const mealIngredients = document.createElement('ul');
            for(let i=1; i<+20; i++){
                if(meal[`strIngredients${i}`]){
                    const ingredient = document.createElement('li');
                    ingredient.innerText =`${meal[`strIngredients${i}`]} - ${meal[`strMeasure${i}`]}`;
                    mealIngredients.appendChild(ingredient);
                }
                else{
                    break;
                }
            };
            mealElement.appendChild(mealIngredients);

            const removeButton = document.createElement('button');
            removeButton.innerHTML = '<i class="fas fa-trash"></i> Remove from Favorites';
            removeButton.addEventListener('click', () => {
                removeFromFavorites(meal);
            });
            mealElement.appendChild(removeButton); 

            searchResult.appendChild(mealElement);
        });
    }

}

// Define a function to remove meal from favList
function removeFromFavorites(meal){
    const mealIndex = favlist.findIndex(fav => fav.idMeal === meal.idMeal);
    if(mealIndex !== -1){
        favlist.splice(mealIndex, 1);
        showFav();
        alert(`${meal.strMeal} has been removed from your list`);
    }
}

// Define a function to reset
reset.addEventListener('click', function() {
    searchResult.innerHTML = '';
});