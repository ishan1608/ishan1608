/*jslint browser: true */
/*global $, jQuery, console*/

var BOOTSTRAP_LG_WIDTH = 992;

var configChanged = true;
var sideBox = $('#side-box');
var mainBox = $('#main-box');
var mainContainer = $(".main-container");

var sideBoxTopPosition = sideBox.position().top;

// Sets the configChange flag everytime the window is scrolled
$(window).scroll(function (event) {
    'use strict';
    configChanged = true;
});
// Sets the configChange flag everytime the window is resized
$(window).resize(function (event) {
    'use strict';
    configChanged = true;
});

var adjustSideBoxWidth = function () {
    'use strict';
    if (mainContainer.width() >= 1336) {
        sideBox.addClass('fixed-side-box-width');
    } else {
        sideBox.removeClass('fixed-side-box-width');
    }
};

var adjustSideBoxFixedTop = function () {
    'use strict';
    if (($(window).scrollTop() > sideBoxTopPosition) && (window.innerWidth >= BOOTSTRAP_LG_WIDTH)) {
        sideBox.addClass('fixed-side-box');
    } else {
        sideBox.removeClass('fixed-side-box');
    }
};

// Check for configChanged and reset the UI
setInterval(function () {
    'use strict';
    if (configChanged) {
        configChanged = false;
        adjustSideBoxFixedTop();
        adjustSideBoxWidth();
    }
}, 10);
