var RAND_NUMBER = 10;
var NUMBER_OF_QUESTION = 20;
var QUESTION_ATTEMPTED_LEFT = 0;
var QUESTION_ATTEMPTED_RIGHT = 0;
var QUESTION_DISPLAYED_LEFT = 1;
var QUESTION_DISPLAYED_RIGHT = 1;
var SCORE_LEFT = 0;
var SCORE_RIGHT = 0;
var operators = [{
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
var questions_left = [];
var questions_right = [];

$(document).ready(function(){
	$('#edit_rand_no').on('click',function(e){
		e.preventDefault();
		var errorField = "";
        var isError = "0";
		if($('#rand_no').val()==''){
			$("#rand_no").next(".errorClass").html("");
			$("#rand_no").after('<p class="errorClass">Please enter random number.</p>');
			isError = 1;
			errorField = (errorField == '') ? 'rand_no' : errorField;
		}
		else if(!Number($('#rand_no').val())) {
			$("#rand_no").next(".errorClass").html("");
			$("#rand_no").after('<p class="errorClass">Please enter numeric integer value.</p>');
			isError = 1;
			errorField = (errorField == '') ? 'rand_no' : errorField;
		}
		if (isError == 1)
        {
            $("#" + errorField).focus();
            return false;
        } else {
			RAND_NUMBER = $('#rand_no').val();
		}
	});

	$('#edit_no_of_ques').on('click',function(e){
		e.preventDefault();
		var errorField = "";
        var isError = "0";
		if($('#no_of_ques').val()==''){
			$("#no_of_ques").next(".errorClass").html("");
			$("#no_of_ques").after('<p class="errorClass">Please enter value for number of questions.</p>');
			isError = 1;
			errorField = (errorField == '') ? 'no_of_ques' : errorField;
		}
		else if(!Number($('#no_of_ques').val())) {
			$("#no_of_ques").next(".errorClass").html("");
			$("#no_of_ques").after('<p class="errorClass">Please enter numeric integer value.</p>');
			isError = 1;
			errorField = (errorField == '') ? 'no_of_ques' : errorField;
		}
		if (isError == 1)
        {
            $("#" + errorField).focus();
            return false;
        } else {
			NUMBER_OF_QUESTION = $('#no_of_ques').val();
		}
	});
	$('.submit_btn').on('click',function(e){
		e.preventDefault();
		$('#no_of_ques').attr('disabled','disabled');
		$("#rand_no").attr('disabled','disabled');
		var dir = $(this).attr('dir');
		if(dir=='left'){
			var question_display_const = QUESTION_DISPLAYED_LEFT;
		} else{
			var question_display_const = QUESTION_DISPLAYED_RIGHT;
		}
		$('#is_'+dir).hide();
		$('#quizcontainer_'+dir).find('h3').text('Question '+question_display_const+' of '+parseInt(NUMBER_OF_QUESTION)+':');
		var q = generateQuestion(dir);
		$('#quizcontainer_'+dir).find('p.qtext').text(q.question);
		$('#quizcontainer_'+dir).find('.answerbutton').attr('cust-attr','nxt-'+q.q_no);
		$('#quizcontainer_'+dir).show();
	});
	$('.answerbutton').on('click',function(e){
		e.preventDefault();
		var errorField = "";
        var isError = "0";
		var question_display_const;
		var question_display_const_2;
		var dir = $(this).attr('dir');
		if(dir=='left'){
			question_display_const = QUESTION_DISPLAYED_LEFT;
			var ele = $(this).parent().find('.score_left');
		} else{
			question_display_const = QUESTION_DISPLAYED_RIGHT;
			var ele = $(this).parent().find('.score_right');
		}
		if($('#errorClass_'+dir+'_'+question_display_const).length>0)
			$('#errorClass_'+dir+'_'+question_display_const).remove();
		$(this).parent().find('div.answerbuttoncontainer').find('.ans').attr('id','ans-'+dir+'_'+question_display_const);
		var attempted = Math.floor(parseInt($(this).parent().find('div.answerbuttoncontainer').find('.ans').val()));
		if($(this).parent().find('.answerbuttoncontainer').find('.ans').val()==''){
			$('#ans-'+dir+'_'+question_display_const).next(".errorClass").html("");
			$('#ans-'+dir+'_'+question_display_const).after('<p class="errorClass" id="errorClass_'+dir+'_'+question_display_const+'">Please enter the answer.</p>');
			isError = 1;
			errorField = (errorField == '') ? 'ans-'+dir+'_'+question_display_const : errorField;
		}
		if (isError == 1)
        {
            $("#" + errorField).focus();
            return false;
        } else {
			$(this).parent().find('.answerbuttoncontainer').find('.ans').val('');
			if(dir == 'left'){
				questions_left.forEach(function (arrayItemLeft) {
					if(arrayItemLeft.q_no==question_display_const){
						if(attempted == Math.floor(parseInt(arrayItemLeft.answer))){
							SCORE_LEFT++;
							$(ele).text('SCORE : '+SCORE_LEFT);
							arrayItemLeft.status = 'C';
							arrayItemLeft.attempted = attempted
						}else{
							$(ele).text('SCORE : '+SCORE_LEFT);
							arrayItemLeft.status = 'W';
							arrayItemLeft.attempted = attempted
						}
					}
				});
				QUESTION_DISPLAYED_LEFT++;
				question_display_const = QUESTION_DISPLAYED_LEFT;
				question_display_const_2  = QUESTION_DISPLAYED_RIGHT;
			} else {
				questions_right.forEach(function (arrayItem) {
					if(arrayItem.q_no==question_display_const){
						if(attempted == Math.floor(parseInt(arrayItem.answer))){
							SCORE_RIGHT++;
							$(ele).text('SCORE : '+SCORE_RIGHT);
							arrayItem.status = 'C';
							arrayItem.attempted = attempted;
						}else{
							$(ele).text('SCORE : '+SCORE_RIGHT);
							arrayItem.status = 'W';
							arrayItem.attempted = attempted;
						}
					}
				});
				QUESTION_DISPLAYED_RIGHT++;
				question_display_const = QUESTION_DISPLAYED_RIGHT;
				question_display_const_2 = QUESTION_DISPLAYED_LEFT;
			}
			if( question_display_const > parseInt(NUMBER_OF_QUESTION) && question_display_const_2 <= parseInt(NUMBER_OF_QUESTION)){
				$('#quizcontainer_'+dir).text('All questions completed. Quiz is over...');
			} else if(question_display_const > parseInt(NUMBER_OF_QUESTION) && question_display_const_2 > parseInt(NUMBER_OF_QUESTION)){
				$('.split').hide();
				$('.filters').hide();
				$('#final_block').show();
			} else {
				$('#quizcontainer_'+dir).find('h3').text('Question '+question_display_const+' of '+parseInt(NUMBER_OF_QUESTION)+':');
				var q = generateQuestion(dir);
				$('#quizcontainer_'+dir).find('p.qtext').text(q.question);
				$('#quizcontainer_'+dir).find('.answerbutton').attr('cust-attr','nxt-'+q.q_no);
			}
		}
	});
	$('.showResult').on('click',function(e){
		e.preventDefault();
		var i = 1;
		var html = '<div style="background-color:#dddddd;text-align:center;"><b>Final Score : '+(SCORE_LEFT + SCORE_RIGHT)+'</b></div></br><ul class="menu-list"><li style="float:left;width:600px;" class="menu-list-item"><a href="#">Quiz 1</a><ul>';
		questions_left.forEach(function (arrayItem) {
			if(arrayItem.status=='W'){
				html += '<li style="color:red;background-color:#eee;"><div><span>Question '+ i +' : '+arrayItem.question+'</span></div><div><span>Expected Answer : '+arrayItem.answer+'</span></div><div><span>your Answer : '+arrayItem.attempted+'</span></div></li><li style="background-color:white;">&nbsp;</li>'
			} else {
				html += '<li style="color:green;background-color:#eee;"><div><span>Question '+ i + ' : '+arrayItem.question+'</span></div><div><span>Expected Answer : '+arrayItem.answer+'</span></div><div><span>Your Answer : '+arrayItem.attempted+'</span></div></li><li style="background-color:white;">&nbsp;</li>'
			}
			i++;
		});
		html += '</ul></li><li style="float:right;width:600px;" class="menu-list-item"><a href="#">Quiz 2</a><ul>';
		i=1;
		questions_right.forEach(function (arrayItem) {
			if(arrayItem.status=='W'){
				html += '<li style="color:red;background-color:#eee;"><div><span>Question '+ i +' : '+arrayItem.question+'</span></div><div><span>Expected Answer : '+arrayItem.answer+'</span></div><div><span>your Answer : '+arrayItem.attempted+'</span></div></li><li style="background-color:white;">&nbsp;</li>'
			} else {
				html += '<li style="color:green;background-color:#eee;"><div><span>Question '+ i + ' : '+arrayItem.question+'</span></div><div><span>Expected Answer : '+arrayItem.answer+'</span></div><div><span>Your Answer : '+arrayItem.attempted+'</span></div></li><li style="background-color:white;">&nbsp;</li>'
			}
			i++;
		});
		html += '</ul>';
		$('#score-board').html(html).show();
		$('.filters').hide();
		$('#final_block').hide();
	});
});
function generateQuestion(side){
	var operand1 = getRandomInt(1,RAND_NUMBER);
	var operand2 = getRandomInt(1,RAND_NUMBER);
	var selectedOperator = Math.floor(Math.random()*operators.length);

	var operator = operators[selectedOperator].sign;                  //this will give you the sign
	var result = Math.floor(operators[selectedOperator].method(operand1, operand2));  //this will give you the answer
	if(side=='left'){
		var c = QUESTION_DISPLAYED_LEFT;
	} else {
		var c = QUESTION_DISPLAYED_RIGHT;
	}
	var questionObj = {
		'question':operand1 +' '+ operator + ' ' + operand2,
		'answer':result,
		'q_no': c
	};
	if(side == 'left')
		questions_left.push(questionObj);
	else
		questions_right.push(questionObj);
	return questionObj;
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}