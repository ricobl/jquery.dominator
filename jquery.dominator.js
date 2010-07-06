/*
 * jQuery dominator plugin
 * http://ricobl.wordpress.com/
 *
 * Copyright (c) 2010 Enrico Batista da Luz
 * Dual licensed under the MIT and GPL 3+ licenses.
 *
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/copyleft/gpl.html
 */

(function($){
    var dominator = function (selector) {
        /* Generates markup using CSS selectors */
        var parts = selector.split(' ').reverse();
        var element = null;
        $.each(parts, function(){
            var parsed = $.dominator.parseSelector(this);
            var part = $('<' + parsed.tag + ' />');
            part.attr(parsed.attrs);
            if (element) {
                part.append(element);
            }
            element = part;
        });
        return element;
    };
    $.extend(dominator, {
        parseSelector: function (selector) {
            /* Returns structured data from a simple selector */
            var parsed = {attrs: {}, tag: 'div'};
            var classes = [];
            var parts = selector.split(/((?:[#.]\w+))/);
            $.each(parts, function(){
                if (this == "") return;
                if (this.charAt(0) == '#') {
                    parsed.attrs.id = this.substring(1, this.length);
                }
                else if (this.charAt(0) == '.') {
                    classes.push(this.substring(1, this.length));
                }
                else {
                    parsed.tag = this;
                }
            });
            if (classes.length > 0) {
                parsed.attrs.class = classes.join(' ');
            }
            return parsed;
        }
    });

    $.extend({dominator: dominator});
})(jQuery);
