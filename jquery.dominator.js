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
                var name = parsed.attrs.name || '';

                // Name attribute needs special treatment for IE.
                // It can't be changed after the element has been created.
                if (name) {
                    name = ' name="' + name + '"';
                    delete parsed.attrs.name;
                }

                // Create a new element with a tagname and an optional name
                var newElement = $('<' + parsed.tag + name + ' />');

                // Apply the attributes
                newElement.attr(parsed.attrs);
                if (element) {
                    newElement.append(element);
                }
                // Append to the latest attribute
                element = newElement;
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
        matchOrder: ['ID', 'TAG', 'CLASS', 'ATTR'],
        match: {
            ID: $.expr.match.ID,
            CLASS: $.expr.match.CLASS,
            ATTR: $.expr.match.ATTR,
            TAG: $.expr.match.TAG
        },
        parse: {
            ID: function (match, parsed) {
                parsed.attrs.id = match[1];
            },
            CLASS: function (match, parsed) {
                parsed.classes.push(match[1]);
            },
            TAG: function (match, parsed) {
                parsed.tag = match[1];
            },
            ATTR: function (match, parsed) {
                parsed.attrs[match[1]] = match[4];
            }
        },
        parseSelector: function (selector) {
            /* Returns structured data from a simple selector */
            var parsed = {attrs: {}, tag: 'div', classes: []};
            $.each($.dominator.matchOrder, function(){
                var expr = $.dominator.match[this];
                while ( (match = expr.exec( selector )) ) {
                    $.dominator.parse[this](match, parsed);
                    selector = selector.replace(expr, '');
                }
            });
            if (parsed.classes.length) {
                parsed.attrs['class'] = parsed.classes.join(' ');
                parsed.classes = null;
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
