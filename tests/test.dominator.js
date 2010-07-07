$(document).ready(function(){
    module('dominator');

    function html (selector) {
        /* Helper for innerHtml checking. */
        return $('<div />').append($.dominator(selector)).html();
    }

    function html_equals (selector, expected) {
        /* Compares the resulting HTML with the expected. */
        equals(html(selector), expected, '"' + selector + '" generates');
    }

    test('generate simple tag', function() {
        expect(2);
        html_equals('p', '<p></p>');
        html_equals('div', '<div></div>');
    });

    test('generate nested tags', function() {
        expect(2);
        html_equals('div p', '<div><p></p></div>');
        html_equals('div p span a', '<div><p><span><a></a></span></p></div>');
    });

    test('generate with id', function() {
        html_equals('div#myid', '<div id="myid"></div>');
    });

    test('generate nested with id', function() {
        expect(2);
        html_equals('div p#myid', '<div><p id="myid"></p></div>');
        html_equals('div#myid p', '<div id="myid"><p></p></div>');
    });

    test('generate tagless id', function() {
        html_equals('#myid', '<div id="myid"></div>');
    });

    test('generate with class', function() {
        html_equals('div.myclass', '<div class="myclass"></div>');
        html_equals('div.my-class', '<div class="my-class"></div>');
        html_equals('div.my_class', '<div class="my_class"></div>');
    });

    test('generate with tagless class', function() {
        html_equals('.myclass', '<div class="myclass"></div>');
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

    test('generate multiple classes', function() {
        html_equals('div.first.second', '<div class="first second"></div>');
    });

    test('multiple selectors', function() {
        expect(2);
        html_equals('div, p', '<div></div><p></p>');
        html_equals('div#id, p.class a', '<div id="id"></div><p class="class"><a></a></p>');
    });

    test('parse simple attribute', function() {
        html_equals('a[title=Title]', '<a title="Title"></a>');
    });

    test('parse consecutive attributes', function() {
        html_equals('a[name=Name][title=Title]', '<a name="Name" title="Title"></a>');
    });
});
