var UNOCCUPIED = 0;
var HUMAN = 1;
var CPU = 2;

var matrix = new Matrix(8,8,0);
matrix[3] = [0,0,0,HUMAN,CPU,0,0,0];

jQuery(function($) {
  $('.othello_board_td').attach(OthelloCell);
  OthelloGame.designBoard();
});