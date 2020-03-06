// AGENDA: private and public data, excapsulation, separation of concerns
// data encapsulation- allows to hide implementation details from the outside
// scope. Which is sometimes called an API
// IMPLEMENTING MODULES

// secret of Module pattern - it returns an Object that contains all functions

// Separation of Concern - each part of applicatoin should be independent.

/* var budgetController = (function(){

    var x = 23;
    // this is a private function
    var add = function(a) {
      return x+ a;
    }

    // publicTest() is exposed to public. But variables like x and function add are not.
    // Closure makes it possible for these methods on the return to access data from module
    return {
      publicTest: function(b){
        console.log(add(b));
      }
    }

})();
*/

// Module 1: Budget Module
var budgetController = (function(){

	//Models for Expense and Income
	var Expense = function(id, description, value){
		this.id = id;
		this.description = description;
		this.value = value;
		this.percentage = -1;
	};

	Expense.prototype.calculatePercentage = function(totalIncome){

		if(totalIncome > 0){

			this.percentage = Math.round((this.value / totalIncome) * 100);

		}else{

			this.percentage = -1;
		}

	}

	Expense.prototype.getPercentage = function() {  return this.percentage; }

	var Income = function(id, description, value){
		this.id = id;
		this.description = description;
		this.value = value
	};

	// this is the Global Data Structure
	var data = {
		allItems: {
			exp: [],
			inc: []
		},
		totals: {
			exp: 0,
			inc: 0
		},
		budget: 0,
		percentage: -1
	}

	var caculateTotal = function(type) {
			var sum = 0;
			data.allItems[type].forEach((item, i) => {
				sum += item.value;
			});
			data.totals[type] = sum;
	};

	return {
		addItem: function(type, des, val){
			var newItem, id;

			// Create new ID
			if(data.allItems[type].length > 0){
				id = data.allItems[type][data.allItems[type].length -1].id + 1;
			}else{
				id = 0;
			}


			// Create new item based on 'inc' or 'exp' type
			if(type === 'exp'){
				newItem = new Expense(id, des, val);
			}else if(type === 'inc'){
				newItem = new Income(id, des, val);
			}

			// Push it into our data structure
			data.allItems[type].push(newItem);

			// Return the new element
			return newItem;
		},
		deleteItem: function(type, id){
			var index, idArr;
			// allItems: {
			// 	exp: [],
			// 	inc: []
			// }

			//get all IDS
			idArr = data.allItems[type].map(function(current){
				return current.id;
			});

			index = idArr.indexOf(id);

			if(index !== -1){
				data.allItems[type].splice(index, 1);
			}

			console.log(data.allItems[type]);

		},

		calculateBudget: function(){

			// Calculate total income and expenses
			caculateTotal('exp');
			caculateTotal('inc');

			// Calculate the budget: income - expenses
			data.budget = data.totals.inc - data.totals.exp;

			// Calculate the percentage of income that we spent
			if(data.totals.inc > 0)
				data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
		},
		calculatePercentages : function(){

			data.allItems.exp.forEach((current, i) => {
				current.calculatePercentage(data.totals.inc);
			});


		},
		getPercentages: function(){
			var allPercentages = data.allItems.exp.map(function(cur){
				return cur.getPercentage();
			});
			return allPercentages;
		},
		getBudget: function(){
			return {
				budget: data.budget,
				totalInc: data.totals.inc,
				totalExp: data.totals.exp,
				percentage: data.percentage
			}
		},
		test: function(){
			return data;
		}
	}

})();

