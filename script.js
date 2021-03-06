
// initialize the content of the text editor to some Javascript
$("#editor").text(`//Type your code here`);

// initialize the editor environment using the ace library
var editor = ace.edit("editor");
editor.session.setMode("ace/mode/javascript"); // editor language
editor.setTheme("ace/theme/twilight"); // editor theme
editor.session.setTabSize(4);
editor.session.setUseWrapMode(true);

// Override default console functions for our custom Dev Console
(function () {
    // store default console functionality before changing them
    default_log = console.log;
    default_clear = console.clear;
    default_error = console.error;
    default_warn = console.warn;

    console.log = function (...args) {
        for (let arg of args) {
            if (typeof arg == 'object') {
                $("#console").append((JSON && JSON.stringify ? JSON.stringify(arg, undefined, 2) : arg) + ' ');
            } else {
                $("#console").append(arg + ' ');
            }
        }
        
        // Console prompt
        $("#console").append('\n&raquo;  ');

        // So console is always scrolled to the bottom
        $("#console").get(0).scrollTop = $("#console").get(0).scrollHeight;
        
        // Allow the default console action to happen
         default_log(...args)
    }
    console.error = function (e) {

        $("#console").append("Error: " + e);

        // Console prompt
        $("#console").append('\n&raquo;  ');

        // So console is always scrolled to the bottom
        $("#console").get(0).scrollTop = $("#console").get(0).scrollHeight;
        
        // Allow the default console action to happen
        default_error(e)
    }
    console.warn = function (w) {
        $("#console").append("Warning: " + w);

        // Console prompt
        $("#console").append('\n&raquo;  ');
        
        // So console is always scrolled to the bottom
        $("#console").get(0).scrollTop = $("#console").get(0).scrollHeight;
        
        // Allow the default console action to happen
        default_warn(w)
    }
    console.clear = function () {
        // Console prompt
        $("#console").html("&raquo;  ");
        // Allow the default console action to happen
        default_clear();
    }
    clear = console.clear;
})();

// For our custom clear and execute shortcuts Ctrl-Enter and Ctrl-I
function kbd(e){
    if (e.key === "i"){
        console.clear();
    }
 
    if (e.key === "Enter"){
        eval(editor.getValue());
    }
    
}

//KeyDown
window.addEventListener('keydown', function (e) {
    if (e.key === "Control")
     window.addEventListener('keydown', kbd);
});
//keyUp
window.addEventListener('keyup', function (e) {
    if(e.key === "Control")
     window.removeEventListener('keydown', kbd);
})

// For phones and devices without a control key
$("[action]").get(0).addEventListener('click', function (){
     eval(editor.getValue()); 
    });
$("[action]").get(1).addEventListener('click', function (){
     console.clear(); 
});