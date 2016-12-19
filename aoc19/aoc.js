var number = 3014603;
var number = 19;

var doit = function(number){
	var result = 3;
	for(var n=7; n<=number; n+=2){
		result += 4;
		if(result > n){
			result = 3;	
			console.log(n, result);
		} 
	}
	console.log("result:", result);
};

//doit(number);