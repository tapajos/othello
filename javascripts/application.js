// value 0: unoccuped
// value 1: player 1
// value 2: computer

var OthelloRules = {
  checkValidPosition: function(cell) {
    alert("Aqui devemos verificar se a jogada é permitida");
    return true;
  },
  cpuCell: function() {
    alert("É nessa parte que entra a IA do jogo.\ Deve retornar a celula onde o computador vai jogar.");
    return $("#0_0");
  }
};

var OthelloGame = {
  input: function(cell) {
    return cell.find("input:first");
  },
  fill: function(cell, player_value) {
    OthelloGame.input(cell).attr("value", player_value);
    if(player_value == 1) {
      cell.addClass("p1");
    } else {
      cell.addClass("cpu");
    }
  },
  cpu: function() {
    OthelloGame.fill(OthelloRules.cpuCell(), 2);
  },
};

OthelloCell = $.klass({
  onclick: function(){
    if(OthelloRules.checkValidPosition(this.element)) {
      OthelloGame.fill(this.element, 1);
      OthelloGame.cpu();
    } else {
      alert("Essa jogada não é permitida, tente novamente dessa vez dentro das regras.");
    }
  }
});

jQuery(function($) {
  $('.othello_board_td').attach(OthelloCell);
});