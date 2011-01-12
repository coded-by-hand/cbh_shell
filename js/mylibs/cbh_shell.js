function cbh_shell_parser(line){
    var that = this,
        input_chars = line.split('');

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
            while (input_chars && input_chars.length) {
                cur_char = input_chars.shift();
                if (cur_char == ' ') break;
                this.program += cur_char;
            };
        };
        return this.program;
    };
    
    this.get_options = function () {
        that.opts['output'] = '';
        var cur_char;   
        while (input_chars && input_chars.length) {
            cur_char = input_chars.shift();
            // if (cur_char == ' ') break;
            that.opts['output'] += cur_char;
        };
        return that.opts['output'];
    };    
}

function cbh_shell(config){
    var that = this,
        cmd_queue = [];

    // TODO: see notes
    // var defaults = {
    //     autoload_dir: '/js/shell_programs'
    // };

    if (config) {
        for (attrname in defaults) {
            // console.log('Setting:', attrname, config[attrname]);
            defaults[attrname] = config[attrname];
        };
    };
    
    this.commandHandler = function(line){
        var parser = new cbh_shell_parser(line),
            prog = parser.get_program(),
            messages = [];
        
        if ( ! prog) {
            messages.push({
                msg: 'Program not found',
                className: "jquery-console-message-error"
            });
        } else {
            messages.push({
                msg: 'Program: ' + prog,
                className: "jquery-console-message-value"
            });
        }
        
        var opts = parser.get_options();
        if ( ! opts) {
            messages.push({
                msg: 'No options passed.',
                className: "jquery-console-message-error"
            });
        } else {
            messages.push({
                msg: 'Option string passed: "' + opts + '" (not parsed yet)',
                className: "jquery-console-message-value"
            });
        }
        messages.push({
            msg: 'done processing',
            className: "jquery-console-message-type"
        });
        // that.parser.clear();
        return messages;
    };
    
    // function execute () {
    //     var cur_cmd = cmd_queue.shift(),
    //         message = cur_cmd.cmd + ': ';
    //     
    //     for (var opt in cur_cmd.params) {
    //         message += opt + '('+cur_cmd.params[opt]+');';
    //     };
    //     output.push({
    //       msg: message,
    //       className: "jquery-console-message-value"
    //     });
    //     
    //     if (cmd_queue.length) {
    //         return execute();
    //     };
    //     var messages = output;
    //     output = [];
    //     return messages;
    // };
    
};



