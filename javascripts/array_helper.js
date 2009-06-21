Array.prototype.clone = function () {
  var newArray = new Array();
  for(var index=0; index<this.length;index=index+1) {
    newArray[index] = this[index];
  }
  return newArray;
}; 
