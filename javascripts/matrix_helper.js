var MatrixHelper = {
  random: function() {
    return {x:Math.floor(Math.random()*8), y:Math.floor(Math.random()*8)};
  },
  valueFor: function(indexes, value) {
    matrix.getRow(indexes.x)[indexes.y] = value;
  },
  hasEmpyCell: function(){
    for (var line_index=0;line_index<matrix.getRowSize();line_index=line_index+1) {
      line = matrix.getRow(line_index);
      for (var col_index=0;col_index<line.length;col_index=col_index+1) {
        if(line[col_index] == UNOCCUPIED){
          return true;
        }
      }
    };
    return false;
  },
  getWinner: function() {
    cpu = 0;
    human = 0;
    for (var line_index=0;line_index<matrix.getRowSize();line_index=line_index+1) {
      line = matrix.getRow(line_index);
      for (var col_index=0;col_index<line.length;col_index=col_index+1) {
        if(line[col_index] == HUMAN){
          human += 1;
        };
        if(line[col_index] == CPU){
          cpu += 1;
        };
      };
    };
    if(cpu > human) {
      return CPU;
    } else {
      return HUMAN;
    };
  },
  frontierTop: function(cellIndexes,oposite) {
    if(cellIndexes.x == 0) return false;
    return matrix.getRow(cellIndexes.x-1)[cellIndexes.y] == oposite;
  },
  frontierBotton: function(cellIndexes,oposite) {
    if(cellIndexes.x == (matrix.getRowSize()-1)) return false;
    return matrix.getRow(cellIndexes.x+1)[cellIndexes.y] == oposite;
  },
  frontierLeft: function(cellIndexes,oposite) {
    if(cellIndexes.y == 0) return false;
    return matrix.getRow(cellIndexes.x)[cellIndexes.y-1] == oposite;
  },
  frontierRight: function(cellIndexes,oposite) {
    if(cellIndexes.y == (matrix.getColSize() -1)) return false;
    return matrix.getRow(cellIndexes.x)[cellIndexes.y+1] == oposite;
  },
  frontierTopRight: function(cellIndexes,oposite) {
    if(cellIndexes.x == 0) return false;
    if(cellIndexes.y == (matrix.getColSize() -1)) return false;
    return matrix.getRow(cellIndexes.x-1)[cellIndexes.y+1] == oposite;
  },
  frontierTopLeft: function(cellIndexes,oposite) {
    if(cellIndexes.x == 0) return false;
    if(cellIndexes.y == 0) return false;
    return matrix.getRow(cellIndexes.x-1)[cellIndexes.y-1] == oposite;
  },
  frontierBottonRight: function(cellIndexes,oposite) {
    if(cellIndexes.y == (matrix.getColSize() -1)) return false;
    if(cellIndexes.x == (matrix.getRowSize() -1)) return false;
    return matrix.getRow(cellIndexes.x+1)[cellIndexes.y+1] == oposite;
  },
  frontierBottonLeft: function(cellIndexes,oposite) {
    if(cellIndexes.y == 0) return false;
    if(cellIndexes.x == (matrix.getRowSize() -1)) return false;
    return matrix.getRow(cellIndexes.x+1)[cellIndexes.y-1] == oposite;
  },
  frontier: function(cellIndexes,oposite) {
    return MatrixHelper.frontierTop(cellIndexes,oposite)  || 
                   MatrixHelper.frontierBotton(cellIndexes,oposite) ||
                   MatrixHelper.frontierLeft(cellIndexes,oposite) ||
                   MatrixHelper.frontierRight(cellIndexes,oposite) ||
                   MatrixHelper.frontierTopRight(cellIndexes,oposite) ||
                   MatrixHelper.frontierTopLeft(cellIndexes,oposite) ||
                   MatrixHelper.frontierBottonRight(cellIndexes,oposite) ||
                   MatrixHelper.frontierBottonLeft(cellIndexes,oposite);
  },
  emptyCell: function(cellIndexes) {
    return matrix.getRow(cellIndexes.x)[cellIndexes.y] == UNOCCUPIED;
  },
  sortPosition: function() {
    cellIndexes = MatrixHelper.random();
    while(!OthelloRules.checkValidPosition(OthelloRules.cellFromIndexes(cellIndexes), HUMAN) || !MatrixHelper.emptyCell(cellIndexes)) {
      cellIndexes = MatrixHelper.random();
    }
    matrix.getRow(cellIndexes.x)[cellIndexes.y] = CPU;
    return cellIndexes;
  },
  lineEat: function(lastCell, player) {
  },
  colEat: function(lastCell, player) {
  },
  positiveDiagonalEat: function(lastCell, player) {
  },
  negativeDiagonalEat: function(lastCell, player) {
  },
};