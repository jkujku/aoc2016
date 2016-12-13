/*
index:	0	1	2	3	4	5	6	7	8	9	10
name:	F	PrM	PrG	CoM	CoG	CuM	CuG	RuM	RuG	PlM	PlG
start:	1	1	1	3	2	3	2	3	2	3	2
end:	4	4	4	4	4	4	4	4	4	4	4
*/
var delta = [
11100000000,
10011000000,
10000110000,
10000001100,
10000000011,
11000000000,11010000000,11000100000,11000001000,11000000010,
10100000000,10101000000,10100010000,10100000100,10100000001,
10010000000,            10010100000,10010001000,10010000010,
10001000000,            10001010000,10001000100,10001000001,
10000100000,                        10000101000,10000100010,
10000010000,                        10000010100,10000010001,
10000001000,                                    10000001010,
10000000100,                                    10000000101,
10000000010,
10000000001
];
var start = 11132323232;
var finish = 44444444444; 
var max = 50;

var visited = [];

var dig = function(number, idx){
    return parseInt((""+number)[idx], 10);
}

var isPossibleMove = function(state, d){
    var result = true;
    var level = dig(state,0);
    _.each(_.range(1,11), function(i){
        result &= !(dig(state, i) != level && dig(d, i) == 1);
    });
    return result;
}

var filterMoves = function(current){
    return _.filter(delta, function(d){
        return isPossibleMove(current, d);
    });
}

var getNexts = function(current){
    var nexts = [];
    var moves = filterMoves(current);
    _.each(moves, function(d){
       if(dig(current, 0) < 4){ 
           var nextUp = current + d;
           if(!isInvalid(nextUp)){
               nexts.push(nextUp);
           }
       } 
       if(dig(current, 0) > 1){
           var nextDown = current - d;
           if(!isInvalid(nextDown)){
               nexts.push(nextDown);
           }
       } 
    });
    return nexts;
};

var isInvalid = function(state){
	for(var level=0; level <=4; level++){
		
		var same = function(i){
		   return dig(state, i) == level;
		};

		if(same(1) 
			&& !same(2) 
			&& (same(4) || same(6) || same(8) || same(10))) return true;
		if(same(3) 
			&& !same(4) 
			&& (same(2) || same(6) || same(8) || same(10))) return true;
		if(same(5) 
			&& !same(6) 
			&& (same(4) || same(2) || same(8) || same(10))) return true;
		if(same(7) 
			&& !same(8) 
			&& (same(4) || same(6) || same(2) || same(10))) return true;
		if(same(9) 
			&& !same(10) 
			&& (same(4) || same(6) || same(8) || same(2))) return true;

	}
    return false;
}

var step = function(count, current){
    if(count == max){
        return;
    }
    if(current == finish){
        console.log("HERE", count);
        return;
    }
    
	if(_.isUndefined(visited[current])){
		visited[current] = count;
	}else{
		if(visited[current] > count){
			visited[current] = count;
		}else{
		//	console.log(current, count);
			return;
		}
	}
    
    _.each(getNexts(current), function(next){
		step(count+1, next);
    });
}

var doit = function(){
	step(0, start);
	console.log("ready");
	//console.log(visited);
};

doit();