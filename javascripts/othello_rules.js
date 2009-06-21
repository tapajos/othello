var OthelloRules = {
  checkValidPosition: function(cell, oposite) {
    return MatrixHelper.emptyCell(OthelloGame.indexes(cell)) && MatrixHelper.frontier(OthelloGame.indexes(cell), oposite);
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
  eat: function(lastCell, player, oposite) {
    MatrixHelper.lineEatLeftToRight(lastCell, player, oposite);
    MatrixHelper.lineEatRightToLeft(lastCell, player, oposite);
    MatrixHelper.colEat(lastCell, player, oposite);
    MatrixHelper.positiveDiagonalEat(lastCell, player, oposite);
    MatrixHelper.negativeDiagonalEat(lastCell, player, oposite);
  },
};
