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
    /* Generates markup using CSS selectors */
    var dominator = function (selector, context) {
        if (context) {
            selector = $.dominator.renderVariables(selector, context);
        }

        var element_set = $();
        var element_selectors = $.dominator.splitSelectors(selector);

        $.each(element_selectors, function () {
            var parts = this.reverse();
            var element = null;
            $.each(parts, function(index){
                var parsed = $.dominator.parseSelector(parts[index]);
                var part = $('<' + parsed.tag + ' />');
                part.attr(parsed.attrs);
                if (element) {
                    part.append(element);
                }
                element = part;
            });
            element_set = element_set.add(element);
        });
        return element_set;
    };
    $.extend(dominator, {
        splitSelectors: function (selector) {
            // Selector chunker copied from Sizzle
            var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g;
            var items = [], element_selectors = [], m, extra, soFar = selector;
            // Populate 'element_selectors' with single-element selectors
            // until the end of the string or until the start of a new selector.
            // The remaining selectors will be kept on 'extra' to be parsed
            // recursively, one-by-one, until there are no more selectors.
            do {
                chunker.exec("");
                m = chunker.exec(soFar);
                if ( m ) {
                    soFar = m[3];
                    element_selectors.push( m[1] );
                    if ( m[2] ) {
                        extra = m[3];
                        break;
                    }
                }
            } while ( m );

            items = [element_selectors];
            if (extra) {
                $.merge(items, $.dominator.splitSelectors(extra));
            }
            return items;
        },
        parseSelector: function (selector) {
            /* Returns structured data from a simple selector */
            var parsed = {attrs: {}, tag: 'div'};
            var classes = [];
            var parts = selector.split(/((?:[#.][\w-]+|\[[^\]]+\]))/);
            $.each(parts, function(){
                if (this == "") return;
                if (this.charAt(0) == '#') {
                    parsed.attrs.id = this.substring(1, this.length);
                }
                else if (this.charAt(0) == '.') {
                    classes.push(this.substring(1, this.length));
                }
                else if (this.charAt(0) == '[') {
                    var attr = this.substring(1, this.length - 1);
                    var attr_parts = attr.split(/\s*=\s*/);
                    var key = attr_parts[0];
                    var value = attr_parts[1] || '';
                    parsed.attrs[key] = value;
                }
                else {
                    parsed.tag = this;
                }
            });
            if (classes.length > 0) {
                parsed.attrs['class'] = classes.join(' ');
            }
            return parsed;
        },
        renderVariables: function (template, context) {
            if (!context) {
                return template;
            }
            var rendered = template;
            for (var key in context) {
                rendered = rendered.replace('${' + key + '}', context[key]);
            }
            return rendered;
        }
    });

    $.extend({dominator: dominator});
})(jQuery);
