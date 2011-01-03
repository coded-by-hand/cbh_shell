/* Author: Jack Boberg

*/
$(document).ready(function() {

/* First console */
var cbh_term = $('<div class="console">');
$('body').append(cbh_term);
var controller1 = cbh_term.console({
    promptLabel: 'cbh> ',
    commandValidate: function(line) {
        if (line == "") return false;
        else return true;
    },
    commandHandle: function(line) {
        console.log(line);
        return [{
            msg: "=> [12,42]",
            className: "jquery-console-message-value"
        },
        {
            msg: ":: [a]",
            className: "jquery-console-message-type"
        },
		{
			msg: 'this is an error',
			className: 'jquery-console-message-error'
		}
		];
    },
    autofocus: true,
    animateScroll: true,
    promptHistory: true,
    charInsertTrigger: function(keycode, line) {
        // Let you type until you press a-z
        // Never allow zero.
        // return ! line.match(/[a-z]+/) && keycode != '0'.charCodeAt(0);
		return true;
    }
});

cbh_term.hide('blind');
// 	var cli_input	= $('#se_cli_input'),
// 		cli_history	= $('#se_cli_history');
// 	
// 	var term = new cbh_terminal(cli_input, cli_history);
// 	
// 	
// 	term.add('foo', {
// 		alias: ['bar'],
// 		run: function(params){
// 			var output = 'I am foo!';
// 			for (var i=0, j=params.length; i < j; i++) {
// 				output += ' '+params[i];
// 			};
// 			return term.puts(output);
// 		},
// 		help: function(){
// 			var output = 'I have my own help text.';
// 			return term.puts(output);
// 		}
// 	});

$(document)
	.bind('click', function(){
		if (cbh_term.is(':visible')) {
			cbh_term.toggle('blind');			
		};
	})
	.bind('keydown', 'ctrl+t', function(){
		cbh_term.toggle('blind');
		if (cbh_term.is(':visible')) {
			cbh_term.click();
		} else {
			$(document).click();
		}
	});




});























