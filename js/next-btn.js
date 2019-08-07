function handleNextButton(obj){
	var errorField = "";
	var isError = "0";
	var question_display_const;
	var question_display_const_2;
	var dir = obj.attr('dir');
	if(dir=='left'){
		question_display_const = QUESTION_DISPLAYED_LEFT;
		var ele = obj.parent().find('.score_left');
	} else{
		question_display_const = QUESTION_DISPLAYED_RIGHT;
		var ele = obj.parent().find('.score_right');
	}
	if($('#errorClass_'+dir+'_'+question_display_const).length>0)
		$('#errorClass_'+dir+'_'+question_display_const).remove();
	obj.parent().find('div.answerbuttoncontainer').find('.ans').attr('id','ans-'+dir+'_'+question_display_const);
	var attempted = Math.floor(parseInt(obj.parent().find('div.answerbuttoncontainer').find('.ans').val()));
	if(obj.parent().find('.answerbuttoncontainer').find('.ans').val()==''){
		$('#ans-'+dir+'_'+question_display_const).next(".errorClass").html("");
		$('#ans-'+dir+'_'+question_display_const).after('<p class="errorClass" id="errorClass_'+dir+'_'+question_display_const+'">Please enter the answer.</p>');
		isError = 1;
		errorField = (errorField == '') ? 'ans-'+dir+'_'+question_display_const : errorField;
	}
	if (isError == 1)
	{
		$("#" + errorField).focus();
		return false;
	}
	obj.parent().find('.answerbuttoncontainer').find('.ans').val('');
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
	}
}