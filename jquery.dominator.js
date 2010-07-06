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
            var parts = selector.split(/((?:[#.]\w+))/);
            $.each(parts, function(){
                if (this == "") return;
                if (this.charAt(0) == '#') {
                    parsed.attrs.id = this.substring(1, this.length);
                }
                else if (this.charAt(0) == '.') {
                    parsed.attrs.class = this.substring(1, this.length);
                }
                else {
                    parsed.tag = this;
                }
            });
            return parsed;
        }
    });

    $.extend({dominator: dominator});
})(jQuery);
