# jQuery DOMinator
> Version 0.1.0

# What is this ?

A jQuery plugin for creating DOM elements from CSS selectors.

# Nutshell

Sample usage:

    // Simple tags
    $.dominator('p'); // <p></p>
    $.dominator('div'); // <div></div>
    $.dominator('div p'); // <div><p></p></div>
    $.dominator('div p span a'); // <div><p><span><a></a></span></p></div>

    // IDs, Classes
    $.dominator('div#myid'); // <div id="myid"></div>
    $.dominator('div p#myid'); // <div><p id="myid"></p></div>
    $.dominator('div#myid p'); // <div id="myid"><p></p></div>
    $.dominator('#myid'); // <div id="myid"></div>
    $.dominator('div.myclass'); // <div class="myclass"></div>
    $.dominator('div.my-class'); // <div class="my-class"></div>
    $.dominator('div.my_class'); // <div class="my_class"></div>
    $.dominator('.myclass'); // <div class="myclass"></div>
    $.dominator('div.first.second'); // <div class="first second"></div>

    // Multiple selectors
    $.dominator('div, p'); // <div></div><p></p>
    $.dominator('div#id, p.class a'); // <div id="id"></div><p class="class"><a></a></p>

    // Attributes
    $.dominator('a[title=simpletitle]'); // <a title="simpletitle"></a>
    $.dominator('a[title=With Space]'); // <a title="With Space"></a>
    $.dominator('a[title=With,Comma]'); // <a title="With,Comma"></a>
    $.dominator('a[title=With#Hash]'); // <a title="With#Hash"></a>
    $.dominator('a[title=With.Dot]'); // <a title="With.Dot"></a>

    // Variables
    $.dominator('a[rel=${myvar}]', {myvar: 'myvariable'}); // '<a rel="myvariable"></a>'
    $.dominator('a[rel=${myvar}]', {myvar: 'My Variable'}); // '<a rel="My Variable"></a>'
    $.dominator('a[name=${myvar}]', {myvar: 'myvar'}); // '<a name="myvar"></a>'
    $.dominator('a[name=${myvar}]', {myvar: 'My Variable'}); // '<a name="My Variable"></a>'

