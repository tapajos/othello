var OthelloGame = {
  indexes: function(cell) {
    result = /cell_(\d)_(\d)/.exec(cell.attr("id"));
    return {x:parseInt(result[1]), y:parseInt(result[2])};
  },
  designBoard: function() {
    for (var line_index=0;line_index<matrix.getRowSize();line_index=line_index+1) {
      line = matrix.getRow(line_index);
      for (var col_index=0;col_index<line.length;col_index=col_index+1) {
        OthelloRules.cellFromIndexes({x:line_index, y:col_index}).removeClass("p1");
        OthelloRules.cellFromIndexes({x:line_index, y:col_index}).removeClass("cpu");
        if(line[col_index] == HUMAN){
          OthelloRules.cellFromIndexes({x:line_index, y:col_index}).addClass("p1");
        };
        if(line[col_index] == CPU){
          OthelloRules.cellFromIndexes({x:line_index, y:col_index}).addClass("cpu");
        };
      }
    };
  },
  fill: function(cell, player_value) {
    MatrixHelper.setValueOn(OthelloGame.indexes(cell), player_value);
  },
  cpu: function() {
    cpuCell = OthelloRules.cpuCell();
    OthelloGame.fill(cpuCell, CPU);
    OthelloGame.eat(cpuCell, CPU, HUMAN);
    OthelloGame.designBoard();
    OthelloGame.gameOver();
  },
  gameOver: function() {
    isGameOver = OthelloRules.isGameOver();
    if(isGameOver) {
     alert(MatrixHelper.getWinner());
    };
    return isGameOver;
  },
  eat: function(lastCell, player, oposite) {
    OthelloRules.eat(lastCell, player, oposite);
  },
  updateCount: function(count) {
    $("#p1_count").html(count.human);
    $("#cpu_count").html(count.cpu);
  },
  play: function(cell) {
    if(nextPlayer == HUMAN) {
      if(OthelloRules.checkValidPosition(cell, HUMAN, CPU)) {
        nextPlayer = CPU;
        OthelloGame.fill(cell, HUMAN);
        OthelloGame.eat(cell, HUMAN, CPU);
        OthelloGame.designBoard();
        if(!OthelloGame.gameOver()) {
          setTimeout("OthelloGame.cpu();nextPlayer = HUMAN;",1250);
        }
      } else {
        alert("Essa jogada não é permitida, tente novamente dessa vez dentro das regras.");
      };
    } else {
      alert("Será que você pode esperar o computador jogar?????");
    }
  }
};
