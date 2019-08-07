function quiz(){
	this.RAND_NUMBER = 10;
	this.NUMBER_OF_QUESTION = 20;
	this.QUESTION_DISPLAYED_LEFT = 1;
	this.QUESTION_DISPLAYED_RIGHT = 1;
	this.SCORE_LEFT = 0;
	this.SCORE_RIGHT = 0;
	this.operators = [{
        sign: "+",
        method: function(a,b){ return a + b; }
    },{
        sign: "-",
        method: function(a,b){ return a - b; }
    },{
        sign: "*",
        method: function(a,b){ return a * b; }
    },{
        sign: "/",
        method: function(a,b){ return a / b; }
    }];
	this.questions_left = [];
	this.questions_right = [];
	this.no_of_ques = $("#no_of_ques");
	this.rand_no = $('#rand_no');
	this.errorField = "";
	this.isError = "0";
	this.direction = '';
	this.DISPLAY_QUESTION_NUMBER = '';
	this.DISPLAY_QUESTION_NUMBER_ = '';
	this.SCORE_BOARD = $('#score-board');
	this.FILTERS = $('.filters');
	this.FINAL_BLOCK = $('#final_block');
	this.SPLIT_BLOCK = $('.split');
	this.SCORE_ELEMENT = '';
	this.ATTEMPTED = '';
	this.index = 1;
	this.html = "";
	
}
quiz.prototype.unsetErrorFields = function (){
	this.isError = "0";
	this.direction = "";
}
quiz.prototype.hadnleInputForUpperLimit = function (){
	this.unsetErrorFields();
	if(this.rand_no.val()==''){
		this.rand_no.next(".errorClass").html("");
		this.rand_no.after('<p class="errorClass">Please enter random number.</p>');
		this.isError = 1;
		this.errorField = (this.errorField == '') ? 'rand_no' : this.errorField;
	}
	else if(!Number(this.rand_no.val())) {
		this.rand_no.next(".errorClass").html("");
		this.rand_no.after('<p class="errorClass">Please enter numeric integer value.</p>');
		this.isError = 1;
		this.errorField = (this.errorField == '') ? 'rand_no' : this.errorField;
	}
	if (this.isError == 1)
	{
		$("#" + this.errorField).focus();
		return false;
	} 
	this.RAND_NUMBER = this.rand_no.val();
}
quiz.prototype.handleInputForNumberOfQuestions = function (){
	this.unsetErrorFields();
	if(this.no_of_ques.val()==''){
		this.no_of_ques.next(".errorClass").html("");
		this.no_of_ques.after('<p class="errorClass">Please enter value for number of questions.</p>');
		this.isError = 1;
		this.errorField = (this.errorField == '') ? 'no_of_ques' : this.errorField;
	}
	else if(!Number(this.no_of_ques.val())) {
		this.no_of_ques.next(".errorClass").html("");
		this.no_of_ques.after('<p class="errorClass">Please enter numeric integer value.</p>');
		this.isError = 1;
		this.errorField = (this.errorField == '') ? 'no_of_ques' : this.errorField;
	}
	if (this.isError == 1)
	{
		$("#" + this.errorField).focus();
		return false;
	}
	this.NUMBER_OF_QUESTION = this.no_of_ques.val();
}
quiz.prototype.handleStartQuizBtn = function (that){
	this.no_of_ques.attr('disabled','disabled');
	this.rand_no.attr('disabled','disabled');
	this.direction = that.attr('dir');
	if(this.direction=='left'){
		this.DISPLAY_QUESTION_NUMBER = this.QUESTION_DISPLAYED_LEFT;
	} else{
		this.DISPLAY_QUESTION_NUMBER = this.QUESTION_DISPLAYED_RIGHT;
	}
	$('#is_'+this.direction).hide();
	this.questionGenerator();
	$('#quizcontainer_'+this.direction).show();
}
quiz.prototype.questionGenerator = function (){
	var quest = this.constructQuestion();
	if(this.direction == 'left'){
		quest.q_no = this.QUESTION_DISPLAYED_LEFT;
		this.questions_left.push(quest);
	} else {
		quest.q_no = this.QUESTION_DISPLAYED_RIGHT;
		this.questions_right.push(quest);
	}
	$('#quizcontainer_'+this.direction).find('h3').text('Question '+this.DISPLAY_QUESTION_NUMBER+' of '+parseInt(this.NUMBER_OF_QUESTION)+':');
	$('#quizcontainer_'+this.direction).find('p.qtext').text(quest.question);
	$('#quizcontainer_'+this.direction).find('.answerbutton').attr('cust-attr','nxt-'+quest.q_no);
}
quiz.prototype.handle_question_left = function (a,b,c,d){
	this.questions_left.forEach(function (arrayItemLeft) {
		if(arrayItemLeft.q_no == a){
			if(b == Math.floor(parseInt(arrayItemLeft.answer))){
				c++;
				$(d).text( c );
				arrayItemLeft.status = 'C';
				arrayItemLeft.attempted = b;
			}else{
				$(d).text(c);
				arrayItemLeft.status = 'W';
				arrayItemLeft.attempted = b;
			}
		}
	});
}
quiz.prototype.handle_question_right = function (a,b,c,d){
	this.questions_right.forEach(function (arrayItem) {
		if(arrayItem.q_no == a){
			if(b == Math.floor(parseInt(arrayItem.answer))){
				c++;
				$(d).text(c);
				arrayItem.status = 'C';
				arrayItem.attempted = b;
			}else{
				$(d).text(c);
				arrayItem.status = 'W';
				arrayItem.attempted = b;
			}
		}
	});
}
quiz.prototype.renderNextBtn = function(obj){
	this.unsetErrorFields();
	this.direction = obj.attr('dir');
	if(this.direction == 'left'){
		this.DISPLAY_QUESTION_NUMBER = this.QUESTION_DISPLAYED_LEFT;
		this.SCORE_ELEMENT = obj.parent().find('#display_score').find('.score_left');
	} else{
		this.DISPLAY_QUESTION_NUMBER = this.QUESTION_DISPLAYED_RIGHT;
		this.SCORE_ELEMENT = obj.parent().find('#display_score').find('.score_right');
	}
	if($('#errorClass_'+ this.direction +'_'+ this.DISPLAY_QUESTION_NUMBER).length>0)
		$('#errorClass_'+ this.direction +'_'+ this.DISPLAY_QUESTION_NUMBER).remove();
	obj.parent().find('div.answerbuttoncontainer').find('.ans').attr('id','ans-'+ this.direction + '_' + this.DISPLAY_QUESTION_NUMBER);
	this.ATTEMPTED = Math.floor(parseInt(obj.parent().find('div.answerbuttoncontainer').find('.ans').val()));
	if(obj.parent().find('.answerbuttoncontainer').find('.ans').val()==''){
		$('#ans-'+ this.direction + '_' + this.DISPLAY_QUESTION_NUMBER).next(".errorClass").html("");
		$('#ans-'+ this.direction +'_'+ this.DISPLAY_QUESTION_NUMBER).after('<p class="errorClass" id="errorClass_'+ this.direction +'_'+ this.DISPLAY_QUESTION_NUMBER +'">Please enter the answer.</p>');
		this.isError = 1;
		this.errorField = (this.errorField == '') ? 'ans-'+ this.direction + '_' + this.DISPLAY_QUESTION_NUMBER : this.errorField;
	}
	if (this.isError == 1)
	{
		$("#" + this.errorField).focus();
		return false;
	}
	obj.parent().find('.answerbuttoncontainer').find('.ans').val('');
	if(this.direction == 'left'){
		this.handle_question_left(this.DISPLAY_QUESTION_NUMBER,this.ATTEMPTED,this.SCORE_LEFT,this.SCORE_ELEMENT);
		this.SCORE_LEFT = parseInt(this.SCORE_ELEMENT.text());
		this.QUESTION_DISPLAYED_LEFT++;
		this.DISPLAY_QUESTION_NUMBER = this.QUESTION_DISPLAYED_LEFT;
		this.DISPLAY_QUESTION_NUMBER_  = this.QUESTION_DISPLAYED_RIGHT;
	} else {
		this.handle_question_right(this.DISPLAY_QUESTION_NUMBER,this.ATTEMPTED,this.SCORE_RIGHT,this.SCORE_ELEMENT);
		this.SCORE_RIGHT = parseInt($(this.SCORE_ELEMENT).text());
		this.QUESTION_DISPLAYED_RIGHT++;
		this.DISPLAY_QUESTION_NUMBER = this.QUESTION_DISPLAYED_RIGHT;
		this.DISPLAY_QUESTION_NUMBER_ = this.QUESTION_DISPLAYED_LEFT;
	}
	if( this.DISPLAY_QUESTION_NUMBER > parseInt( this.NUMBER_OF_QUESTION ) && this.DISPLAY_QUESTION_NUMBER_ <= parseInt( this.NUMBER_OF_QUESTION )){
		$('#quizcontainer_'+ this.direction ).text('All questions completed. Quiz is over...');
	} else if( this.DISPLAY_QUESTION_NUMBER > parseInt( this.NUMBER_OF_QUESTION ) && this.DISPLAY_QUESTION_NUMBER_ > parseInt( this.NUMBER_OF_QUESTION )){
		this.SPLIT_BLOCK.hide();
		this.FILTERS.hide();
		this.FINAL_BLOCK.show();
	} else {
		this.questionGenerator();
	}
}
quiz.prototype.renderReportHtml = function (obj) {
	obj.html = '<div style="background-color:#dddddd;text-align:center;"><b>Final Score : '+(obj.SCORE_LEFT + obj.SCORE_RIGHT)+'</b></div></br><ul class="menu-list"><li style="float:left;width:600px;" class="menu-list-item"><a href="#">Quiz 1</a><ul>';
	obj.questions_left.forEach(function (arrayItem) {
		if(arrayItem.status=='W'){
			obj.html += '<li style="color:red;background-color:#eee;"><div><span>Question '+ obj.i +' : '+arrayItem.question+'</span></div><div><span>Expected Answer : '+arrayItem.answer+'</span></div><div><span>your Answer : '+arrayItem.attempted+'</span></div></li><li style="background-color:white;">&nbsp;</li>'
		} else {
			obj.html += '<li style="color:green;background-color:#eee;"><div><span>Question '+ obj.i + ' : '+arrayItem.question+'</span></div><div><span>Expected Answer : '+arrayItem.answer+'</span></div><div><span>Your Answer : '+arrayItem.attempted+'</span></div></li><li style="background-color:white;">&nbsp;</li>'
		}
		obj.i++;
	});
	obj.html += '</ul></li><li style="float:right;width:600px;" class="menu-list-item"><a href="#">Quiz 2</a><ul>';
	obj.i = 1;
	obj.questions_right.forEach(function (arrayItem) {
		if(arrayItem.status=='W'){
			obj.html += '<li style="color:red;background-color:#eee;"><div><span>Question '+ obj.i +' : '+arrayItem.question+'</span></div><div><span>Expected Answer : '+arrayItem.answer+'</span></div><div><span>your Answer : '+arrayItem.attempted+'</span></div></li><li style="background-color:white;">&nbsp;</li>'
		} else {
			obj.html += '<li style="color:green;background-color:#eee;"><div><span>Question '+ obj.i + ' : '+arrayItem.question+'</span></div><div><span>Expected Answer : '+arrayItem.answer+'</span></div><div><span>Your Answer : '+arrayItem.attempted+'</span></div></li><li style="background-color:white;">&nbsp;</li>'
		}
		obj.i++;
	});
	obj.html += '</ul>';
	obj.SCORE_BOARD.html(obj.html).show();
	obj.FILTERS.hide();
	obj.FINAL_BLOCK.hide();
}
quiz.prototype.getRandomInt = function(min,max){
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
quiz.prototype.constructQuestion = function(){
	var operand1 = this.getRandomInt(1,this.RAND_NUMBER);
	var operand2 = this.getRandomInt(1,this.RAND_NUMBER);
	var selectedOperator = Math.floor(Math.random()*this.operators.length);

	var operator = this.operators[selectedOperator].sign;                  //this will give you the sign
	var result = Math.floor(this.operators[selectedOperator].method(operand1, operand2));  //this will give you the answer
	
	var questionObj = {
		'question':operand1 +' '+ operator + ' ' + operand2,
		'answer':result
	};
	return questionObj;
}
$(document).ready(function(){
	var obj = new quiz();
	$('#edit_rand_no').on('click',function(e){
		e.preventDefault();
		obj.hadnleInputForUpperLimit();
	});

	$('#edit_no_of_ques').on('click',function(e){
		e.preventDefault();
		obj.handleInputForNumberOfQuestions();
	});
	$('.submit_btn').on('click',function(e){
		e.preventDefault();
		obj.handleStartQuizBtn($(this));
	});
	$('.answerbutton').on('click',function(e){
		e.preventDefault();
		obj.renderNextBtn($(this));
	});
	$('.showResult').on('click',function(e){
		e.preventDefault();
		obj.renderReportHtml(obj);
	});
});
