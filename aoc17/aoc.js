var input = '.^^..^...^..^^.^^^.^^^.^^^^^^.^.^^^^.^^.^^^^^^.^...^......^...^^^..^^^.....^^^^^^^^^....^^...^^^^..^'.replace(/\./g, "0").replace(/\^/g, "1");
var rows = 399999;

var output = [];
var result = 0;

var getTile = function(left,center,right){
  if(left === undefined) left = "0";
  if(right === undefined) right = "0";  
  var code = parseInt(""+left+center+right, 2);
  //console.log(left,center,right,code);
  return (code == 6 || code == 3 || code == 4 || code == 1) ? "1" : "0";
};

var doit = function(input){
    output.push(input);
    result = input.replace(/1/g, "").length;
    for(i=0; i<rows;i++){
      var lastRow = output[output.length-1];
      var nextRow = "";
      _.each(_.range(0,input.length), function(c){
        nextRow += getTile(lastRow[c-1],lastRow[c],lastRow[c+1]);
      });
      var saveTile = nextRow.replace(/1/g, "").length;
      result += saveTile;
      output.push(nextRow);
    }
    console.log(input);
    //console.log(output.join("\n"));
    console.log(result);
};

doit(input);