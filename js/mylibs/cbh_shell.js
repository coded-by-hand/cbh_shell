function cbh_shell_parser(line){
    var that = this,
        input_chars = line.split(''),
        cur_char;

    this.cmd_queue = [];
        
    // set program (until first space)
    while (input_chars && input_chars.length) {
        queue_prog();
    };

    function queue_prog () {
        var program = {
            name: '',
            opts: {}
            };
        
        program.name = get_program();
        program.opts = get_opts();
        
        that.cmd_queue.push(program);
    };
    
    function get_program () {
        // console.log('get_program: ', input_chars);
        var program = '';
        while (input_chars && input_chars.length) {
            cur_char = input_chars.shift();
            if (cur_char == ' ') break;
            program += cur_char;
        };
        return program;
    };

    function get_opts () {
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
                        // double dash
                        input_chars.shift();
                        console.log('double dash');
                    } else {
                        // single dash
                        console.log('single dash');
                    };
                    break;
                case '"':
                case "'":
                    console.log('quoted '+ cur_char);
                    // break;
                default:
                    str = cur_char;
                    while (input_chars && input_chars.length) {
                        if (input_chars[0] == ';') break;
                        
                        cur_char = input_chars.shift();
                        if (cur_char == ' ') break;

                        str += cur_char;
                    };
                    opts[str] = true;
            }
        };
        return opts;
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



