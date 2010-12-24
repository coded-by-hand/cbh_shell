function se_terminal() {
	
	this.history = $('#se_cli_history'); // <ol> to append to	
	
	this.cli = function(input){
		var params = input.split(' ');
		var cmd = params.shift();
		if ( ! this[cmd]) {
			return this.error("'"+cmd+"' command not found");
		}
		console.log(cmd, params);
		return this[cmd](params);
	};
	
	this.error = function(err_str){
		this.puts(err_str);
		return this;
	};
	
	this.puts = function(str){
		console.log(str);
		$('<li>', {
			text: str,
			click: function(){
				alert('paste to input!');
				// $(this).input.val(str); 
			}
		}).appendTo(this.history);
		return this;
	};
	
	se_terminal.prototype.talk = function(params) {
		if ( ! params) {
			return this.error('Missing parameters');
			// return this.help('talk');
		}
		str = params.shift();
		if ( ! str || typeof str != 'string') {
			str = 'Nothing to say.';
		}
		return this.puts(str);
	};
}
