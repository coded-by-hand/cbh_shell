/* Author: Jack Boberg

*/
$(document).ready(function() {
	var cli_input	= $('#se_cli_input'),
		cli_history	= $('#se_cli_history');
	
	var term = new se_terminal(cli_input, cli_history);
	
	term.talk = function(params){
		se_terminal.prototype.talk.call(this, params);
		console.log('override!');
	};
	
	
	
});























