/*jslint browser: true*/
/*global $, jQuery, console*/

var scrolled = false;
var sideBox = $('#side-box');
var mainBox = $('#main-box');
var sideBoxTopOffset = sideBox.offset().top;

// Sets the variable to true everytime the window is scrolled
$(window).scroll(function (event) {
    'use strict';
    scrolled = true;
});

setInterval(function () {
    'use strict';
    if (scrolled) {
        scrolled = false;
        if ($(window).scrollTop() > sideBoxTopOffset) {
            sideBox.addClass('fixed-side-box');
        } else {
            sideBox.removeClass('fixed-side-box');
        }
    }
}, 10);
