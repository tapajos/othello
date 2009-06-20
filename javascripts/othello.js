// value 0: unoccupied
// value 1: player 1
// value 2: computer

var matrix = new Matrix(8,8,0);

jQuery(function($) {
  $('.othello_board_td').attach(OthelloCell);
});