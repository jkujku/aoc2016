var input = `cpy 1 a
cpy 1 b
cpy 26 d
jnz c 2
jnz 1 5
cpy 7 c
inc d
dec c
jnz c -2
cpy a c
inc a
dec b
jnz b -2
cpy c b
dec d
jnz d -6
cpy 16 c
cpy 17 d
inc a
dec d
jnz d -2
dec c
jnz c -5`.split("\n");

var example = `cpy 41 a
inc a
inc a
dec a
jnz a 2
dec a`.split("\n");

var istr = [];
var rgs = {a:0, b:0, c:0, d:0};
var result = 0;
var nextcmd = 0;

var getValue = function(x){
	if(_.isNaN(parseInt(x, 10))){
		return rgs[x];
	}else{
		return parseInt(x, 10);
	}
};

var cpy = function(x, r){
    rgs[r] = getValue(x);
    return nextcmd+1;
};

var inc = function(r){
    rgs[r] = rgs[r] + 1;    
    return nextcmd+1;
};

var dec = function(r){
    rgs[r] = rgs[r] - 1;    
    return nextcmd+1;
};

var jnz = function(c, d){
    if(getValue(c) != 0){
        return nextcmd + getValue(d);        
    }else{
    	return nextcmd+1;
    }
};

var doit = function(input){
    cmds = _.map(input, function(line){
        var cmd = line.split(" ");
        if(cmd.length == 2){
            cmd = cmd[0]+"('"+cmd[1]+"')";
        }else{
            cmd = cmd[0]+"('"+cmd[1]+"','"+cmd[2]+"')";
        }
        return cmd;
    });  
    _.each(cmds, function(c){
        //console.log(c);
    });
    
    var step = 0;
    while(nextcmd <= input.length){    	
        var cmd = cmds[nextcmd];
		//console.log(cmd);
        //console.log(rgs, nextcmd);
        nextcmd = eval(cmd);
        //console.log(rgs, nextcmd);
        step++;
        if(rgs.d == 0 || step == 1000){
        	console.log("d == 0 || step == 1000");
			console.log(step, rgs, nextcmd);
        }
    }
    console.log(rgs);
};

doit(input);