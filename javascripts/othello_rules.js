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
  eat: function(lastCell, player) {
    MatrixHelper.lineEat(lastCell, player);
    MatrixHelper.colEat(lastCell, player);
    MatrixHelper.positiveDiagonalEat(lastCell, player);
    MatrixHelper.negativeDiagonalEat(lastCell, player);
  },
};
