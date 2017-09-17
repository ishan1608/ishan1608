/*jslint browser: true*/
/*global $, jQuery, console*/

var scrolled = false;
var sideBox = $('#side-box');
var mainBox = $('#main-box');

var sideBoxTopPosition = sideBox.position().top;

// Sets the variable to true everytime the window is scrolled
$(window).scroll(function (event) {
    'use strict';
    scrolled = true;
});

setInterval(function () {
    'use strict';
    if (scrolled) {
        scrolled = false;
        if ($(window).scrollTop() > sideBoxTopPosition) {
            sideBox.addClass('fixed-side-box');
        } else {
            sideBox.removeClass('fixed-side-box');
        }
    }
}, 10);

var adjustSideBoxWidth = function () {
    'use strict';
    var containerWidth = $(".main-container").width();
    if (containerWidth >= 1336) {
        sideBox.addClass('fixed-side-box-width');
    } else {
        sideBox.removeClass('fixed-side-box-width');
    }
    console.log(containerWidth + ' resize ' + containerWidth / 3);
};

adjustSideBoxWidth();

$(window).resize(function (event) {
    'use strict';
    adjustSideBoxWidth();
});
