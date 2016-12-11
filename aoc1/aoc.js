var curX, curY, curD, corners;

var raw = "L5, R1, R3, L4, R3, R1, L3, L2, R3, L5, L1, L2, R5, L1, R5, R1, L4, R1, R3, L4, L1, R2, R5, R3, R1, R1, L1, R1, L1, L2, L1, R2, L5, L188, L4, R1, R4, L3, R47, R1, L1, R77, R5, L2, R1, L2, R4, L5, L1, R3, R187, L4, L3, L3, R2, L3, L5, L4, L4, R1, R5, L4, L3, L3, L3, L2, L5, R1, L2, R5, L3, L4, R4, L5, R3, R4, L2, L1, L4, R1, L3, R1, R3, L2, R1, R4, R5, L3, R5, R3, L3, R4, L2, L5, L1, L1, R3, R1, L4, R3, R3, L2, R5, R4, R1, R3, L4, R3, R3, L2, L4, L5, R1, L4, L5, R4, L2, L1, L3, L3, L5, R3, L4, L3, R5, R4, R2, L4, R2, R3, L3, R4, L1, L3, R2, R1, R5, L4, L5, L5, R4, L5, L2, L4, R4, R4, R1, L3, L2, L4, R3";
var ex1 = "R2, L3";
var ex2 = "R2, R2, R2";
var ex3 = "R5, L5, R5, R3";
var ex4 = "R8, R4, R4, R8";

var init = function(){
    curX = 0;
    curY = 0;
    curD = "N";
    corners = ["0-0"];
};

var doit = function(raw){
    init();
    _.each(raw.split(", "), function(i){ 
        move(i[0], parseInt(_.tail(i).join(""), 10));
        console.log(i, curX, curY, curD);
        //console.log(corners);
    });
};

var turn = function(d){
    if(d === "L"){
        switch(curD){
            case "E" : curD = "N"; break;
            case "N" : curD = "W"; break;
            case "W" : curD = "S"; break;
            case "S" : curD = "E"; break;
        }
    } else if(d === "R"){
        switch(curD){
            case "E" : curD = "S"; break;
            case "N" : curD = "E"; break;
            case "W" : curD = "N"; break;
            case "S" : curD = "W"; break;
        }
    }
};

var step = function(l){
    switch(curD){
        case "E" : draw(l, 0, 1); curX += l; break;
        case "N" : draw(0, l, 1); curY += l; break;
        case "W" : draw(l, 0, -1); curX -= l; break;
        case "S" : draw(0, l, -1); curY -= l; break;
    }
};

var draw = function(xl, yl, signed){
    for(i = 1; i <= xl; i++){    
        var corner = "" + (curX + signed*i) + "-" + curY;
        if(_.contains(corners, corner)){
            console.log("visited: ", corner);
        }  
        corners.push(corner);
    }
    for(j = 1; j <= yl; j++){
        var corner = "" + curX + "-" + (curY + signed*j);
        if(_.contains(corners, corner)){
            console.log("visited: ", corner);
        }  
        corners.push(corner);
    }
}

var move = function(d, l){
    turn(d);
    step(l);
};

