var MatrixHelper = {
  allPossible: function (player, oposite) {
    possibles = []
    for (var line_index=0;line_index<matrix.getRowSize();line_index=line_index+1) {
      line = matrix.getRow(line_index);
      for (var col_index=0;col_index<line.length;col_index=col_index+1) {
        if(line[col_index] == UNOCCUPIED){
          cell = OthelloRules.cellFromIndexes({x:line_index, y:col_index});
          if (OthelloRules.checkValidPosition(cell, player, oposite)) {
            possibles[possibles.length] = cell;
          }
        }
      }
    }
    return possibles;
  },
  random: function(allPossibles) {
    return allPossibles[Math.floor(Math.random()*allPossibles.length)];
  },
  setValueOn: function(indexes, value) {
    matrix.getRow(indexes.x)[indexes.y] = value;
  },
  hasEmptyCell: function(){
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
    count = MatrixHelper.countPieces();
    if(count.cpu > count.human) {
      return "Você perdeu, nossa IA te derrotou.";
    } else if(count.human > count.cpu){
      return "Parabéns, você venceu.";
    } else if(count.human == count.cpu) {
      return "Deuce!!"
    };
  },
  countPieces: function() {
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
    return {cpu: cpu, human: human};
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
  isEatable: function(lastCell, player, oposite) {
    return  MatrixHelper.checkLineEatLeftToRight(lastCell, player, oposite).replace ||
            MatrixHelper.checkLineEatRightToLeft(lastCell, player, oposite).replace ||
            MatrixHelper.checkColEatTopToBotton(lastCell, player, oposite).replace ||
            MatrixHelper.checkColEatBottonToTop(lastCell, player, oposite).replace ||
            MatrixHelper.checkPositiveDiagonalEatBottonToTop(lastCell, player, oposite).replace ||
            MatrixHelper.checkPositiveDiagonalEatTopToBotton(lastCell, player, oposite).replace ||
            MatrixHelper.checkNegativeDiagonalEatBottonToTop(lastCell, player, oposite).replace ||
            MatrixHelper.checkNegativeDiagonalEatTopToBotton(lastCell, player, oposite).replace
  },
  emptyCell: function(cellIndexes) {
    return matrix.getRow(cellIndexes.x)[cellIndexes.y] == UNOCCUPIED;
  },
  sortPosition: function() {
    cellIndexes = MatrixHelper.random();
    while(!OthelloRules.checkValidPosition(OthelloRules.cellFromIndexes(cellIndexes), CPU, HUMAN) || !MatrixHelper.emptyCell(cellIndexes)) {
      cellIndexes = MatrixHelper.random();
    }
    matrix.getRow(cellIndexes.x)[cellIndexes.y] = CPU;
    return cellIndexes;
  },
  lineEatLeftToRight: function(lastCell, player, oposite) {
    item = MatrixHelper.checkLineEatLeftToRight(lastCell, player, oposite);
    if(item.replace) {
      matrix[indexes.x] = item.collection;
    };
  },
  checkLineEatLeftToRight: function(lastCell, player, oposite) {
    indexes = OthelloGame.indexes(lastCell);
    replace = false;
    stop = false;
    row = matrix.getRow(indexes.x).clone();
    for(var index=indexes.y+1; index < row.length && !stop; index = index + 1) {
      if(row[index] == oposite) {
        row[index] = player;
      } else {
        if(row[index] == player){
          replace = true;
        }
        stop = true;
        if(index == indexes.y+1) {
          replace = false;
        }
      }
    };
    return {replace:replace, collection: row};
  },
  lineEatRightToLeft: function(lastCell, player, oposite) {
    item = MatrixHelper.checkLineEatRightToLeft(lastCell, player, oposite);
    if(item.replace) {
      matrix[indexes.x] = item.collection;
    };
  },
  checkLineEatRightToLeft: function(lastCell, player, oposite) {
    indexes = OthelloGame.indexes(lastCell);
    replace = false;
    stop = false;
    row = matrix.getRow(indexes.x).clone();
    for(var index=indexes.y-1; index >= 0 && !stop; index = index - 1) {
      if(row[index] == oposite) {
        row[index] = player;
      } else {
        if(row[index] == player){
          replace = true;
        }
        if(index == indexes.y-1) {
          replace = false;
        }
        stop = true;
      }
    };
    return {replace:replace, collection: row};
  },
  colEatTopToBotton: function(lastCell, player, oposite) {
    indexes = OthelloGame.indexes(lastCell);
    item = MatrixHelper.checkColEatTopToBotton(lastCell, player, oposite);
    if(item.replace) {
      matrix.setCol(indexes.y, item.collection);
    };
    
  },
  checkColEatTopToBotton: function(lastCell, player, oposite) {
    indexes = OthelloGame.indexes(lastCell);
    replace = false;
    stop = false;
    col = matrix.getCol(indexes.y).clone();
    for(var index=indexes.x+1; index < col.length && !stop; index = index + 1) {
      if(col[index] == oposite) {
        col[index] = player;
      } else {
        if(col[index] == player){
          replace = true;
        }
        stop = true;
        if(index == indexes.x+1) {
          replace = false;
        }
        
      }
    };
    return {replace:replace, collection: col};
  },
  colEatBottonToTop: function(lastCell, player, oposite) {
    indexes = OthelloGame.indexes(lastCell);
    item = MatrixHelper.checkColEatBottonToTop(lastCell, player, oposite);
    if(item.replace) {
      matrix.setCol(indexes.y, item.collection);
    };
  },
  checkColEatBottonToTop: function(lastCell, player, oposite) {
    indexes = OthelloGame.indexes(lastCell);
    replace = false;
    stop = false;
    col = matrix.getCol(indexes.y).clone();
    for(var index=indexes.x-1; index >= 0 && !stop; index = index - 1) {
      if(col[index] == oposite) {
        col[index] = player;
      } else {
        if(col[index] == player){
          replace = true;
        }
        stop = true;
        if(index == indexes.x-1) {
          replace = false;
        }
        
      }
    };
    return {replace:replace, collection: col};
  },
  positiveDiagonalEatBottonToTop: function(lastCell, player, oposite) {
    indexes = OthelloGame.indexes(lastCell);
    item = MatrixHelper.checkPositiveDiagonalEatBottonToTop(lastCell, player, oposite);
    if(item.replace) {
      y = 1;
      for (var line_index=indexes.x-1;line_index >= 0 && (indexes.y + y) < matrix.getColSize();line_index=line_index-1){
        matrix.getRow(line_index)[indexes.y + y] = item.collection.pop();
        y = y + 1;
      };
    };
  },
  checkPositiveDiagonalEatBottonToTop: function(lastCell, player, oposite) {
    indexes = OthelloGame.indexes(lastCell);
    diagonal = [];
    y = 1;
    for (var line_index=indexes.x-1;line_index >= 0 && (indexes.y + y) < matrix.getColSize(); line_index=line_index-1) {
      diagonal.push(matrix.getRow(line_index)[indexes.y + y]);
      y = y + 1;
    };
    
    replace = false;
    stop = false;
    for(var index=0; index < diagonal.length && !stop; index = index + 1) {
      if(diagonal[index] == oposite) {
        diagonal[index] = player;
      } else {
        if(diagonal[index] == player){
          replace = true;
        }
        stop = true;
        if(index == 0) {
          replace = false;
        }
        
      }
    };
    diagonal = diagonal.reverse();
    return {replace:replace, collection: diagonal};
  },
  positiveDiagonalEatTopToBotton: function(lastCell, player, oposite) {
    indexes = OthelloGame.indexes(lastCell);
    item = MatrixHelper.checkPositiveDiagonalEatTopToBotton(lastCell, player, oposite);
    if(item.replace) {
      y = 1;
      for (var line_index=indexes.x+1;line_index<matrix.getRowSize() && (indexes.y - y) >= 0;line_index=line_index+1) {
        matrix.getRow(line_index)[indexes.y - y] = item.collection.pop();
        y = y + 1;
      };
    };
    
  },
  checkPositiveDiagonalEatTopToBotton: function(lastCell, player, oposite) {
    indexes = OthelloGame.indexes(lastCell);
    diagonal = [];
    y = 1;
    for (var line_index=indexes.x+1;line_index<matrix.getRowSize() && (indexes.y - y) >= 0;line_index=line_index+1) {
      diagonal.push(matrix.getRow(line_index)[indexes.y - y]);
      y = y + 1;
    };
    
    replace = false;
    stop = false;
    for(var index=0; index < diagonal.length && !stop; index = index + 1) {
      if(diagonal[index] == oposite) {
        diagonal[index] = player;
      } else {
        if(diagonal[index] == player){
          replace = true;
        }
        if(index == 0) {
          replace = false;
        }
        
        stop = true;
      }
    };
    
    diagonal = diagonal.reverse();
    return {replace:replace, collection: diagonal};
  },
  negativeDiagonalEatBottonToTop: function(lastCell, player, oposite) {
    indexes = OthelloGame.indexes(lastCell);
    item = MatrixHelper.checkNegativeDiagonalEatBottonToTop(lastCell, player, oposite);
    
    if(item.replace) {
      y = 1;
      for (var line_index=indexes.x-1;line_index >= 0 && (indexes.y - y) >= 0; line_index=line_index-1) {
        matrix.getRow(line_index)[indexes.y - y] = item.collection.pop();
        y = y + 1;
      };
    };
  },
  checkNegativeDiagonalEatBottonToTop: function(lastCell, player, oposite) {
    indexes = OthelloGame.indexes(lastCell);
    diagonal = [];
    y = 1;
    for (var line_index=indexes.x-1;line_index >= 0 && (indexes.y - y) >= 0; line_index=line_index-1) {
      diagonal.push(matrix.getRow(line_index)[indexes.y - y]);
      y = y + 1;
    };
    
    replace = false;
    stop = false;
    for(var index=0; index < diagonal.length && !stop; index = index + 1) {
      if(diagonal[index] == oposite) {
        diagonal[index] = player;
      } else {
        if(diagonal[index] == player){
          replace = true;
        }
        stop = true;
        if(index == 0) {
          replace = false;
        }
        
      }
    };
    
    diagonal = diagonal.reverse();
    return {replace:replace, collection: diagonal};
  },
  negativeDiagonalEatTopToBotton: function(lastCell, player, oposite) {
    indexes = OthelloGame.indexes(lastCell);
    item = MatrixHelper.checkNegativeDiagonalEatTopToBotton(lastCell, player, oposite);
    if(item.replace) {
      y = 1;
       for (var line_index=indexes.x+1;line_index < matrix.getRowSize() && (indexes.y + y) < matrix.getColSize(); line_index=line_index+1) {
        matrix.getRow(line_index)[indexes.y + y] = item.collection.pop();
        y = y + 1;
      };
    };
  },
  checkNegativeDiagonalEatTopToBotton: function(lastCell, player, oposite) {
    indexes = OthelloGame.indexes(lastCell);
    diagonal = [];
    y = 1;
    for (var line_index=indexes.x+1;line_index < matrix.getRowSize() && (indexes.y + y) < matrix.getColSize(); line_index=line_index+1) {
      diagonal.push(matrix.getRow(line_index)[indexes.y + y]);
      y = y + 1;
    };
    
    replace = false;
    stop = false;
    for(var index=0; index < diagonal.length && !stop; index = index + 1) {
      if(diagonal[index] == oposite) {
        diagonal[index] = player;
      } else {
        if(diagonal[index] == player){
          replace = true;
        }
        stop = true;
        if(index == 0) {
          replace = false;
        }
        
      }
    };
    
    
    diagonal = diagonal.reverse();
    return {replace:replace, collection: diagonal};
  }
};