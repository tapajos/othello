var UNOCCUPIED = 0;
var HUMAN = 1;
var CPU = 2;
var nextPlayer = HUMAN;

var matrix = new Matrix(8,8,0);
matrix.setCol(3,[0,0,0,HUMAN,CPU,0,0,0]);
matrix.setCol(4,[0,0,0,CPU,HUMAN,0,0,0]);

jQuery(function($) {
  $('.othello_board_td').attach(OthelloCell);
  $('#pass').attach(OthelloHumanPass);
  OthelloGame.designBoard();
});