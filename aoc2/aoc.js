var curX, curY, keys;

var input = `LRRLLLRDRURUDLRDDURULRULLDLRRLRLDULUDDDDLLRRLDUUDULDRURRLDULRRULDLRDUDLRLLLULDUURRRRURURULURRULRURDLULURDRDURDRLRRUUDRULLLLLDRULDDLLRDLURRLDUURDLRLUDLDUDLURLRLDRLUDUULRRRUUULLRDURUDRUDRDRLLDLDDDLDLRRULDUUDULRUDDRLLURDDRLDDUDLLLLULRDDUDDUUULRULUULRLLDULUDLLLLURRLDLUDLDDLDRLRRDRDUDDDLLLLLRRLLRLUDLULLDLDDRRUDDRLRDDURRDULLLURLRDLRRLRDLDURLDDULLLDRRURDULUDUDLLLDDDLLRLDDDLLRRLLURUULULDDDUDULUUURRUUDLDULULDRDDLURURDLDLULDUDUDDDDD
RUURUDRDUULRDDLRLLLULLDDUDRDURDLRUULLLLUDUDRRUDUULRRUUDDURDDDLLLLRRUURULULLUDDLRDUDULRURRDRDLDLDUULUULUDDLUDRLULRUDRDDDLRRUUDRRLULUULDULDDLRLURDRLURRRRULDDRLDLLLRULLDURRLUDULDRDUDRLRLULRURDDRLUDLRURDDRDULUDLDLLLDRLRUDLLLLLDUDRDUURUDDUDLDLDUDLLDLRRDLULLURLDDUDDRDUDLDDUULDRLURRDLDLLUUDLDLURRLDRDDLLDLRLULUDRDLLLDRLRLLLDRUULUDLLURDLLUURUDURDDRDRDDUDDRRLLUULRRDRULRURRULLDDDUDULDDRULRLDURLUDULDLDDDLRULLULULUDLDDRDLRDRDLDULRRLRLRLLLLLDDDRDDULRDULRRLDLUDDDDLUDRLLDLURDLRDLDRDRDURRDUDULLLDLUDLDRLRRDDDRRLRLLULDRLRLLLLDUUURDLLULLUDDRLULRDLDLDURRRUURDUDRDLLLLLLDDDURLDULDRLLDUDRULRRDLDUDRLLUUUDULURRUR
URRRLRLLDDDRRLDLDLUDRDRDLDUDDDLDRRDRLDULRRDRRDUDRRUUDUUUDLLUURLRDRRURRRRUDRLLLLRRDULRDDRUDLRLUDURRLRLDDRRLUULURLURURUDRULDUUDLULUURRRDDLRDLUDRDLDDDLRUDURRLLRDDRDRLRLLRLRUUDRRLDLUDRURUULDUURDRUULDLLDRDLRDUUDLRLRRLUDRRUULRDDRDLDDULRRRURLRDDRLLLRDRLURDLDRUULDRRRLURURUUUULULRURULRLDDDDLULRLRULDUDDULRUULRRRRRLRLRUDDURLDRRDDULLUULLDLUDDDUURLRRLDULUUDDULDDUULLLRUDLLLRDDDLUUURLDUDRLLLDRRLDDLUDLLDLRRRLDDRUULULUURDDLUR
UULDRLUULURDRLDULURLUDULDRRDULULUDLLDURRRURDRLRLLRLDDLURRDLUUDLULRDULDRDLULULULDDLURULLULUDDRRULULULRDULRUURRRUDLRLURDRURDRRUDLDDUURDUUDLULDUDDLUUURURLRRDLULURDURRRURURDUURDRRURRDDULRULRRDRRDRUUUUULRLUUUDUUULLRRDRDULRDDULDRRULRLDLLULUUULUUDRDUUUDLLULDDRRDULUURRDUULLUUDRLLDUDLLLURURLUDDLRURRDRLDDURLDLLUURLDUURULLLRURURLULLLUURUUULLDLRDLUDDRRDDUUDLRURDDDRURUURURRRDLUDRLUULDUDLRUUDRLDRRDLDLDLRUDDDDRRDLDDDLLDLULLRUDDUDDDLDDUURLDUDLRDRURULDULULUDRRDLLRURDULDDRRDLUURUUULULRURDUUDLULLURUDDRLDDUDURRDURRUURLDLLDDUUDLLUURDRULLRRUUURRLLDRRDLURRURDULDDDDRDD
LLRUDRUUDUDLRDRDRRLRDRRUDRDURURRLDDDDLRDURDLRRUDRLLRDDUULRULURRRLRULDUURLRURLRLDUDLLDULULDUUURLRURUDDDDRDDLLURDLDRRUDRLDULLRULULLRURRLLURDLLLRRRRDRULRUDUDUDULUURUUURDDLDRDRUUURLDRULDUDULRLRLULLDURRRRURRRDRULULUDLULDDRLRRULLDURUDDUULRUUURDRRLULRRDLDUDURUUUUUURRUUULURDUUDLLUURDLULUDDLUUULLDURLDRRDDLRRRDRLLDRRLUDRLLLDRUULDUDRDDRDRRRLUDUDRRRLDRLRURDLRULRDUUDRRLLRLUUUUURRURLURDRRUURDRRLULUDULRLLURDLLULDDDLRDULLLUDRLURDDLRURLLRDRDULULDDRDDLDDRUUURDUUUDURRLRDUDLRRLRRRDUULDRDUDRLDLRULDL`.split("\n");

var ex1 = `ULL
RRDDD
LURDL
UUUUD`.split("\n");

var init = function(){
    curX = 0;
    curY = 2;
    keys = [];
};

var doit = function(input){
    init();
    _.each(input, function(i){ 
        keys.push(getNext(i));
        console.log(keys);
    });
};

var getNext = function(line){
    for(i = 0; i < line.length; i++){
        switch(line[i]){
            case "L" : curX = Math.max(getMinPos(curY), curX-1); break;
            case "U" : curY = Math.max(getMinPos(curX), curY-1); break;
            case "R" : curX = Math.min(getMaxPos(curY), curX+1); break;
            case "D" : curY = Math.min(getMaxPos(curX), curY+1); break;
        }
        console.log(line[i], curX, curY);
    }
    return getKey(curX, curY);
};

var getMinPos = function(p){
    if(p == 0 || p == 4) return 2;
    if(p == 1 || p == 3) return 1;
    if(p == 2) return 0;
}

var getMaxPos = function(p){
    if(p == 0 || p == 4) return 2;
    if(p == 1 || p == 3) return 3;
    if(p == 2) return 4;
}

var getKey = function(x,y){
    if(x == 2 && y == 0) return 1;
    if(x == 1 && y == 1) return 2;
    if(x == 2 && y == 1) return 3;
    if(x == 3 && y == 1) return 4;
    if(x == 0 && y == 2) return 5;
    if(x == 1 && y == 2) return 6;
    if(x == 2 && y == 2) return 7;
    if(x == 3 && y == 2) return 8;
    if(x == 4 && y == 2) return 9;  
    if(x == 1 && y == 3) return "A";
    if(x == 2 && y == 3) return "B";
    if(x == 3 && y == 3) return "C";
    if(x == 2 && y == 4) return "D";
};


