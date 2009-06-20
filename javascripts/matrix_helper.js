var MatrixHelper = {
  valueFor: function(indexes, value) {
    matrix.getRow(indexes.x)[indexes.y] = value;
  }
};