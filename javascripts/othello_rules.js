var OthelloRules = {
  checkValidPosition: function(cell, player, oposite) {
    return MatrixHelper.emptyCell(OthelloGame.indexes(cell)) && MatrixHelper.frontier(OthelloGame.indexes(cell), oposite) && MatrixHelper.isEatable(cell, player, oposite);
  },
  cellFromIndexes: function(cellIndexes) {
    return $("#cell_" + cellIndexes.x + "_" + cellIndexes.y);
  },
  cpuCell: function() {
    allPossibles = MatrixHelper.allPossible(CPU, HUMAN);
    if(allPossibles != []) {
      return MatrixHelper.random(allPossibles);
    } else {
      return null;
    }
  },
  isGameOver: function() {
    count = MatrixHelper.countPieces();
    OthelloGame.updateCount(count);
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
