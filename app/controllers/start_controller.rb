require 'matrix'
class StartController < ApplicationController
  
  SIZE = 8
  
  def index
    @board= Matrix.rows(get_rows)
  end
  
  private

    def get_rows
      if request.post?
        params[:matrix].keys.sort.collect{|line| params[:matrix][line]}
      else  
        rows = Array.new(SIZE).collect do
          Array.new(SIZE).collect{0}
        end
      end
    end
  
end