/* Author: Jack Boberg

*/
$(document).ready(function() {
	var term = new se_terminal();
	
	term.talk = function(params){
		se_terminal.prototype.talk.call(this, params);
		console.log('override!');
	};
	
	
	var cli_input = $('#se_cli_input');
	cli_input.keyup(function(e){
		if (e.keyCode != '13') return;
		e.preventDefault();
	    
		var cmd = $(this).val();
		$(this).val('')
		term.cli(cmd);
	});
	
});























