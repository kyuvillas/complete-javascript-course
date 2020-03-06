import uniqid from 'uniqid';


export default class List{
	constructor (){
		this.items = [];
	}

	addItem(count, unit, ingredient){
		const item = {
			id: uniqid(),
			count,
			unit,
			ingredient
		}
		this.items.push(item);
		return item;
	}

	deleteItem(id) {
		// [2, 4, 8] splice(1,2) -> returns 4, 8, mutates array = [2
		// [2, 4, 8] slice(1,1) -> returns 4, array = [2,4,8]
		const index = this.items.findIndex(el => el.id === id);
		this.items.splice(index, 1);
	}

	updateCount(id, newCount){
		this.items.find(el => el.id === id).count = newCount;
	}
}