// Module 2: UI Module
var UIController = (function(){

	var DOMStrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		inputButton: '.add__btn',
		incomeContainer: '.income__list',
		expensesContainer: '.expenses__list',
		budgetLabel: '.budget__value',
		totalIncLabel: '.budget__income--value' ,
		totalExpLabel: '.budget__expenses--value' ,
		expensePercent: '.budget__expenses--percentage',
		container: '.container',
		expensesPercLabel: '.item__percentage'
	}
	var formatNumber = function(num, type) {
        var numSplit, int, dec, type;
        /*
            + or - before number
            exactly 2 decimal points
            comma separating the thousands

            2310.4567 -> + 2,310.46
            2000 -> + 2,000.00
            */

        num = Math.abs(num);
        num = num.toFixed(2);

        numSplit = num.split('.');

        int = numSplit[0];
        if (int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3); //input 23510, output 23,510
        }

        dec = numSplit[1];

        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;

    };
	var nodeListForEach = function(list, callback){
		list.forEach((item, i) => {
			callback(item, i);
		});

	}
	return {
		changedType: function(){

			var fields = document.querySelectorAll(
					DOMStrings.inputType + ',' +
					DOMStrings.inputDescription + ',' +
					DOMStrings.inputValue
			)
			nodeListForEach(fields, function(cur){
				cur.classList.toggle('red-focus');
			});

	 		document.querySelector(DOMStrings.inputButton).classList.toggle('red');
		},
		getInput: function(){
			return {
				type:  document.querySelector(DOMStrings.inputType).value, // Will be either inc or exp
				description: document.querySelector(DOMStrings.inputDescription).value,
				value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
			}
		},
		addListItem: function(obj, type){
			var html,element;
			// Create HTML string with placeholder textContent

			if(type === 'inc'){
				element = DOMStrings.incomeContainer;
				html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div>	<div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'

			}else if(type ==='exp'){
				element = DOMStrings.expensesContainer;
				html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">10%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'

			}

			// Replace the placeholder text with some actual data
			newHTML = html.replace('%id%',obj.id);
			newHTML = newHTML.replace('%description%',obj.description);
			newHTML = newHTML.replace('%value%', formatNumber(obj.value, type));

			// Insert the HTML into the DOM
			document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);

		},
		clearFields: function(){
			var fields, fieldsArr;

			// this returns a list
			fields = document.querySelectorAll(DOMStrings.inputDescription + ',' + DOMStrings.inputValue);

			// Convert list to Array using CALL (borrow method)
			fieldsArr = Array.prototype.slice.call(fields);

			// Clear fields
			fieldsArr.forEach(function(current, index, array){
				current.value = "";
			});

			// back focus on first input
			fieldsArr[0].focus();

		},
		displayBudget: function(obj){
            var type;
            obj.budget > 0 ? type = 'inc' : type = 'exp';
			document.querySelector(DOMStrings.budgetLabel).textContent = formatNumber(obj.budget, type);
			document.querySelector(DOMStrings.totalIncLabel).textContent = formatNumber(obj.totalInc, 'inc');
			document.querySelector(DOMStrings.totalExpLabel).textContent = formatNumber(obj.totalExp, 'exp');


			if(obj.percentage > 0){
				document.querySelector(DOMStrings.expensePercent).textContent = obj.percentage +'%';
			}else{
				document.querySelector(DOMStrings.expensePercent).textContent = '-';
			}

		},
		deleteListItem: function(selectorID){

			var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
		},
		displayPercentage: function(percentages){

			var fields = document.querySelectorAll(DOMStrings.expensesPercLabel);

			nodeListForEach(fields, function(current, index){

				if(percentages[index] > 0){
					current.textContent = percentages[index] + '%';
				}else{
					current.textContent = '---';
				}
			})



		},

		getDOMStrings: function(){
			return DOMStrings;
		}
	}

})();

// Module 3: Global app controller
var controller = (function(budgetCtrl, UICtrl){

	var DOM = UICtrl.getDOMStrings();
	var setUpEventListeners = function(){
		// add button
		document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);

	  	// bc it doesnt happen on a press, so we add an event to the global events
		document.addEventListener('keypress', function(event){
			// when ENTER is pressed
			if(event.keycode === 13 || event.which === 13){
				ctrlAddItem();
			}
		});

		//
		document.querySelector(DOM.container).addEventListener('click',ctrlDeleteItem );
		document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);

	};



	var updateBudget = function(){

		var budgetObj;
		// 1. Calculate the budget
		budgetCtrl.calculateBudget();

		// 2. Return budget
		budgetObj = budgetCtrl.getBudget();

		// 3. Display the budget on the UI
		UICtrl.displayBudget(budgetObj);
	};

	var updatePercentages = function(){

		// 1. Calculate updatePercentages
		budgetCtrl.calculatePercentages();

		// 2. Read percentages from the budget controller
		var percentages = budgetCtrl.getPercentages();


		// 3. Update UI with the new percentages
		UICtrl.displayPercentage(percentages);

	};

	var ctrlAddItem = function(){
		var inputObj, newItem;
		// 1. Get the filled input data
		inputObj = UICtrl.getInput();

		if(inputObj.description !== '' && !isNaN(inputObj.value) && inputObj.value > 0 ) {

			// 2. Add the item to the budget controller
			newItem = budgetCtrl.addItem(inputObj.type, inputObj.description, inputObj.value);

			// 3. Add the item to the UI
			UICtrl.addListItem(newItem, inputObj.type);

			// 4. Clear the fields
			UICtrl.clearFields();

			// 5. Calculate and update budget
			updateBudget();

			// 6. Calculate and update the percentages
			updatePercentages();


		}
	}

	// we put event parameter to know which the target element is. The one who fired the event
	var ctrlDeleteItem = function(event){
		// console.log(event.target); 		prints the target element
		var itemID, splitID,type,id;

		// 1. Traverse DOM. From target element up to the parent element. This case = div
		itemID = (event.target.parentNode.parentNode.parentNode.parentNode.id);

		if(itemID){

			splitID = itemID.split('-');
			type = splitID[0];
			id = parseInt(splitID[1]);

			// 1. delete the item from the Data Sctructure
			budgetCtrl.deleteItem(type, id);

			// 2. Delete the item from UI
			UICtrl.deleteListItem(itemID);

			// 3. Update and show the new budget
			updateBudget();

			// 4. Calculate and update the percentages
			updatePercentages();
		}
	}

	return {
		init: function(){
			// public initialized function
			console.log('Application has started');
			UICtrl.displayBudget({
				budget: 0,
				totalInc:0,
				totalExp: 0,
				percentage: -1
			});
			setUpEventListeners();
		}
	}


})(budgetController, UIController);

controller.init();

// Event Bubbling - event fired on an element, then it is also fired to all its parent elements
//					- target element ^
// Event Delegation - not set up the event Handler on the target element, but to attach it
// 						to a parent Element

// var ofeliaYr = 1998;

















//
