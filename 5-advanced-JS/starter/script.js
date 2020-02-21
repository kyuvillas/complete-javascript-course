/*
var Person = function(name, yearBirth, job){
  this.name = name;
  this.yearBirth = yearBirth;
  this.job = job;
  // this.calculateAge = function(){
  //   console.log(2016 - this.yearBirth);
  // }
}

// setting prototype
Person.prototype.calculateAge = function(){
  console.log(2016 - this.yearBirth);
}

var john = new Person ('John', 1990, 'Programmer');

console.log(john);
*/
//------------------------------------------------------
/*
// Object.create
var personProto = {
  calculateAge: function() {
    console.log(2016 - this.yearBirth);

  }
};

var john = Object.create(personProto);
john.name = 'John';
john. yearBirth = 1990;
john.job = 'teacher';

var jane = Object.create(personProto,
  {
    name: {value: 'Jane'},
    yearBirth : {value: 1992},
    job : {value: 'designer'}
  })
*/
//---------------------------------------------------------------------------
// Primitives vs Objects

var a = 23;
var b = 23;

console.log(a, b); // different results

var ob1 = {
  age: 26
}
var ob2 = ob1;

ob1.age = 32;
console.log(ob1.age, ob2.age); // will be the same. Bc we created a reference not our own copy

// when we pass a primitive to a function, it will not affect the variable outside the function
// but if we pass an object, we pass a reference

var age = 23;
var obj = {
  age: 23;
  city: 'Lisbon'
}

function change(a,b){
  a = 30;
  b.city = 'Frankfurt';
}
change(age,obj);
console.log(age);
console.log(obj.city);

// ---------------------
// First Class FUNCTIONS
// Lecture: Function returning FUNCTIONS
//  Video 66
/*
function interviewQuestion(job){
  if(job === 'designer'){
    return function (name){
      console.log(name + ', can you pls explain what UX design is?');
    }
  }else{
    return function(name){
      console.log('Hello '+ name + ', what do you do?');
    }
  }
}

var teacherQuestion = interviewQuestion('teacher');
teacherQuestion('Queenie');
interviewQuestion('designer')('John');
*/

// ---------------------
// First Class FUNCTIONS
// Lecture: Passing functions as argumnets
//  Video 66



//--------------------
// Immdeately Invoked FUNCTIONS (IIFE)
// Video 67

// data privacy, bc the variable inside arent accessible outside this function
(function (){
  var score = Math random() * 10;
  console.log(score >= 5);
})();
