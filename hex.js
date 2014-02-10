var SIDE_LENGTH = 300;
var DELTA_X = Math.cos(Raphael.rad(30)) * SIDE_LENGTH;
var DELTA_Y = Math.cos(Raphael.rad(60)) * SIDE_LENGTH;
var OFFSET = 5;

window.onload = function() {
    var paper = Raphael(10, 10, 800, 800);
    var points = hexagon();
    var hex_path = "";

    for (var i = 0; i < points.length; i++) {
        if (i === 0) {
            hex_path += "M" + points[i][0] + "," + points[i][1];
        }
        else {
            hex_path += "L" + points[i][0] + "," + points[i][1];
        }

        if (i === points.length - 1) {
            hex_path += "L" + points[0][0] + "," + points[0][1];
        }
    }
    var p = paper.path(hex_path);
    p.attr("stroke-width", 5);
    p.attr("stroke-linecap", "round");
    p.attr("stroke-linejoin", "round");
};

function hexagon() {
    var points = [];
    points.push([OFFSET, OFFSET + DELTA_Y]);
    points.push([OFFSET, OFFSET + DELTA_Y + SIDE_LENGTH]);
    points.push([OFFSET + DELTA_X, OFFSET + 2 * DELTA_Y + SIDE_LENGTH]);
    points.push([OFFSET + 2 * DELTA_X, OFFSET + DELTA_Y + SIDE_LENGTH]);
    points.push([OFFSET + 2 * DELTA_X, OFFSET + DELTA_Y]);
    points.push([OFFSET + DELTA_X, OFFSET]);
    return points;
}
