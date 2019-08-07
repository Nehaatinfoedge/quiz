function generateQuestion(){
	var operand1 = getRandomInt(1,RAND_NUMBER);
	var operand2 = getRandomInt(1,RAND_NUMBER);
	var selectedOperator = Math.floor(Math.random()*operators.length);

	var operator = operators[selectedOperator].sign;                  //this will give you the sign
	var result = Math.floor(operators[selectedOperator].method(operand1, operand2));  //this will give you the answer
	
	var questionObj = {
		'question':operand1 +' '+ operator + ' ' + operand2,
		'answer':result
	};
	return questionObj;
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}