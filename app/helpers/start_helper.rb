module StartHelper
  
  def get_class(value)
    clazzs = ["othello_board_td"]
    clazzs << "p1_occupied" if value == "1"
    clazzs << "p2_occupied" if value == "2"
    clazzs.join(" ")
  end
  
end
