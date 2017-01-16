var getClass, getId, getSelector;

getId = function(idName) {
  return document.getElementById(idName);
};

getClass = function(className) {
  return document.getElementByClassName(className);
};

getSelector = function(selectorName) {
  return document.querySelector(selectorName);
};

(function() {
  var message, n, stuff, x;
  message = "The quick brown fox jumps over the lazy dog.";
  stuff = ["words", 3, false];
  n = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  x = [10, 9, 8, 7, 6, 5, 4, 3, 2];
  return getSelector('#content').innerHTML("<h1>" + message + "</h1>");
})();
