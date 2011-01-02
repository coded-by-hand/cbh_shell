function cbh_terminal(input_el, history_el) {
	// TODO: protect for input_el and history_el not passed

	var that = this,
		history_line_el = {
			tag: 'li',
			attrs: {}
		};

	this.commands = {};	
	// var programs = {};

	// event listener for submitted input
	input_el.keyup(
		[this],
		function(e){
			if (e.keyCode != '13') return;
			e.preventDefault();
        	
			var cmd = $(this).val();
			$(this).val(''); // clear input

			var term = e.data[0];
			term.cli(cmd);
		}
	);
	
	function error(err_str){
		that.puts(err_str);
		return that;
	};

	// ----------------------------------------------------------
	// Public Methods
	
	this.puts = function (str){
		// TODO: parse into lines and append
		history_line_el.attrs.text = str;
		$('<'+history_line_el.tag+'>', history_line_el.attrs)
			.appendTo(history_el);
		return this;
	};	

	this.add = function(cmd, obj){
		// TODO: protect for overwriting?
		this.commands[cmd] = obj;
		if (obj.alias) {
			for (var i=0, j=obj.alias.length; i < j; i++) {
				this.commands[obj.alias[i]] = this.commands[cmd];	
			};
		};
	};

	this.alias = function (shortcut, cmd) {
		// TODO
		console.log('alias:', shortcut, cmd);
	};

	// TODO: this is a terrible function
	// needs to be refactored into parse_input()
	// so that you could 'manually' run commands without using
	// input parser
	
	this.cli = function(input){		
		// TODO:
		// this is weak sauce, and needs to get awesome regex smart
		// and move to a parse_input function
		var params = input.split(' ');
		var cmd = params.shift();
		
		if ( ! this.commands[cmd]) {
			return error("'"+cmd+"' not found");
		}
		
		if ( ! this.commands[cmd].run) {
			return error("Unable to run '"+cmd+"'");
		};

		return this.commands[cmd].run(params);
		
		// what about something like
		// cmd --params > callback
		// this.callback = callback
		// if (this.callback) { this.callback(this.output);}
		
	};
	
	// ----------------------------------------------------------
	// Create default programs

	this.add('help', {
		alias: ['?'],
		run: function(params){
			var output = 'This is the default help text';

			if (params.length) {
				var cmd = params[0];
				if ( ! that.commands[cmd] || ! that.commands[cmd].help) {
					output = "No help found for '"+cmd+"'";
				} else {
					return that.commands[cmd].help();
				};
			};

			return that.puts(output);
		} 
	});
	
}
