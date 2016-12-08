    var pictionary = function() { //deklarojme nje funksion me emrin 'pixtionary'
        var canvas, context; //dhe brenda ketij funksioni deklaroj dy variabla me merat 'canvas' && 'contex'
        var socket = io();

        var draw = function(position) { //deklaroj nje funksion me emrin draw qe do me funksionoje per te levizur mousin me nje parameter position
            context.beginPath();//funksion i pixionarit
            context.arc(position.x, position.y,//funksionete pikionarit qe deklaroj dy pozicione x dhe y
                         6, 0, 2 * Math.PI);
            context.fill();//funksion i pixionarit
        };

        socket.on("draw", function(position) {
           draw(position);
        });

        socket.on("guess",function(guessBox) {
            $("#guess").append(guessBox + "<br>");
        });

        canvas = $('canvas');
        context = canvas[0].getContext('2d');
        canvas[0].width = canvas[0].offsetWidth;
        canvas[0].height = canvas[0].offsetHeight;
        canvas.on('mousemove', function(event) {
            var offset = canvas.offset();
            var position = {x: event.pageX - offset.left,
                        y: event.pageY - offset.top};

            socket.emit('draw',position);//e kete i dergpoj serverit posicionin kur filloj vizatoj
            draw(position);
        });

        var guessBox;

        var onKeyDown = function(event) {
        if (event.keyCode != 13) { // Enter
            return;
        }
        console.log(guessBox.val());
        socket.emit('guess', guessBox.val());
        $("#guess").append(guessBox.val() + "<br>");
        guessBox.val('');
    };

    guessBox = $('#guess_input');
    guessBox.on('keydown', onKeyDown);
};

$(document).ready(function() {
    pictionary();
});