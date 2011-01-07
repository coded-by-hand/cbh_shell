function cbh_shell_parser(shell){
    var that = this;
    this.shell = shell;
    
    // var input = input_str || '';
    // var input_chars = input.split('');

    // set program
    this.program = '';
    this.opts = {};
    
    // var cur_char;   
    // while (input_chars && input_chars.length) {
    //     cur_char = input_chars.shift();
    //     if (cur_char == ' ') break;
    //     this.program += cur_char;
    // };
    // 
    // this.opts = [];
    // var opt_key, opt_val;
    // while (input_chars && input_chars.length) {
    //     cur_char = input_chars.shift();
    //     if (cur_char == ' ') break;
    //     this.program += cur_char;
    // };
    
    this.get_program = function () {
        if ( ! this.program) {
            var cur_char;   
            while (that.shell.input_chars && that.shell.input_chars.length) {
                cur_char = that.shell.input_chars.shift();
                if (cur_char == ' ') break;
                this.program += cur_char;
            };
        };
        return this.program;
    };
    
    this.get_options = function () {
        that.opts['output'] = '';
        var cur_char;   
        while (that.shell.input_chars && that.shell.input_chars.length) {
            cur_char = that.shell.input_chars.shift();
            if (cur_char == ' ') break;
            that.opts['output'] += cur_char;
        };
        return that.opts['output'];
    };
}

function cbh_shell(){
    var that = this,
        cmd_queue = [],
        output = []//,
        // input_str = '',
        input_chars = []
        ;

    this.program = '';
    this.input_chars = [];

    this.parser = new cbh_shell_parser(this);
    
    this.run = function(line){
        that.input_chars = line.split('');
        
        var prog = that.parser.get_program();
        if ( ! prog) {
            return [
            {
                msg: 'Program not found',
                className: "jquery-console-message-type"
            }];
        }
        
        var opts = that.parser.get_options();
        if ( ! opts) {
            return [
            {
                msg: 'Opts not found',
                className: "jquery-console-message-type"
            }];
        };
        console.log(opts);
        return [
        {
            msg: 'End of the line.',
            className: "jquery-console-message-type"
        }];
        
        // return [
        // {
        //   msg: 'input: ' + line,
        //   className: "jquery-console-message-type"
        // },
        // {
        //   msg: "program: " + p.program,
        //   className: "jquery-console-message-value"
        // }
        // ];
    };

    function set_program () {
        var cur_char;        
        while (that.input_chars) {
            cur_char = that.input_chars.shift();
            if (cur_char == ' ') return;
            that.program += cur_char;
        };
    }
    
    function parse_options () {
        var cur_char;        
        while (that.input_chars) {
            cur_char = that.input_chars.shift();
            switch (cur_char){
                case '-':
                    console.log('dash');
                    break;
                default:
                    console.log(cur_char);
            };         
        };
    };
    
    this.parse_input = function(input_str){
        console.log('input_str:',input_str);
        
        this.input_chars = input_str.split('');        
        console.log('input_chars:',this.input_chars);
        
        set_program();
        console.log('program',this.program);
        console.log('input_chars:',this.input_chars);
        
        if (this.input_chars) {
            console.log('input_chars:',this.input_chars);
            // parse_options();
        };
        
        return [{
          msg: this.program,
          className: "jquery-console-message-value"
        }];
        
    };

    //     var prog,
    //         prog_opts={},
    //         cur_opt={
    //             key:'',
    //             val:''
    //         },
    
    /*

    first set the program name
    record all chars
    when you hit the first space start looking for options (ignore the space)
        if you found a dash start a new opt (ignore the dash)
            if you find another dash
                the batch of charachters is a KEY string
            if you find another char
                it is a new opt with a single char KEY

            - KEY is default to true, but could be set other wise

            the next space begins looking for the next opt


    */

    //     
    //     // for (var i=0; i < chars.length; i++) {
    //     // };
    //     // seperate commands
    //     // var commands = input_str.split(';'),
    //     //     params, cmd, bits;
    //     // for (var i=0, j=commands.length; i < j; i++) {
    //     //     // seperate command from args
    //     //     bits = $.trim(commands[i]).split(' ');
    //     //     cmd = bits.shift();
    //     //     if (cmd) {
    //     //         cmd_queue.push({
    //     //             'params': parse_params_str(bits),
    //     //             'cmd': cmd
    //     //         });
    //     //     };            
    //     // };
    //     // return execute();
    // };
    
    function execute () {
        var cur_cmd = cmd_queue.shift(),
            message = cur_cmd.cmd + ': ';
        
        for (var opt in cur_cmd.params) {
            message += opt + '('+cur_cmd.params[opt]+');';
        };
        output.push({
          msg: message,
          className: "jquery-console-message-value"
        });
        
        if (cmd_queue.length) {
            return execute();
        };
        var messages = output;
        output = [];
        return messages;
    };
    
};


//------------------------------------------
//  OLD STUFF

/*
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
*/


