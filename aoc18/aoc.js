var passcode = 'udskfozm';

var start = {
  passcode : passcode,
  room : {
      x : 0,
      y :0
  },
  way : ""
};

var ways = [];
var min = 100;

var finished = function(room){
  return room.room.x == 3 && room.room.y == 3;
};

var opened = function(room){
  return _.map(hash(room.passcode+room.way), function(c){
    //console.log(c, parseInt(c,16), parseInt(c,16) > 10);
    return parseInt(c,16) > 10;  
  });
};

var hash = function(str){
    return (Crypto.MD5(str)).substring(0,4);  
};

var possibilities = function(room){
  var open = opened(room);
  var newrooms = [];
  if(open[0] && room.room.y > 0){
    newrooms.push({
      passcode : room.passcode,
      room : {
        x : room.room.x,
        y : room.room.y - 1
      },
      way : room.way + "U"
    })
  };
  if(open[1] && room.room.y < 3){
    newrooms.push({
      passcode : room.passcode,
      room : {
        x : room.room.x,
        y : room.room.y + 1
      },
      way : room.way + "D"
    })
  };
  if(open[2] && room.room.x > 0){
    newrooms.push({
      passcode : room.passcode,
      room : {
        x : room.room.x - 1,
        y : room.room.y
      },
      way : room.way + "L"
    })
  };
  if(open[3] && room.room.x < 3){
    newrooms.push({
      passcode : room.passcode,
      room : {
        x : room.room.x + 1,
        y : room.room.y
      },
      way : room.way + "R"
    })
  };
  return newrooms;
};

var next = function(room){
  if(finished(room)){
      ways.push(room);
      min = Math.min(room.way.length, min);
  //}else if(room.way.length > min){
      // nothing;
  }else{
      _.each(possibilities(room), function(p){
          next(p);
      });
  }
};

next(start);
ways = _.sortBy(ways, function(w){
  return w.way.length;
});
console.log(ways);
console.log(ways[0]);
console.log(ways[ways.length-1]);
