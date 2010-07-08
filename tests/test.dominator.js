$(document).ready(function(){
    module('dominator');

    function html (selector, context) {
        /* Helper for innerHtml checking. */
        return $('<div />').append($.dominator(selector, context)).html().toLowerCase();
    }

    function html_equals (selector, expected) {
        /* Compares the resulting HTML with the expected. */
        equals(html(selector), expected, '"' + selector + '" generates');
    }

    test('generate simple tag', 2, function() {
        html_equals('p', '<p></p>');
        html_equals('div', '<div></div>');
    });

    test('generate nested tags', 2, function() {
        html_equals('div p', '<div><p></p></div>');
        html_equals('div p span a', '<div><p><span><a></a></span></p></div>');
    });

    test('generate with id', function() {
        html_equals('div#myid', '<div id="myid"></div>');
    });

    test('generate nested with id', 2, function() {
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

    test('generate with class and id', 2, function() {
        var element = $.dominator('div#myid.myclass');
        ok(element.hasClass('myclass'), 'Element has class "myclass"');
        equals(element.attr('id'), 'myid', 'Element has id "myid"');
    });

    test('generate with class and id (inverted)', 2, function() {
        var element = $.dominator('div.myclass#myid');
        ok(element.hasClass('myclass'), 'Element has class "myclass"');
        equals(element.attr('id'), 'myid', 'Element has id "myid"');
    });

    test('generate multiple classes', function() {
        html_equals('div.first.second', '<div class="first second"></div>');
    });

    test('multiple selectors', 2, function() {
        html_equals('div, p', '<div></div><p></p>');
        html_equals('div#id, p.class a', '<div id="id"></div><p class="class"><a></a></p>');
    });

    test('parse simple attribute', function() {
        html_equals('a[title=simpletitle]', '<a title="simpletitle"></a>');
    });

    test('parse consecutive attributes', 2, function() {
        var element = $.dominator('a[name=Name][title=Title]');
        equals(element.attr('name'), 'Name', 'Element has name "Name"');
        equals(element.attr('title'), 'Title', 'Element has title "Title"');
    });

    test('allow variables', function() {
        equals(html('a[name=${myvar}]', {myvar: 'myvariable'}), '<a name="myvariable"></a>');
    });
});
