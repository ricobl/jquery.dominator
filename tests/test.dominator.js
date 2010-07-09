$(document).ready(function(){
    module('dominator');

    function html (object) {
        /* Helper for innerHtml. */
        return $('<div />').append(object).html();
    }

    function html_equals (object, expected) {
        /* Helper for html checking. */
        equals(html(object), html($(expected)));
    }

    function dom_equals (selector, expected) {
        /* Compares the resulting HTML with the expected. */
        html_equals($.dominator(selector), expected);
    }

    test('generate simple tag', 2, function() {
        dom_equals('p', '<p></p>');
        dom_equals('div', '<div></div>');
    });

    test('generate nested tags', 2, function() {
        dom_equals('div p', '<div><p></p></div>');
        dom_equals('div p span a', '<div><p><span><a></a></span></p></div>');
    });

    test('generate with id', function() {
        dom_equals('div#myid', '<div id="myid"></div>');
    });

    test('generate nested with id', 2, function() {
        dom_equals('div p#myid', '<div><p id="myid"></p></div>');
        dom_equals('div#myid p', '<div id="myid"><p></p></div>');
    });

    test('generate tagless id', function() {
        dom_equals('#myid', '<div id="myid"></div>');
    });

    test('generate with class', function() {
        dom_equals('div.myclass', '<div class="myclass"></div>');
        dom_equals('div.my-class', '<div class="my-class"></div>');
        dom_equals('div.my_class', '<div class="my_class"></div>');
    });

    test('generate with tagless class', function() {
        dom_equals('.myclass', '<div class="myclass"></div>');
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
        dom_equals('div.first.second', '<div class="first second"></div>');
    });

    test('multiple selectors', 2, function() {
        dom_equals('div, p', '<div></div><p></p>');
        dom_equals('div#id, p.class a', '<div id="id"></div><p class="class"><a></a></p>');
    });

    test('parse simple attribute', function() {
        dom_equals('a[title=simpletitle]', '<a title="simpletitle"></a>');
    });

    test('parse attribute with special tokens', 4, function() {
        // TODO: allow escape brackets inside attribute values
        dom_equals('a[title=With Space]', '<a title="With Space"></a>');
        dom_equals('a[title=With,Comma]', '<a title="With,Comma"></a>');
        dom_equals('a[title=With#Hash]', '<a title="With#Hash"></a>');
        dom_equals('a[title=With.Dot]', '<a title="With.Dot"></a>');
    });

    test('parse consecutive attributes', 2, function() {
        var element = $.dominator('a[name=Name][title=Title]');
        equals(element.attr('name'), 'Name', 'Element has name "Name"');
        equals(element.attr('title'), 'Title', 'Element has title "Title"');
    });

    test('allow variables', function() {
        html_equals($.dominator('a[rel=${myvar}]', {myvar: 'myvariable'}), '<a rel="myvariable"></a>');
    });

    test('allow variables with spaces', function() {
        html_equals($.dominator('a[rel=${myvar}]', {myvar: 'My Variable'}), '<a rel="My Variable"></a>');
    });

    test('parse "name" attribute', function() {
        html_equals($.dominator('a[name=${myvar}]', {myvar: 'myvar'}), '<a name="myvar"></a>');
        html_equals($.dominator('a[name=${myvar}]', {myvar: 'My Variable'}), '<a name="My Variable"></a>');
    });


});
