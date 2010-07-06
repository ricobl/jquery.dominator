$(document).ready(function(){
    module('dominator');

    function html (selector) {
        /* Helper for innerHtml checking. */
        return $('<div />').append($.dominator(selector)).html();
    }

    test('generate simple tag', function() {
        expect(2);
        equals(html('p'), '<p></p>', '"p" generates a p');
        equals(html('div'), '<div></div>', '"div" generates a div');
    });

    test('generate nested tags', function() {
        expect(2);
        equals(html('div p'), '<div><p></p></div>', '"div p" selector generates div/p');
        equals(html('div p span a'), '<div><p><span><a></a></span></p></div>', '"div p span a" selector generates div/p/span/a');
    });

    test('generate with id', function() {
        equals(html('div#myid'), '<div id="myid"></div>', '"div#myid" generates a div[id=myid]');
    });

    test('generate nested with id', function() {
        expect(2);
        equals(html('div p#myid'), '<div><p id="myid"></p></div>', '"div p#myid" generates a div/p[id=myid]');
        equals(html('div#myid p'), '<div id="myid"><p></p></div>', '"div#myid p" generates a div[id=myid]/p');
    });

    test('generate tagless id', function() {
        equals(html('#myid'), '<div id="myid"></div>', '"#myid" generates a div[id=myid]');
    });

    test('generate with class', function() {
        equals(html('div.myclass'), '<div class="myclass"></div>', '"div.myclass" generates a div[class=myclass]');
    });

    test('generate with tagless class', function() {
        equals(html('.myclass'), '<div class="myclass"></div>', '".myclass" generates a div[class=myclass]');
    });

    test('generate with class and id', function() {
        expect(2);
        var element = $.dominator('div#myid.myclass');
        ok(element.hasClass('myclass'), 'Element has class "myclass"');
        equals(element.attr('id'), 'myid', 'Element has id "myid"');
    });

    test('generate with class and id (inverted)', function() {
        expect(2);
        var element = $.dominator('div.myclass#myid');
        ok(element.hasClass('myclass'), 'Element has class "myclass"');
        equals(element.attr('id'), 'myid', 'Element has id "myid"');
    });
});