/*
* jQuery trackIt Plugin v0.1.0
* Copyright 2011, Matthew Mirande
* Dual licensed under the MIT or GPL Version 2 licenses.
* Usage: Provides easy access to Google Analytic's API
*/
(function ($) {
    var methods = {
        page: function (pg) {
            //default page - set it or use what's in the browser's address bar
            pg = pg || document.location.pathname;

            //add GET string (so we capture AdWords redirects)
            pg = pg + document.location.search;

            //send in page to GA
            _gaq.push(
                    ["_setAccount", "UA-XXXXXXX-X"],
                    ["_setDomainName", ".example.com"],
                    ["_trackPageview", pg],
                    ["_trackPageLoadTime"]
                );

            //log it for testing
            console.log("The GA Page = " + pg);
            console.log(_gaq);
            (function gaIsLoaded() {
                var timestamp = new Date();
                if (typeof _gaq._getAsyncTracker == "function") {
                    console.log("ga.js is active @ " + timestamp.getTime());
                    console.log(_gaq);
                    return;
                }

                console.log("not yet! @ " + timestamp.getTime());
                setTimeout(gaIsLoaded, 1);
            })();

            //maintain jQuery chainability
            return this;
        },
        event: function (ev) {
            //set default event data
            var event = {
                category: "Script Error",
                action: "Error",
                label: "Event Data Object Required"
            };

            //merge in new event data if available
            if (ev) {
                $.extend(event, ev);
            }

            //send GA Event
            //format: category, action, opt_label, opt_value
            //    ex: home, click, headerLogo
            _gaq.push(
                    ["_trackEvent", event.category, event.action, event.label]
                );

            //log it
            console.log(event.category + ", " + event.action + ", " + event.label);

            //maintain jQuery chainability
            return this;
        }
    };
    //plugin reference definition and method calling logic
    $.fn.trackIt = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else {
            $.error("Method " + method + " does not exist on trackIt");
        }
    };
})(jQuery);
