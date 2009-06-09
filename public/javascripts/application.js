OthelloCell = $.klass({
  onclick: function(){
    input = this.element.find("input:first");
    input.attr("value", 1);
    this.element.addClass("p1_occupied");
  }
});


jQuery(function($) {
  $('.othello_board_td').attach(OthelloCell);
});