var OthelloRules = {
  checkValidPosition: function(cell) {
    return !MatrixHelper.emptyCell(OthelloGame.indexes(cell));
  },
  cellFromIndexes: function(cellIndexes) {
    return $("#cell_" + cellIndexes.x + "_" + cellIndexes.y);
  },
  cpuCell: function() {
    return OthelloRules.cellFromIndexes(MatrixHelper.sortPosition());
  },
  isGameOver: function() {
    return !MatrixHelper.hasEmpyCell();
  },
  cellsToEat: function(cell, player) {
    result = MatrixHelper.cellsToEat(cell, player);
    for (var index=0;index<result.length;index=index+1) {
      result[index] = OthelloRules.cellFromIndexes(result[index]);
    };
    return result;
    // 
    // 
    // return [$("#cell_0_0"),$("#cell_1_0")];
  },
};
