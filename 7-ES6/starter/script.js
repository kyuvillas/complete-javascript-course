/*
const years = [1990,1994,1992];


var age5 = years.map(function(el){
	return 2016 - el;
})

// ES6  WITH 1 ARGUMENT
let age6 = years.map(el => 2016 - el);

// TWO Arguments - add a parenthesis

// var arr = friends.map(el => `${this.name} is friends with ${el}`);
age6= years.map((el, index) => `Age element ${index +1 }: ${2016 - el}.` );

console.log(age6);

// more than one line on the return
age6= years.map((el, index) => {
	const now = new Date().getFullYear();
	const age = now - el;

	return  `Age element ${index +1 }: ${2016 - el}.`;

})

console.log(age6);
*/
// -------------------------------------------
//Arrow function does not have THIS keyword

// ES5 - 'this' keyword will always point to windox object. Because it is a regular function
var box5 = {
	color: 'green',
	position: 1,
	clickMe: function(){
		// solution
		// var self = this; //then use variable in the function
		document.querySelector('.green').addEventListener('click', function(){
			var str = 'This is box number '+ this.position + ' and it is '+ this.color;
			alert(str );
		})
	}
}
// box5.clickMe();

// ES6 - arrow function shares the lexical 'this' that surround the function
var box6 = {
	color: 'green',
	position: 1,
	clickMe: function(){
		// solution
		// var self = this; //then use variable in the function
		document.querySelector('.green').addEventListener('click',() => {
			var str = 'This is box number '+ this.position + ' and it is '+ this.color;
			alert(str );
		})
	}
}
box6.clickMe();

/*
var box66 = {
	color: 'green',
	position: 1,
	clickMe: () => { //this will make 'this' become window
		// solution
		// var self = this; //then use variable in the function
		document.querySelector('.green').addEventListener('click',() => {
			var str = 'This is box number '+ this.position + ' and it is '+ this.color;
			alert(str );
		})
	}
}
*/
/*
function Person(name){
	this.name = name;
}
Person.prototype.myFriends5 = function(friendsArr) {

	var arr = friendsArr.map(function(el){
		return this.name + ' is friends with ' + el;
	})
	console.log(arr);
}

var friends = ['Bob', 'asd', 'Kyu'];

new Person('John').myFriends5(friends);

*/

// Desctructuring
// var john = ['John' , 26];
// var name = john[0];
// var age  = john[1];

//ES6
/*
const [name, age] = ['John', 26];
console.log(name);
console.log(age);

const obj = {
	firstName: 'John',
	lastName: 'Smith'
}
// has to match key names
const {firstName, lastName} = obj
console.log(lastName);
// if u want to change key names
const {firstName: a, lastName: b} = obj
console.log(a,b);


function calcAgeRetirement(year) {
	const age = new Date.getFullYear() - year;
	return [age, 65-age];
}

const [age2, retirement] = calcAgeRetirement(1990);
console.log(age2, retirement );
*/

/////////////////////////////////////////////
// ARRAYS
/////////////////////////////////////////////


// const boxes = document.querySelectorAll('.box');

//ES5
// var boxesArr5 = Array.prototype.slice.call(boxes);
// boxesArr5.forEach((cur , i) => {
// 	cur.style.backgroundColor = 'dodgerblue';
// });


//ES6
// const boxesArr6 = Array.from(boxes).forEach((item, i) => {
// 	item.style.backgroundColor = 'dodgerblue'});

//ES6 - For Of
/*
for (const cur of boxesArr6){
	// you can use 'continue' and 'break'
}*/
/*
var ages = [12,2,15,42,20];
ages.indexOf(12);

//ages6
ages.findIndex(cur => cur >= 18)
ages.find(cur => cur >= 18)
*/

/////////////////////////////////////////////
// SPREAD
/////////////////////////////////////////////

