var OthelloHeuristic = {
  next: function(allPossibles) {
    return allPossibles[Math.floor(Math.random()*allPossibles.length)];
  }
}