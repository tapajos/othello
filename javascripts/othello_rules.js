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
    count = MatrixHelper.countPieces();
    if(count.human == 0 || count.cpu == 0) {
      return true   
    }
    return !MatrixHelper.hasEmptyCell();
  },
  eat: function(lastCell, player, oposite) {
    MatrixHelper.lineEatLeftToRight(lastCell, player, oposite);
    MatrixHelper.lineEatRightToLeft(lastCell, player, oposite);
    MatrixHelper.colEatTopToBotton(lastCell, player, oposite);
    MatrixHelper.colEatBottonToTop(lastCell, player, oposite);
    MatrixHelper.positiveDiagonalEatBottonToTop(lastCell, player, oposite);
    MatrixHelper.positiveDiagonalEatTopToBotton(lastCell, player, oposite);
    MatrixHelper.negativeDiagonalEatBottonToTop(lastCell, player, oposite);
    MatrixHelper.negativeDiagonalEatTopToBotton(lastCell, player, oposite);
  },
};
