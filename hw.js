window.setTimeout(function() {
var c = document.createElement("label");
c.textContent = "abc";

document.body.appendChild(c);
var paper = Raphael(10, 50, 400, 500);
var c = paper.circle(50, 50, 50);
c.attr("fill", "#f00");
c.attr("stroke", "#fff");
}, 1000);
