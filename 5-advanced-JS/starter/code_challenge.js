// IIFE
(function() {
  var Question = function(question, choicesArr, answer){
    this.question = question;
    this.choicesArr = choicesArr;
    this.answer = answer;
  }

  // write a method on the Prototype property. So its accessible by all children Objects
  Question.prototype.displayQuestion =
  function() {
    console.log(this.question);
    for(var i = 0 ; i < this.choicesArr.length;  i ++){
      console.log(i+1 + ' - ' + this.choicesArr[i]);
    }
  }
  // callback in this case is, is to update the score. (Closure function)
  Question.prototype.checkAnswer =  function(ans,callback){
    var sc;
    if(parseInt(ans) === this.answer){
        console.log('CORRECT!!!');
        // score++;
        sc = callback(true);
    }
    else {
      sc = callback(false);
        console.log('WHAT? WRONG!!!');
    }
    this.displayScore(sc);
  }
  Question.prototype.displayScore = function(scStr){
    console.log('Your current score: ' + scStr);
    console.log('===========================');
  }
  // questions
var question1 = new Question('Is Javascript the best language in the world?',
                              ['Yes', 'No'], 1);
var question2 = new Question('Which version is the newest Javascript??',
                              ['ES5', 'ES8'], 2);
var question3 = new Question('What year is JavaScript created?',
                              ['1992', '1996'], 2);
var questionArr = [question1, question2,question3];
var randomNum, answer;
// call score Closure


// Closure Function to keep score
// This function will contain all score related stuff

function scoreFunc() {
  var sc = 0;

  return function(correct) {
    if(correct){
      sc ++;
    }
    return sc;
  }
}
var keepScore = scoreFunc();

function displayNextStep() {


    // console.log(questionArr.length);
    randomNum = Math.floor(Math.random() * Math.floor(questionArr.length));
    // console.log(questionArr[randomNum].question);

    questionArr[randomNum].displayQuestion();
    // console.log(question1);

    // display prompt. Input answer
    answer = (prompt('Please write your answer'));
    if(answer !== 'exit'){
      questionArr[randomNum].checkAnswer(answer,keepScore);
      displayNextStep();
    }

}

// main interface

displayNextStep();
})();


//
