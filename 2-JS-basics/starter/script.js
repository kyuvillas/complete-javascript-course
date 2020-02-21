
function calcTip(valueArr){
  var tipsArr = [];
  var amountArr = [];
  for(var i = 0; i< valueArr.length ; i++){
    var value = valueArr[i];
    if(value < 50){
      tipsArr.push( .2 * value);
      amountArr.push(valueArr + ( .2 * value));
    } else if(value >= 50 && value < 200){
      tipsArr.push( .15 * value);
      amountArr.push(valueArr + ( .15 * value));
    } else {
      tipsArr.push( .1 * value);
      amountArr.push(valueArr + (.1 * value));
    }
  }
  return {tipsArr: [tipsArr], amountArr: [amountArr]};

}

var John = {
  name: 'John Smith',
  paidBills: [124, 48, 268, 180, 42],
  calcTip: function(){
    var valueArr = this.paidBills;
    var tipsArr = [];
    var amountArr = [];
    for(var i = 0; i< valueArr.length ; i++){
      var value = valueArr[i];
      if(value < 50){
        tipsArr.push( .2 * value);
        amountArr.push(valueArr + ( .2 * value));
      } else if(value >= 50 && value < 200){
        tipsArr.push( .15 * value);
        amountArr.push(valueArr + ( .15 * value));
      } else {
        tipsArr.push( .1 * value);
        amountArr.push(valueArr + (.1 * value));
      }
    }
    return {tipsArr: [tipsArr], amountArr: [amountArr]};
  }
}


console.log(John.calcTip());
