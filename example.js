var BOARD_LENGTH = 7;
var COLOUR_WATER = "blue";

var grid;


window.onload = function() {
    grid = make_hexagonal_board();
    set_board_parameters(25, 3, 5);
    drawboard(grid, BOARD_LENGTH);
}

function make_hexagonal_board() {
    var grid = make_hexagonal_grid();

    for (var i = 0; i < grid.length; i++) {
        var cell = grid[i];

        if (cell.x == (BOARD_LENGTH - 1) || cell.y == (BOARD_LENGTH - 1)) {
            cell.colour = COLOUR_WATER;
        }
    }

    return grid;
}

function make_hexagonal_grid() {
    var grid = [];

    for (var x = 0; x < board_width(BOARD_LENGTH); x++ ) {
        for (var y = 0; y < board_height(BOARD_LENGTH); y++) {
            if (in_board_space(x, y, BOARD_LENGTH)) {
                grid.push({
                    "x": x,
                    "y": y,
                });
            }
        }
    }

    return grid;
}
