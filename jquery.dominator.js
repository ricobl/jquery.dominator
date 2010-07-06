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
            var parts = selector.split('#');
            var parsed = {attrs: {}};
            if (parts.length == 2) {
                parsed.attrs.id = parts[1];
            }
            parsed.tag = parts.length ? parts[0] : 'div';
            return parsed;
        }
    });

    $.extend({dominator: dominator});
})(jQuery);
