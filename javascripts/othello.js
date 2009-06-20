// value 0: unoccupied
// value 1: player 1
// value 2: computer

var OthelloRules = {
  checkValidPosition: function(cell) {
    alert("Aqui devemos verificar se a jogada é permitida");
    return true;
  },
  cpuCell: function() {
    alert("É nessa parte que entra a IA do jogo.\ Deve retornar a celula onde o computador vai jogar.");
    return $("#cell_0_0");
  },
  isGameOver: function() {
    alert("É nessa parte que a gente verifica se é game over.");
    return false;
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
    OthelloGame.gameOver();
  },
  gameOver: function() {
    isGameOver = OthelloRules.isGameOver();
    if(isGameOver) {
     alert("Deu game over, devemos calcular quem ganhou aqui e remover a possibilidade de continuar jogando \n e por umas mensagens bonitinhas informando que acabou e um botão de reload.");
    };
    return isGameOver;
  },
  play: function(cell) {
    if(OthelloRules.checkValidPosition(cell)) {
      OthelloGame.fill(cell, 1);
      if(!OthelloGame.gameOver()) {
        OthelloGame.cpu();
      }
    } else {
      alert("Essa jogada não é permitida, tente novamente dessa vez dentro das regras.");
    };
  }
};

OthelloCell = $.klass({
  onclick: function(){
    OthelloGame.play(this.element);
  }
});

jQuery(function($) {
  $('.othello_board_td').attach(OthelloCell);
});