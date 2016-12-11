var input = `rect 1 1
row 0 6
rect 1 1
row 0 3
rect 1 1
row 0 5
rect 1 1
row 0 4
rect 2 1
row 0 5
rect 2 1
row 0 2
rect 1 1
row 0 5
rect 4 1
row 0 2
rect 1 1
row 0 3
rect 1 1
row 0 3
rect 1 1
row 0 2
rect 1 1
row 0 6
rect 4 1
row 0 4
column 0 1
rect 3 1
row 0 6
column 0 1
rect 4 1
column 10 1
row 2 16
row 0 8
column 5 1
column 0 1
rect 7 1
column 37 1
column 21 2
column 15 1
column 11 2
row 2 39
row 0 36
column 33 2
column 32 1
column 28 2
column 27 1
column 25 1
column 22 1
column 21 2
column 20 3
column 18 1
column 15 2
column 12 1
column 10 1
column 6 2
column 5 1
column 2 1
column 0 1
rect 35 1
column 45 1
row 1 28
column 38 2
column 33 1
column 28 1
column 23 1
column 18 1
column 13 2
column 8 1
column 3 1
row 3 2
row 2 2
row 1 5
row 0 1
rect 1 5
column 43 1
column 31 1
row 4 35
row 3 20
row 1 27
row 0 20
column 17 1
column 15 1
column 12 1
column 11 2
column 10 1
column 8 1
column 7 1
column 5 1
column 3 2
column 2 1
column 0 1
rect 19 1
column 20 3
column 14 1
column 9 1
row 4 15
row 3 13
row 2 15
row 1 18
row 0 15
column 13 1
column 12 1
column 11 3
column 10 1
column 8 1
column 7 1
column 6 1
column 5 1
column 3 2
column 2 1
column 1 1
column 0 1
rect 14 1
row 3 47
column 19 3
column 9 3
column 4 3
row 5 5
row 4 5
row 3 8
row 1 5
column 3 2
column 2 3
column 1 2
column 0 2
rect 4 2
column 35 5
column 20 3
column 10 5
column 3 2
row 5 20
row 3 30
row 2 45
row 1 30
column 48 5
column 47 5
column 46 3
column 45 4
column 43 5
column 42 5
column 41 5
column 38 1
column 37 5
column 36 5
column 35 1
column 33 1
column 32 5
column 31 5
column 28 5
column 27 5
column 26 5
column 17 5
column 16 5
column 15 4
column 13 1
column 12 5
column 11 5
column 10 1
column 8 1
column 2 5
column 1 5`.split("\n");

var output, cmds;

var init = function(){
    var str = "";
    _.each(_.range(0,49), function(i){ str += "0"; });
    output = [str,str,str,str,str,str];
    cmds = _.map(input, function(line){
       return getFunction(line); 
    });
};

var getFunction = function(line){
    var parts = line.split(" ");
    var x = parseInt(parts[1], 10);
    var y = parseInt(parts[2], 10);
    switch(parts[0]){
        case "rect": return function(){ rect(x,y); }; break;
        case "column": return function(){ column(x,y); }; break;
        case "row": return function(){ row(x,y); }; break;
    }
}

var rect = function(x,y){
    console.log("rect",x,y);
    for(r=0;r<y;r++){
        var on = ""; 
        for(c=0;c<x;c++){
            on += "1";
        }
        output[r] = on + output[r].substring(x);
    }
}

var row = function(x,y){
    console.log("row",x,y);
    output[x] = output[x].substring(49-y) + output[x].substring(0,49-y) ;
}

var column = function(x,y){
    console.log("column",x,y);
    var col = [
        output[0][x],
        output[1][x],
        output[2][x],
        output[3][x],
        output[4][x],
        output[5][x]
    ];
    console.log(col);
    output[0] = output[0].substring(0,x) + col[(0-y+6)%6] + output[0].substring(x+1);
    output[1] = output[1].substring(0,x) + col[(1-y+6)%6] + output[1].substring(x+1);
    output[2] = output[2].substring(0,x) + col[(2-y+6)%6] + output[2].substring(x+1);
    output[3] = output[3].substring(0,x) + col[(3-y+6)%6] + output[3].substring(x+1);
    output[4] = output[4].substring(0,x) + col[(4-y+6)%6] + output[4].substring(x+1);
    output[5] = output[5].substring(0,x) + col[(5-y+6)%6] + output[5].substring(x+1);
}

var show = function(lights){
    console.log(lights.join("\n"));
}

var doit = function(){
    init();
    for(i=0; i<cmds.length; i++){    
        cmds[i]();
        show(output);
    }
    var count = 0;
    for(r=0; r<6; r++){    
        for(c=0; c<50; c++){    
            if(output[r][c] == "1") count++;
        }
    }
    console.log(count);
};



doit();