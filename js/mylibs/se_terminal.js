function se_terminal(input, history) {
	
	this.input = input;
	this.history = history; // DOM.Element to append to
	this.history_tmpl = {
		el: 'li',
		props: {}
	};
	
	this._shortcuts = {
		help: function(obj, params){
			// console.log(arguments);
			return obj._help(params);
		}
	};
	
	this._help = function(params){
		console.log(params);
		return this.puts('help');
	};

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
		
		// this is weak sauce, and needs to get awesome regex smart
		
		var params = input.split(' ');
		var cmd = params.shift();
		
		if (this._shortcut(cmd, params)) {
			return this;
		}
		if ( ! this[cmd]) {
			return this.error("'"+cmd+"' command not found");
		}
		// console.log(cmd, params);
		return this[cmd](params);
		
		// what about something like
		// cmd --params > callback
		// this.callback = callback
		// if (this.callback) { this.callback(this.output);}
		
	};
	
	this.error = function(err_str){
		this.puts(err_str);
		return this;
	};
	
	this.puts = function(str){
		console.log(str);
		this.history_tmpl.props.text = str;
		$('<'+this.history_tmpl.el+'>', this.history_tmpl.props)
			.appendTo(this.history);
		return this;
	};
	
	this.alias = function(alias, cmd) {
		// ???
	};
	
	this._shortcut = function(cmd, params){
		if (this._shortcuts[cmd]) {
			return this._shortcuts[cmd](this, params);
		}
		return false;
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
