var input = `swapLetter e h
swapLetter f g
move 6 3
reversePositions 1 6
swapLetter b a
swapLetter a f
rotateByPosition e
swapPosition 7 2
rotateByPosition e
swapLetter c e
rotateByPosition f
rotateRight 6
swapLetter c f
reversePositions 3 7
swapLetter c b
swapPosition 1 2
reversePositions 3 6
swapLetter c a
rotateLeft 0
swapPosition 3 0
swapLetter b e
reversePositions 4 7
move 1 4
swapPosition 6 3
rotateLeft 6
rotateRight 0
move 7 3
move 3 4
swapPosition 3 2
reversePositions 1 6
move 7 5
reversePositions 4 5
rotateByPosition g
swapPosition 4 2
reversePositions 1 5
rotateByPosition h
rotateByPosition f
rotateByPosition b
swapPosition 1 4
swapLetter b h
rotateByPosition e
swapLetter a c
swapPosition 3 5
rotateRight 6
rotateByPosition c
move 2 0
swapLetter b e
swapLetter g e
rotateByPosition d
swapPosition 6 5
swapLetter b c
rotateByPosition e
rotateByPosition f
rotateByPosition f
move 7 0
rotateRight 1 step
rotateRight 7
swapPosition 5 6
move 6 7
rotateByPosition e
swapPosition 3 1
swapPosition 4 3
swapLetter f a
swapPosition 5 2
rotateByPosition e
rotateLeft 3
rotateLeft 1 step
rotateByPosition b
rotateLeft 6
rotateByPosition b
rotateRight 7
swapPosition 0 2
swapPosition 7 5
rotateLeft 3
reversePositions 4 5
move 2 5
swapLetter c f
swapLetter g e
rotateLeft 6
swapPosition 4 6
rotateByPosition h
rotateLeft 2
swapLetter c a
rotateRight 3
rotateLeft 6
swapLetter b f
swapPosition 6 5
reversePositions 3 4
reversePositions 2 7
swapPosition 7 4
rotateByPosition d
swapPosition 5 3
swapLetter c b
swapPosition 7 6
rotateByPosition c
reversePositions 0 7
reversePositions 2 4
rotateByPosition f
reversePositions 1 4
rotateRight 7`.split("\n");

var scrampled = "abcdefgh";


// swap position X with position Y means that the letters at indexes X and Y (counting from 0) should be swapped.
var swapPosition = function(str, x, y){
  if(x == y) return str;
  if(x > y){
    var t = x; x = y; y = t; 
  }
  return str.substring(0,x) + str.substring(y,y+1) + str.substring(x+1,y) + str.substring(x,x+1) + str.substring(y+1);
};

// swap letter X with letter Y means that the letters X and Y should be swapped (regardless of where they appear in the string).
var swapLetter = function(str, x, y){
  var rgX = new RegExp(x, "g");
  var rgY = new RegExp(y, "g");
  var rgTmp = new RegExp("0", "g");
  return str.replace(rgX, "0").replace(rgY, x).replace(rgTmp, y);
};

// rotate left/right X steps means that the whole string should be rotated; for example, one right rotation would turn abcd into dabc.
var rotateLeft = function(str, steps){
  if(steps == 0) return str;
  steps = steps % str.length;
  return str.substring(steps) + str.substring(0, steps);
};

var rotateRight = function(str, steps){
  if(steps == 0) return str;
  steps = steps % str.length;
  return str.substring(str.length-steps) + str.substring(0, str.length-steps);
};


// rotate based on position of letter X means that the whole string should be rotated to the right based on the index of letter X (counting from 0) 
// as determined before this instruction does any rotations. Once the index is determined, rotate the string to the right one time, 
// plus a number of times equal to that index, plus one additional time if the index was at least 4.
var rotateByPosition = function(str, x){
  var index = str.indexOf(x);
  if(index >= 4){
    index += 2
  }else{
    index += 1;
  }
  return rotateRight(str, index);
};

// reverse positions X through Y means that the span of letters at indexes X through Y (including the letters at X and Y) 
// should be reversed in order.
var reversePosition = function(str, x, y){
    if(x == y) return str;
    if(x > y){
      var t = x; x = y; y = t; 
    }
    var sub = str.substring(x, y+1);
    sub = sub.split("").reverse().join("");
    return str.substring(0,x) + sub + str.substring(y+1);
};


// move position X to position Y means that the letter which is at index X should be removed from the string, 
// then inserted such that it ends up at index Y.
var move = function(str, x, y){
   var letterAtX = str.substring(x, x+1);
   var removed  = str.replace(letterAtX, "");
   return removed.substring(0, y) + letterAtX + removed.substring(y);
};

console.log(swapPosition("abcde", 4, 0), "ebcda");
console.log(swapLetter("ebcda", "d", "b"), "edcba");
console.log(reversePosition("edcba", 0, 4), "abcde");
console.log(rotateLeft("abcde", 1), "bcdea");
console.log(move("bcdea", 1, 4), "bdeac");
console.log(move("bdeac", 3, 0), "abdec");
console.log(rotateByPosition("abdec", "b"), "ecabd");
console.log(rotateByPosition("abdec", "d"), "decab");


var commands = _.map(input, function(line){
    return line.split(" ");
});

_.each(commands, function(c){
    var p = function(str){
      return parseInt(str, 10);
    };
    switch(c[0]){
      case "swapPosition" : scrampled = swapPosition(scrampled, p(c[1]), p(c[2])); break;
      case "swapLetter" : scrampled = swapLetter(scrampled, c[1], c[2]); break;
      case "reversePositions" : scrampled = reversePosition(scrampled, p(c[1]), p(c[2])); break;
      case "rotateLeft" : scrampled = rotateLeft(scrampled, p(c[1])); break;
      case "rotateRight" : scrampled = rotateRight(scrampled, p(c[1])); break;
      case "move" : scrampled = move(scrampled, p(c[1]), p(c[2])); break;
      case "rotateByPosition" : scrampled = rotateByPosition(scrampled, c[1]); break;
      default : console.log("should not be", c);
    }
});