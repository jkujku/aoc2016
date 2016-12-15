var max = 70;
var favoriteNumber = 1364;
var map = [];

var getSign = function(x, y){
	var sum = x*x + 3*x + 2*x*y + y + y*y + favoriteNumber;
	var binarySum = sum.toString(2);
	var numberOnes = binarySum.replace(/0/g, "");
	var count = numberOnes.length;
	if((x==31 && y== 39) || (x==1 && y==1)){
		console.log(count);
		return "o"
	}
	return count%2 === 1 ? "#" : " ";	
};

var fillMap = function(){
	_.each(_.range(0,max), function(y){
		var row = "";
		_.each(_.range(0,max), function(x){
			row += getSign(x, y);
		});
		map.push(row);
	});
};

var doit = function(){
	fillMap();
	console.log(map.join("\n"));
};

doit();