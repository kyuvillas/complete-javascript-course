/*
// Importing Models
import searchString from './models/Search';

// Importing named exports from View
import { add , multiply as m, ID}  from './views/searchView.js';
import * as searchView from './views/searchView.js';

console.log(`Using imported function! ${searchView.add(searchView.ID, 2)} and ${searchView.multiply(2,3)}. ${searchString}`)
*/
import Search  from './models/Search';
import Recipe  from './models/Recipe';
import List  from './models/List';
import Likes  from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView  from './views/recipeView';
import * as listView  from './views/listView';
import * as likesView  from './views/likesView';
import { elements,renderLoader,clearLoader } from './views/base';
/** Global state of the app
 * 	- Search object
 	- Current recipe object
	- Shopping list object
	- Liked recipes
 */
const state = {};

const controlSearch = async () => {

	// 1. Get query from the view
	// const query = searchView.getInput();
	const query = 'pizza';

	if(query){

		try {
			// 2. New search object and add to state
			state.search = new Search(query);

			// 3. Prepare UI for results
			searchView.clearInput();
			searchView.clearResults();
			renderLoader(elements.searchResult);

			// 4. Search for recipes
			await state.search.getResults();

			// 5. Render results on UI
			clearLoader();
			searchView.renderResults(state.search.result);

		} catch (error){
			alert('Something went wrong :(')
		}

	}

}

elements.searchForm.addEventListener('submit', e => {
	e.preventDefault();
	controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
	const btn = e.target.closest('.btn-inline');
	if(btn) {
		const goToPage = parseInt(btn.dataset.goto, 10);
		searchView.clearResults();
		searchView.renderResults(state.search.result, goToPage);

	}
})

// Test
window.addEventListener('load', controlSearch);

/*
**  RECIPE CONTROLLER
*/
const controlRecipe = async () => {
	const id = window.location.hash.replace('#','');

	if(id){

		// Prepare UI for changes
		recipeView.clearRecipe();
		renderLoader(elements.recipe);

		// Hightlight selected searched item
		if(state.search && state.recipe) {
			try {
				searchView.highlightSelected(id);
			} catch (e) {

			}
		}

		// Create new Recipe Object
		state.recipe = new Recipe(id);
		window.r = state.recipe;

		try {
			// Get recipe data
			await state.recipe.getRecipe();

			// Calculate servings and time
            state.recipe.parseIngredients();
			state.recipe.calcTime();
			state.recipe.calcServings();

			// Render Recipe
			clearLoader();
			recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));

		} catch (e) {
			console.log(e);
			alert('Something went wrong;');
		}

	}
}
// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load',controlRecipe);
['hashchange','load'].forEach(event =>  window.addEventListener(event, controlRecipe));

/*
** LIST CONTROLLER
*/
const controlList = () => {
	// Create a new List IF theres not one yet
	if(!state.list) {
		state.list = new List();
	}
	// Add each ingredient to the list
	state.recipe.ingredients.forEach((el , i) => {
		const item = state.list.addItem(el.count,el.unit,el.ingredient);
		listView.renderItem(item);
	});

}

/*
** LIKE CONTROLLER
*/
const controlLike = () => {
	if(!state.likes ) state.likes = new Likes();

	const currentID = state.recipe.id ;

	// User has not yet liked current recipe
	if(!state.likes.isLiked(currentID)){
		// Add like to the state
		const newLike = state.likes.addLike(
			currentID,
			state.recipe.title,
			state.recipe.author,
			state.recipe.img
		)

		// Toggle the like button
		likesView.toggleLikeBtn(true);

		// Add like to UI list
		likesView.renderLike(newLike);

	// User HAS liked current recipe
	}else {
		// Remove like from the state
		state.likes.deleteLike(currentID);
		likesView.toggleLikeBtn(false);

		// Toggle teh like button
		likesView.deleteLike(currentID);

		// Remove like from UI list
		console.log(state.likes);

	}
	likesView.toggleLikeMenu(state.likes.getNumLikes());
}

// Restore liked recipes on page load
window.addEventListener('load', () => {
	state.likes = new Likes();

	// Restore likes from localStorage
	state.likes.readStorage();

	// Toggle like Menu
	likesView.toggleLikeMenu(state.likes.getNumLikes());

	// Render existing likes
	state.likes.likes.forEach(like => likesView.renderLike(like));

})

// Handle delete and update list item events
elements.shopping.addEventListener('click', e => {
	const id = e.target.closest('.shopping__item').dataset.itemid;

	// Handle the delte button
	if(e.target.matches('.shopping__delete, .shopping__delete *')) {
		// Delete from state
		state.list.deleteItem(id);

		// Delete from UI
		listView.deleteItem(id);
	} else if(e.target.matches('.shopping__count-value')){
		const val = parseFloat(e.target.value);
		state.list.updateCount(id,val);
	}
})

// Handling recipe button clicks
elements.recipe.addEventListener('click', e => {

	if(e.target.matches('.btn-decrease, .btn-decrease *')){
		// decrease button is clicked
		state.recipe.updateServings('dec');
		recipeView.updateServingIngredients(state.recipe);

	} else if(e.target.matches('.btn-increase, .btn-increase *')){

		// increase button is clicked
		state.recipe.updateServings('inc');
		recipeView.updateServingIngredients(state.recipe);

	}
	else if(e.target.matches('.recipe__btn--add, .recipe__btn--add *')){
		// Add item  to Shopping List
		controlList();
	}
	else if(e.target.matches('.recipe__love, .recipe__love *')){
		// List Controller
		controlLike();
	}
});
















// const search = new Search('pizza');
// search.getResults();
