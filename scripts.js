const baseEndpoint = 'http://www.recipepuppy.com/api/';
const proxy = 'https://cors-anywhere.herokuapp.com/';
const recipesGrid = document.querySelector('.recipes');
const form = document.querySelector(".search");
const table = document.querySelector(".table");

fetchRecipes = async (query) => {
    const res = await fetch(`${proxy}${baseEndpoint}?q=${query}`)
    const data = await res.json();
    return data;
}

handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    //Turn the form off
    form.submit.disabled = true;
    //Submit the search
    const recipes = await fetchRecipes(form.query.value);
    form.submit.disabled = false;
    console.log(recipes);
    displayRecipes(recipes.results)
}

displayRecipes = (recipes) => {
    console.log('Creating HTML')
    console.log(recipes)
    const html = recipes.map(function (recipe) {
        return `
                <div class="card p-3 bg-secondary text-white recipe container rounded" style="max-width: 50rem; margin-bottom: 20px;">
                <div class="container ">
                <div class="row">
                <div class="col">
                <div class="card-body">
                <h5 class="card-title">${recipe.title}</h5>
                <p class="card-text">${recipe.ingredients}.</p>
            </div>
            <div class="card-footer text-left">
            <a href="${recipe.href}" class="btn btn-sm btn-primary">Receta de ${recipe.title}</a>
            </div>
                    </div>
                    <div class="col text-center ">
                    <img class="card-img-top container img-fluid"  src="${recipe.thumbnail}" style="width:200px; border-radius:15%" alt="...">
            </div>
        
        
        </div>
        </div>
    </div>`
    });
    console.log(html);
    recipesGrid.innerHTML = html.join('');
}

form.addEventListener('submit', handleSubmit)
