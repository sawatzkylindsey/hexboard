var SIDE_LENGTH = null;
var DELTA_X = null;
var DELTA_Y = null;
var STROKE = null;
var BOARDER = null;


/**
 * Set the render parameters for the board.
 *
 * @param {number} side_length The length of each hexagonal cell's side.
 *                             Default is 15.
 * @param {number} stroke The width of each stroke.  Default is 2.
 * @param {number} boarder The margin for the board.  Default is 10.
 */
function set_board_parameters(side_length, stroke, boarder) {
    SIDE_LENGTH = side_length || 15;
    DELTA_X = Math.cos(Raphael.rad(30)) * SIDE_LENGTH;
    DELTA_Y = Math.cos(Raphael.rad(60)) * SIDE_LENGTH;
    STROKE = stroke || 2;
    BOARDER = boarder || 10;
}

function board_width(board_length) {
    return (board_length * 2) - 1;
}

function board_height(board_length) {
    return (board_length * 2) - 1;
}

/**
 * Check if a cartesian coordinate is inside the drawable board space.
 *
 * The drawable board space is hexagonally shaped, which means that a square
 * grid will not include all its coordinates.
 *
 * For example, a board_length 3 grid will allow these coordinates (. denotes
 * coordinates which are not in_board_space()):
 *
 *   0 1 2 3 4 x-axis
 * 0 . . _ _ _
 * 1 . _ _ _ _
 * 2 _ _ _ _ _
 * 3 _ _ _ _ .
 * 4 _ _ _ . .
 *
 * y
 * |
 * a
 * x
 * i
 * s
 *
 * The above coordinates correspond to the following hexagonal grid:
 *
 *       (2,0) (3,0) (4,0)
 *
 *    (1,1) (2,1) (3,1) (4,1)
 *
 * (0,2) (1,2) (2,2) (3,2) (4,2)
 *
 *    (0,3) (1,3) (2,3) (3,3)
 *
 *       (0,4) (1,4) (2,4)
 *
 * @param {number} x The cartesian x coordinate.
 * @param {number} y The cartesian y coordinate.
 * @param {number} board_length The length of the side of the board.
 */
function in_board_space(x, y, board_length) {
    return x + y >= (board_length - 1) &&
        x + y < ((board_height(board_length) + board_width(board_length)) - board_length);
}

/**
 * Draw the board.
 *
 * @param {array} board The array/list of coordinate objects, whose
 *                      coordinates are denoted by .x and .y.  These
 *                      must adhere to in_board_space().  Each object may
 *                      optionally include the 'colour' member, which will
 *                      be used to fill the cell.
 * @param {number} board_length The length of the side of the board.
 */
function drawboard(board, board_length) {
    calculate_hexes(board, board_length);
    var bw = board_width(board_length);
    var bh = board_height(board_length);
    var x_max = (BOARDER * 2) + (bw * 2 * DELTA_X);
    var y_max = (BOARDER * 2) + (bh * 2 * DELTA_Y) + (bh * SIDE_LENGTH);
    var paper = Raphael(0, 0, x_max, y_max);

    for (var j = 0; j < board.length; j++) {
        var points = board[j].hex_points;
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

        if ("colour" in board[j]) {
            p.attr("fill", board[j].colour);
        }
    }
};

/**
 * Calculates the vector points for a list of board coordinates
 *
 * @param {array} board The array/list of coordinate objects, whose
 *                      coordinates are denoted by .x and .y.
 * @param {number} board_length The length of the side of the board.
 */
function calculate_hexes(board, board_length) {
    for (var i = 0; i < board.length; i++) {
        board[i].hex_points = hexagon(board[i], board_length);
    }
}

function hexagon(coord, board_length) {
    var points = [];
    var xoff = BOARDER + (coord.x * 2 * DELTA_X) +
        ((coord.y - board_length + 1) * DELTA_X);
    var yoff = BOARDER + (coord.y * DELTA_Y) + (coord.y * SIDE_LENGTH);
    points.push([xoff, yoff + DELTA_Y]);
    points.push([xoff, yoff + DELTA_Y + SIDE_LENGTH]);
    points.push([xoff + DELTA_X, yoff + (2 * DELTA_Y) + SIDE_LENGTH]);
    points.push([xoff + (2 * DELTA_X), yoff + DELTA_Y + SIDE_LENGTH]);
    points.push([xoff + (2 * DELTA_X), yoff + DELTA_Y]);
    points.push([xoff + DELTA_X, yoff]);
    return points;
}
