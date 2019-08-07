function showFinalReport(obj){
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
}