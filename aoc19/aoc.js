var _ = require("underscore");

var number = 3014603;
//var number = 5;
var elves = [];

var part1 = function(number){
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

var next = function(i){
	if(i >= elves.length) i = 0;
	while(_.isUndefined(elves[i])){
		i = (i+1) % elves.length;
	}
	return i;
}

var init = function(){
	for(var e=0; e<number; e++){
		elves.push(e+1);
	}
};

var kill = function(index){
	var half = Math.floor(elves.length/2);
	var killposition = (half + index) % elves.length;
	//console.log("kill", elves.length, killposition, "|", elves[index], "kills", elves[killposition]);
	elves[killposition] = undefined;
	elves = _.filter(elves, function(e){
		return !_.isUndefined(e);
	});
};

var part2 = function(input){
	var maxsteps = 0;
	var elf = -1;
	while(elves.length > 1){
		maxsteps++;
		elf++;
		elf = next(elf);
		//console.log("step", maxsteps, elves.length, elf);
		kill(elf);
		//console.log("step", maxsteps, elves.length, elf);
		//console.log("\n");
	}
	console.log(elves);
};

init();
part2(number);