// const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);

export default class Recipe {
	constructor (id){
		this.id = id;
	}

	async getRecipe(){
		try {
			const result = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`).then(res => res.json() )
			// const recipe = result.recipes;
			console.log(result);
			this.title = result.recipe.title;
			this.author = result.recipe.publisher;
			this.img = result.recipe.image_url;
			this.url = result.recipe.source_url;
			this.ingredients = result.recipe.ingredients;
		} catch (e) {
			console.log(e);
		}
	}

	calcTime() {
		const numIng = this.ingredients.length;
		const periods = Math.ceil(numIng / 3);
		this.time = periods * 15;
	}

	calcServings(){
		this.servings = 4;
	}

	parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units = [...unitsShort, 'kg', 'g'];

        const newIngredients = this.ingredients.map(el => {
            // 1) Uniform units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });

            // 2) Remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            // 3) Parse ingredients into count, unit and ingredient
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el2 => units.includes(el2));		// will test each unit if element pass test

            let objIng;
            if (unitIndex > -1) {
                // There is a unit
                // Ex. 4 1/2 cups, arrCount is [4, 1/2] --> eval("4+1/2") --> 4.5
                // Ex. 4 cups, arrCount is [4]
                const arrCount = arrIng.slice(0, unitIndex);

                let count;
                if (arrCount.length === 1) {
                    count = eval(arrIng[0].replace('-', '+'));
                } else {
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }

                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                };

            } else if (parseInt(arrIng[0], 10)) {
                // There is NO unit, but 1st element is number
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }
            } else if (unitIndex === -1) {
                // There is NO unit and NO number in 1st position
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                }
            }

            return objIng;
        });
        this.ingredients = newIngredients;
    }

	updateServings(type) {
		// Servings
		const newServings = type === 'dec' ? this.servings -1 : this.servings +1;

		// Ingredients
		this.ingredients.forEach((item, i) => {
			item.count *= (newServings/ this.servings);
		});

		this.servings = newServings;
		console.log(this.servings);
	}
}
