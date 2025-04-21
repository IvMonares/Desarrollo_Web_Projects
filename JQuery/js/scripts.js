$(document).ready(function() {
    'use strict';

    var hidden = false;

    //For Mobile menu
    $('.logo img').click(function() {

        if (hidden) {
            $('main article:first').slideDown(500);
        } else {
            $('main article:first').slideUp(500);
        }

        hidden = !hidden;
    });
});