var OthelloRules = {
  checkValidPosition: function(cell) {
    return !MatrixHelper.emptyCell(OthelloGame.indexes(cell));
  },
  cpuCell: function() {
    cell_indexes = MatrixHelper.sortPosition();
    return $("#cell_" + cell_indexes.x + "_" + cell_indexes.y);
  },
  isGameOver: function() {
    return !MatrixHelper.hasEmpyCell();
  }
};
