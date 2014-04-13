var SIDE_LENGTH = 30;
var DELTA_X = Math.cos(Raphael.rad(30)) * SIDE_LENGTH;
var DELTA_Y = Math.cos(Raphael.rad(60)) * SIDE_LENGTH;
var OFFSET = 5;

var BOARD_LENGTH = 13;
var GRID_WIDTH = (BOARD_LENGTH * 2) - 1;
var GRID_HEIGHT = (BOARD_LENGTH * 2) - 1;

var grid = [];

for (var x = 0; x < GRID_WIDTH; x++ ) {
    for (var y = 0; y < GRID_HEIGHT; y++) {
        grid.push({
            "x": x,
            "y": y
        });
    }
}

window.onload = function() {
    drawboard();
};

function drawboard() {
    var xmax = (OFFSET * 2) + (GRID_WIDTH * 2 * DELTA_X);
    var ymax = (OFFSET * 2) + (GRID_HEIGHT * 2 * DELTA_Y) + (GRID_HEIGHT * SIDE_LENGTH);
    var paper = Raphael(0, 0, xmax, ymax);
    var cells = hexboard(grid);

    for (var j = 0; j < cells.length; j++) {
        var points = cells[j];
        // console.debug("Drawing cell: " + points);
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
        p.attr("stroke-width", 3);
        p.attr("stroke-linecap", "round");
        p.attr("stroke-linejoin", "round");
    }
};

function in_drawable(coord) {
    return coord.x + coord.y >= (BOARD_LENGTH - 1) &&
        coord.x + coord.y < ((GRID_HEIGHT + GRID_WIDTH) - BOARD_LENGTH);
}

function hexboard(coords) {
    console.debug(coords);
    var board = [];

    for (var i = 0; i < coords.length; i++) {
        if (in_drawable(coords[i])) {
            board.push(hexagon(coords[i]));
        }
    }

    console.debug(board);
    return board;
}

function hexagon(coord) {
    var points = [];
    var xoff = OFFSET + (coord.x * 2 * DELTA_X) + ((coord.y - BOARD_LENGTH + 1) * DELTA_X);
    var yoff = OFFSET + (coord.y * DELTA_Y) + (coord.y * SIDE_LENGTH);
    points.push([xoff, yoff + DELTA_Y]);
    points.push([xoff, yoff + DELTA_Y + SIDE_LENGTH]);
    points.push([xoff + DELTA_X, yoff + (2 * DELTA_Y) + SIDE_LENGTH]);
    points.push([xoff + (2 * DELTA_X), yoff + DELTA_Y + SIDE_LENGTH]);
    points.push([xoff + (2 * DELTA_X), yoff + DELTA_Y]);
    points.push([xoff + DELTA_X, yoff]);
    return points;
}
