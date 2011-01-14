function cbh_shell_parser(line){
    var that = this,
        input_chars = line.split(''),
        cur_char;

    this.cmd_queue = [];
    this.program;
      
    // set program (until first space)
    while (input_chars && input_chars.length) {
        queue_prog();
    };

    function queue_prog () {
        // reset program holder
        that.program = {
            name: '',
            opts: {}
        };
        set_program();
        set_opts();
        
        that.cmd_queue.push(that.program);
    };
    
    function set_program () {
        // console.log('get_program: ', input_chars);
        while (input_chars && input_chars.length) {
            cur_char = input_chars.shift();
            if (cur_char == ' ') break;
            that.program.name += cur_char;
        };
    };

    function set_opts () {
        // console.log('get_program: ', input_chars);
        var opts = {};
        // loop while we have characters
        while (input_chars && input_chars.length) {
            cur_char = input_chars.shift();
            if (cur_char == ';') {
                break; // stop building opts
            };
            if (cur_char == ' ') {
                continue; // keep looking...
            };
            // let's check for special characters
            switch (cur_char) {
                case '-':
                    if (input_chars[0] == '-') {
                        input_chars.shift();
                        set_double_dash();
                    } else {
                        set_single_dash();
                    };
                    break;
                case '"':
                case "'":
                    console.log('quoted '+ cur_char);
                    // break;
                default:
                    input_chars.unshift(cur_char);
                    set_string();
            }
        };
        return opts;
    };
    
    function set_double_dash () {
        console.log('get_double_dash');

        var str = '';
        while (input_chars && input_chars.length) {
            if (input_chars[0] == ';') break;
            
            cur_char = input_chars.shift();
            if (cur_char == ' ') {
                // should check for quoted
                // --foo 'bar'
                break;
            }
            str += cur_char;
         };
         that.program.opts[str] = true;
    };

    function set_single_dash () {
        console.log('set_single_dash');
        
        while (input_chars && input_chars.length) {
            if (input_chars[0] == ';') break;
            
            cur_char = input_chars.shift();
            if (cur_char == ' ') {
                // should check for quoted
                // -f 'bar'
                break;
            }
            that.program.opts[cur_char] = true;            
        };
    };
    
    function set_string () {
        var str = '';
        while (input_chars && input_chars.length) {
            if (input_chars[0] == ';') break;
            
            cur_char = input_chars.shift();
            if (cur_char == ' ') {
                // should check for quoted
                // foo 'bar'
                break;
            }

            str += cur_char;
        };
        that.program.opts[str] = true;
    };
    
};

function cbh_shell(config){
    var that = this,
        cmd_queue = [];

    // TODO: see notes
    var defaults = {
        autoload_dir: '/js/shell_programs'
    };

    if (config) { // TODO test for array and length
        for (attrname in defaults) {
            defaults[attrname] = config[attrname];
        };
    };
    
    this.commandHandler = function(line){
        var parser = new cbh_shell_parser(line),
            messages = [];
        
        var cmd;
        while (parser.cmd_queue && parser.cmd_queue.length) {
            cmd =  parser.cmd_queue.shift();
            
            // output program name
            if ( ! cmd.name) {
                messages.push({
                    msg: 'Program not found',
                    className: "jquery-console-message-error"
                });
            } else {
                messages.push({
                    msg: 'Program: ' + cmd.name,
                    className: "jquery-console-message-value"
                });
            }
            
            // output program name
            if ( ! cmd.opts) {
                messages.push({
                    msg: 'No options passed.',
                    className: "jquery-console-message-error"
                });
            } else {
                console.log(cmd.opts);
                messages.push({
                    msg: 'Options passed:\n"' + JSON.stringify(cmd.opts),
                    className: "jquery-console-message-value"
                });
            };
            
            // mark end of process
            messages.push({
                msg: '(parsing is weak still)\ndone processing',
                className: "jquery-console-message-type"
            });
        }
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



