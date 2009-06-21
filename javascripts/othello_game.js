var OthelloGame = {
  indexes: function(cell) {
    result = /cell_(\d)_(\d)/.exec(cell.attr("id"));
    return {x:result[1], y:result[2]};
  },
  fill: function(cell, player_value) {
    MatrixHelper.valueFor(OthelloGame.indexes(cell), player_value);
    if(player_value == HUMAN) {
      cell.addClass("p1");
    } else {
      cell.addClass("cpu");
    }
  },
  cpu: function() {
    cpuCell = OthelloRules.cpuCell();
    OthelloGame.fill(cpuCell, CPU);
    OthelloGame.eat(cpuCell, CPU);
    OthelloGame.gameOver();
  },
  gameOver: function() {
    isGameOver = OthelloRules.isGameOver();
    if(isGameOver) {
     alert("O vencedor foi: " + MatrixHelper.getWinner());
    };
    return isGameOver;
  },
  eat: function(lastCell, player) {
    //Stupid method name!!! It should be refactored!
    cellstoEat = OthelloRules.cellsToEat(lastCell);
    for (var index=0;index<cellstoEat.length;index=index+1) {
      OthelloGame.fill(cellstoEat[index], player);
    };
  },
  play: function(cell) {
    if(OthelloRules.checkValidPosition(cell)) {
      OthelloGame.fill(cell, HUMAN);
      OthelloGame.eat(cell, HUMAN);
      if(!OthelloGame.gameOver()) {
        OthelloGame.cpu();
      }
    } else {
      alert("Essa jogada não é permitida, tente novamente dessa vez dentro das regras.");
    };
  }
};
