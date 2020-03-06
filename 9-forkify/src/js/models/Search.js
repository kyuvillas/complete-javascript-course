import axios from 'axios';

export default class Search {
	constructor(query){
			this.query= query;
	}

	async getResults() {
		//https://forkify-api.herokuapp.com/api/search https://crossorigin.me/
		try {
			const result = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`).then(res => res.json() )
			const recipes = result.recipes;
			this.result = recipes;
		}catch(error){
			console.log(error);
		}
	}
}
