/* Author: Jack Boberg

*/
$(document).ready(function() {

    var shell = new cbh_shell();

    /* Create console */
    var cbh_term = $('<div />', {
        class: "console",
        style: "display: none;" 
    });
    $('body').append(cbh_term);
    var controller = cbh_term.console({
        promptLabel: 'cbh> ',
        // TODO:? $user_name@cbh>
        commandValidate: function(line) {
            if (line == "") return false;
            else return true;
        },
        commandHandle: shell.commandHandler,
        autofocus: true,
        animateScroll: false,
        promptHistory: true,
        charInsertTrigger: function(keycode, line) {
            return true;
            // do nto allow leading spaces ?
            
            // Let you type until you press a-z, Never allow zero.
            // return ! line.match(/[a-z]+/) && keycode != '0'.charCodeAt(0);
        },
        welcomeMessage: 'This is the welcome message\nnow what?'
    });
    
    // function commandHandler(line){
    //     return cli.run(line);
    // };
    
    // var cli = new cbh_shell({
    //     config_key: value
    // });

    // show/hide with hotkey
    $(document)
        .bind('click', function() {
            if (cbh_term.is(':visible')) {
                cbh_term.toggle('blind');
                $('#instructions').fadeToggle();
            };
        })
        .bind('keydown', 'ctrl+t', function() {
            cbh_term.toggle('blind');
            $('#instructions').fadeToggle();
            if (cbh_term.is(':visible')) {
                cbh_term.click();
            } else {
                $(document).click();
            }
        });
});
