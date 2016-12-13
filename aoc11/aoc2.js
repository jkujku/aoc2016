//var _ = require('underscore');

/*
index:	0	1	2	3	4	5	6	7	8	9	10	11	12	13	14
name:	F	PrM	PrG	CoM	CoG	CuM	CuG	RuM	RuG	PlM	PlG	ElM	ElG	DiM	DiG
start:	1	1	1	3	2	3	2	3	2	3	2	1	1	1	1
end:	4	4	4	4	4	4	4	4	4	4	4	4	4	4	4
*/
var delta;
var start = 111323232321111;
var finish = 444444444444444; 
var max = 60;

var visited = [];


var createDeltas = function(){
	delta = [];
	var elevator = 100000000000000;
	_.each(_.range(0,14), function(element){
		delta.push(elevator + Math.pow(10,element));
		if(element%2==0){
			delta.push(elevator + Math.pow(10,element) + Math.pow(10,element+1));
		}
	});
	_.each(_.range(0,14,2), function(element){
		_.each(_.range(0,14,2), function(element2){
			if(element2 > element){
				delta.push(elevator + Math.pow(10,element) + Math.pow(10,element2));
				delta.push(elevator + Math.pow(10,element+1) + Math.pow(10,element2+1));
			}
		});
	});
	// console.log(delta.join("\n"));
};

var dig = function(number, idx){
    return parseInt((""+number)[idx], 10);
}

var isPossibleMove = function(state, d){
	// where 1 is at position x of delta d, there has to be an element at position x of state
    var result = true;
    var level = dig(state,0);
    _.each(_.range(1,15), function(i){
        result &= !(dig(state, i) != level && dig(d, i) == 1);
    });
    return result;
}

var filterMoves = function(current){
	// filter delta-array, only thoose where elements match durrent floor
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
	for(var level=0; level<=4; level++){
		
		var same = function(i){
		   return dig(state, i) == level;
		};

		if(same(1) 
			&& !same(2) 
			&& (same(4) || same(6) || same(8) || same(10) || same(12) || same(14))) return true;
		if(same(3) 
			&& !same(4) 
			&& (same(2) || same(6) || same(8) || same(10) || same(12) || same(14))) return true;
		if(same(5) 
			&& !same(6) 
			&& (same(4) || same(2) || same(8) || same(10) || same(12) || same(14))) return true;
		if(same(7) 
			&& !same(8) 
			&& (same(4) || same(6) || same(2) || same(10) || same(12) || same(14))) return true;
		if(same(9) 
			&& !same(10) 
			&& (same(4) || same(6) || same(8) || same(2) || same(12) || same(14))) return true;
		if(same(11) 
			&& !same(12) 
			&& (same(4) || same(6) || same(8) || same(2) || same(2) || same(14))) return true;
		if(same(13) 
			&& !same(14) 
			&& (same(4) || same(6) || same(8) || same(2) || same(12) || same(2))) return true;			

	}
    return false;
};

var wasVisitedBefore = function(state, count){
	if(_.isUndefined(visited[state])){
		return false;
	}else{
		if(visited[state] > count){
			return false;
		}
	}
	return true;
};

var markVisited = function(state, count){
	visited[state] = count;
};

var hashState = function(state){
	var elevator = dig(state, 0);
	var pairs = [];
	_.each(_.range(1,15,2), function(element){
		pairs.push(dig(state,element)*10+dig(state,element+1));
	});
	pairs = _.sortBy(pairs, function(p){
		return p;
	});
	return parseInt(("" + elevator + pairs.join("")),10);
};

var step = function(count, current){
    if(count == max){
        return;
    }
    if(current == finish){
        console.log("HERE", count);
        return;
    }
    
    var hash = hashState(current);
    if(wasVisitedBefore(hash, count)){
    	return;
    }else{
    	markVisited(hash, count);
    }
    
    _.each(getNexts(current), function(next){
		step(count+1, next);
    });
};

var doit = function(){
	createDeltas();
	step(0, start);
	console.log("ready");
	//console.log(visited);
};

doit();