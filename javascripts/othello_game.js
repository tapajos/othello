var OthelloGame = {
  indexes: function(cell) {
    result = /cell_(\d)_(\d)/.exec(cell.attr("id"));
    return {x:result[1], y:result[2]};
  },
  designBoard: function() {
    for (var line_index=0;line_index<matrix.getRowSize();line_index=line_index+1) {
      line = matrix.getRow(line_index);
      for (var col_index=0;col_index<line.length;col_index=col_index+1) {
        if(line[col_index] == HUMAN){
          OthelloRules.cellFromIndexes({x:line_index, y:col_index}).addClass("p1");
        }
        if(line[col_index] == CPU){
          OthelloRules.cellFromIndexes({x:line_index, y:col_index}).addClass("cpu");
        }
      }
    };
  },
  fill: function(cell, player_value) {
    MatrixHelper.valueFor(OthelloGame.indexes(cell), player_value);
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
    OthelloRules.eat(lastCell, player);
  },
  play: function(cell) {
    if(OthelloRules.checkValidPosition(cell)) {
      OthelloGame.fill(cell, HUMAN);
      OthelloGame.eat(cell, HUMAN);
      if(!OthelloGame.gameOver()) {
        OthelloGame.cpu();
      }
      OthelloGame.designBoard();
    } else {
      alert("Essa jogada não é permitida, tente novamente dessa vez dentro das regras.");
    };
  }
};
