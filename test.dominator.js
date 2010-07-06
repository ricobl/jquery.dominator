$(document).ready(function(){
    module('dominator');

    function html (element) {
        /* Helper for innerHtml checking. */
        return $('<div />').append(element).html();
    }

    test('generate simple tag', function() {
        expect(2);
        equals(html($.dominator('p')), '<p></p>', '"p" generates a p');
        equals(html($.dominator('div')), '<div></div>', '"div" generates a div');
    });

    test('generate nested tags', function() {
        expect(2);
        equals(html($.dominator('div p')), '<div><p></p></div>', '"div p" selector generates div/p');
        equals(html($.dominator('div p span a')), '<div><p><span><a></a></span></p></div>', '"div p span a" selector generates div/p/span/a');
    });

    test('generate with id', function() {
        equals(html($.dominator('div#myid')), '<div id="myid"></div>', '"div#myid" generates a div[id=myid]');
    });

    test('generate nested with id', function() {
        expect(2);
        equals(html($.dominator('div p#myid')), '<div><p id="myid"></p></div>', '"div p#myid" generates a div/p[id=myid]');
        equals(html($.dominator('div#myid p')), '<div id="myid"><p></p></div>', '"div#myid p" generates a div[id=myid]/p');
    });
});
