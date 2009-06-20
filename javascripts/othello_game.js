var OthelloGame = {
  indexes: function(cell) {
    result = /cell_(\d)_(\d)/.exec(cell.attr("id"));
    return {x:result[1], y:result[2]}
  },
  fill: function(cell, player_value) {
    MatrixHelper.valueFor(OthelloGame.indexes(cell), player_value);
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
