getId = (idName) ->
	document.getElementById(idName)

getClass = (className) ->
	document.getElementByClassName(className)

getSelector = (selectorName) ->
	document.querySelector(selectorName)

do ->
	message = "The quick brown fox jumps over the lazy dog."
	stuff = [
		"words"
		3
		false
	]
	n = [1..10]
	x = [10...1]

	getSelector('#content').innerHTML "<h1>#{message}</h1>"