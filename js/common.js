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
        } 
		RAND_NUMBER = $('#rand_no').val();
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
        }
		NUMBER_OF_QUESTION = $('#no_of_ques').val();
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
		var quest = generateQuestion();
		if(dir=='left'){
			quest.q_no = QUESTION_DISPLAYED_LEFT;
			questions_left.push(quest);
		} else {
			quest.q_no = QUESTION_DISPLAYED_RIGHT;
			questions_right.push(quest);
		}
		$('#quizcontainer_'+dir).find('p.qtext').text(quest.question);
		$('#quizcontainer_'+dir).find('.answerbutton').attr('cust-attr','nxt-'+quest.q_no);
		$('#quizcontainer_'+dir).show();
		
	});
	$('.answerbutton').on('click',function(e){
		e.preventDefault();
		handleNextButton($(this));
	});
	$('.showResult').on('click',function(e){
		e.preventDefault();
		showFinalReport($(this));
	});
});
