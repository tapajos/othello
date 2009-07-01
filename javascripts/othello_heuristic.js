var OthelloHeuristic = {
  next: function(allPossibles) {
    return OthelloRules.cellFromIndexes(allPossibles.sort(OthelloHeuristic.sortFunction)[0]);
  },
  sortFunction: function(element, other) {
    return (other.heuristic - element.heuristic);
  },
  getHeuristicFor: function(cell) {
    return  MatrixHelper.checkLineEatLeftToRight(cell, CPU, HUMAN).weight +
            MatrixHelper.checkLineEatRightToLeft(cell, CPU, HUMAN).weight +
            MatrixHelper.checkColEatTopToBotton(cell, CPU, HUMAN).weight +
            MatrixHelper.checkColEatBottonToTop(cell, CPU, HUMAN).weight +
            MatrixHelper.checkPositiveDiagonalEatBottonToTop(cell, CPU, HUMAN).weight +
            MatrixHelper.checkPositiveDiagonalEatTopToBotton(cell, CPU, HUMAN).weight +
            MatrixHelper.checkNegativeDiagonalEatBottonToTop(cell, CPU, HUMAN).weight +
            MatrixHelper.checkNegativeDiagonalEatTopToBotton(cell, CPU, HUMAN).weight
  },
}