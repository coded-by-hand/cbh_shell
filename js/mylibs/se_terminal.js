function se_terminal(input, history) {
	
	this.input = input;
	this.history = history; // <ol> to append to	
	
	this.init = function(){
		this.input.keyup(
			[this],
			function(e){
				if (e.keyCode != '13') return;
				e.preventDefault();
            	
				var cmd = $(this).val();
				$(this).val('');
				term = e.data[0];
				term.cli(cmd);
			}
		);
	};
	
	this.cli = function(input){
		var params = input.split(' ');
		var cmd = params.shift();
		if ( ! this[cmd]) {
			return this.error("'"+cmd+"' command not found");
		}
		// console.log(cmd, params);
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
	
	this.alias = function(alias, cmd) {
		// ???
	};

	// Demo method, testing only
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
	
	this.init();
}
