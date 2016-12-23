//var _ = require("underscore");

//var number = 3014603;
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

var init = function(n){
	elves = [];
	for(var e=0; e<n; e++){
		elves.push(e+1);
	}
};

var remove = function(arr, index){
	return arr.slice(0, index).concat(arr.slice(index+1));
};

var getHalf = function(x){
	return 	Math.floor(elves.length/2);
};

var kill = function(index){
	var half = getHalf(index);
	var killposition = (half + index) % elves.length;
	//console.log(elves[index], "kills", elves[killposition]);
	elves = remove(elves, killposition);
	return index >= killposition ? index : index+1;
};

var part2 = function(n){
	var maxsteps = 1000;
	var steps = 0;
	var elf = -1;
	
	while(elves.length > 1){
		steps++;
		elf = next(elf);
		//console.log("step:", steps, "elves.length:", elves.length, "elf's index:", elf, "elf's name:", elves[elf]);
		elf = kill(elf) % elves.length;
		//console.log("\n");
	}
	console.log(n, " ", elves[next(elf)]);
};

_.each(_.range(5,1000), function(n){
	init(n);
	part2(n);
});
