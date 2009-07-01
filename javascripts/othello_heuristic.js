var OthelloHeuristic = {
  next: function(allPossibles) {
    alert(allPossibles[Math.floor(Math.random()*allPossibles.length)].heuristic);
    return OthelloRules.cellFromIndexes(allPossibles[Math.floor(Math.random()*allPossibles.length)]);
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