var OthelloRules = {
  checkValidPosition: function(cell) {
    alert("Aqui devemos verificar se a jogada é permitida");
    return true;
  },
  cpuCell: function() {
    alert("É nessa parte que entra a IA do jogo.\ Deve retornar a celula onde o computador vai jogar.");
    return $("#cell_0_0");
  },
  isGameOver: function() {
    return !MatrixHelper.hasEmpyCell();
  }
};
