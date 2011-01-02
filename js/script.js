/* Author: Jack Boberg

*/
$(document).ready(function() {
	var cli_input	= $('#se_cli_input'),
		cli_history	= $('#se_cli_history');
	
	var term = new cbh_terminal(cli_input, cli_history);
	
	
	term.add('foo', {
		alias: ['bar'],
		run: function(params){
			var output = 'I am foo!';
			for (var i=0, j=params.length; i < j; i++) {
				output += ' '+params[i];
			};
			return term.puts(output);
		},
		help: function(){
			var output = 'I have my own help text.';
			return term.puts(output);
		}
	});
	
	
	
});























