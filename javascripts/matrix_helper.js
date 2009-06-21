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
  emptyCell: function(cell_indexes) {
    return matrix.getRow(cell_indexes.x)[cell_indexes.y] != UNOCCUPIED;
  },
  sortPosition: function() {
    cell_indexes = MatrixHelper.random();
    while(MatrixHelper.emptyCell(cell_indexes)){
      cell_indexes = MatrixHelper.random();
    }
    matrix.getRow(cell_indexes.x)[cell_indexes.y] = CPU;
    return cell_indexes;
  }
};