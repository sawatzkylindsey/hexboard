var SIDE_LENGTH = 19;
var DELTA_X = Math.cos(Raphael.rad(30)) * SIDE_LENGTH;
var DELTA_Y = Math.cos(Raphael.rad(60)) * SIDE_LENGTH;
var OFFSET = 5;
var STROKE = 2;


function x_max() {
    return (OFFSET * 2) + (GRID_WIDTH * 2 * DELTA_X);
}

function y_max() {
    return (OFFSET * 2) + (GRID_HEIGHT * 2 * DELTA_Y) +
        (GRID_HEIGHT * SIDE_LENGTH);
}

function drawboard() {
    var paper = Raphael(0, 0, x_max(), y_max());

    for (var j = 0; j < grid.length; j++) {
        var points = grid[j].hex_points;
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
        p.attr("stroke-width", STROKE);
        p.attr("stroke-linecap", "round");
        p.attr("stroke-linejoin", "round");

        if ("colour" in grid[j]) {
            p.attr("fill", grid[j].colour);
        }
    }
};

function calculate_hexes(grid) {
    for (var i = 0; i < grid.length; i++) {
        grid[i].hex_points = hexagon(grid[i]);
    }
}

function hexagon(coord) {
    var points = [];
    var xoff = OFFSET + (coord.x * 2 * DELTA_X) + 
        ((coord.y - BOARD_LENGTH + 1) * DELTA_X);
    var yoff = OFFSET + (coord.y * DELTA_Y) + (coord.y * SIDE_LENGTH);
    points.push([xoff, yoff + DELTA_Y]);
    points.push([xoff, yoff + DELTA_Y + SIDE_LENGTH]);
    points.push([xoff + DELTA_X, yoff + (2 * DELTA_Y) + SIDE_LENGTH]);
    points.push([xoff + (2 * DELTA_X), yoff + DELTA_Y + SIDE_LENGTH]);
    points.push([xoff + (2 * DELTA_X), yoff + DELTA_Y]);
    points.push([xoff + DELTA_X, yoff]);
    return points;
}