function addFourAges(a,b,c,d){
	return a + b+ c+ d;
}
var ages = [13,2,41,2];
var ages2 = [13,2,41,2];
const max3 = addFourAges(...ages);
console.log(max3);

var manyAges = [...ages , ...ages2];
console.log(manyAges);

/////////////////////////////////////////////
// REST parameters
/////////////////////////////////////////////


/*
//ES5
function isFullAge5(){
	// console.log(arguments ); 	// will print but not considered Array
								// args are considered Object
	var argsArr = Array.prototype.slice.call(arguments);

	argsArr.forEach((item, i) => {
		console.log((2016 - item) >= 18);
	});

}

isFullAge5(1990,1996,1990);

// ES6
function isFullAge6(limit, ...years){
	years.forEach(cur,  => console.log((2016 - cur) >= limit);

}
isFullAge6(limit, 1990,1996,1990);
*/

/////////////////////////////////////////////
//Default parameters
/////////////////////////////////////////////



//ES5
// lastName = lastName === undefined ? 'Smith';

//ES6
// Object constructor
// function SmithPerson(firstName, lastName = 'Smith'){
//
// }

/////////////////////////////////////////////
// MAPS
// keys can be any data type, keys are iterable
/////////////////////////////////////////////
/*

const question = new Map();
question.set('question', 'What is the official name of the latest majox JS version?')	//defining new value pair
question.set(1, 'ES5');
question.set(2, 'ES2015');
question.set(3, 'ES7');
question.set('correct', 3);
question.set(true, 'Correct Answer');
question.set(false, 'Wrong, pls try again');


console.log(question.get('question'));
console.log(question.size);

// if(question.has(4))

// question.delete(4);
// question.clear();

// access the keys of the Map
// question.forEach((value, key ) => {
// 	console.log(`This is ${key}, and its set to ${value}`)
// });

// for(let key of question.entries())
for(let [key,value] of question.entries()){
	if(typeof(key) === 'number')
		console.log(`This is ${key}, and its set to ${value}`);
}
*/


/////////////////////////////////////////////
// CLASS
// you can methods
// not hoisted
// you can add methods to class, instead of properties
/////////////////////////////////////////////

/*

// ES6
class Person6 {
	// constructor is MUST for a class
	constructor (name, yearOfBirth, job){
		this.name = name;
		this.yearOfBirth;
		this.job;
	}

	//ES5
	// Person6.prototype
	calculateAge() {
		var age = new Data().getFullYear - this.yearOfBirth;
		console.log(age);
	}

	static greeting(){
		console.log('Hey there!');
	}
}
const john6 = new Person6('John', 1990, 'teacher');

Person6.greeting();

*/


/////////////////////////////////////////////
// CLASS and subclasses
// inheritance
/////////////////////////////////////////////
/*
// ES5 Subclass
 // var Person5 = function( name, yearOfBirth, job) 		//SUPERCLASS
 // var Athlete5 = function( name, yearOfBirth, job, olymicGames, medals){		// SUBCLASS
	//  Person5.call(this,name,yearOfBirth,job)
 // }

// Athlete5.prototype = Object.create(Person5.prototype);


// ES6
// ES6
// SUPERCLASS
class Person6 {
	// constructor is MUST for a class
	constructor (name, yearOfBirth, job){
		this.name = name;
		this.yearOfBirth;
		this.job;
	}

	//ES5
	// Person6.prototype
	calculateAge() {
		var age = new Data().getFullYear - this.yearOfBirth;
		console.log(age);
	}

	static greeting(){
		console.log('Hey there!');
	}
}
// SUBCLASS
class Athlete6 extends Person6 {
	constructor(name, yearOfBirth,job,olympicGames, medals){
		super(name, yearOfBirth, job);
		this.olympicGames= olympicGames;
		this.medals = medals;

	}

	wonMedal() {
		this.medals ++;
		console.log(this.medals);
	}
}

const John = new Athlete6('John', 1996, 'swimmer', 3, 10);

John.wonMedal();

*/

















//
