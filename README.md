# jQuery DOMinator
> Version 0.0.1

# What is this ?

creating DOM elements with awesomeness

# Nutshell

this:

    var $main = $.dominator("#main ul.messages li#red,
                             #main ul.messages li#blue,
                             #main ul.messages li#green")

does this:

    <div id="main">
	<ul class="messages">
	    <li id="red"></li>
	    <li id="blue"></li>
	    <li id="green"></li>
	</ul>
    </div>
