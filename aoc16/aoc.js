var input = '11110010111001001';
var discspace = 35651584;

var result = "";
var checksum = 0;
var partitions = [];

var reverse = function(input){
    return input.split("").reverse().join("");
};

var flip = function(input){
    return input.replace(/1/g,"x").replace(/0/g, "1").replace(/x/g, "0");
};

var double = function(input){
    return input + "0" + flip(reverse(input));
};

var trim = function(input, length){
    return input.substring(0, length);  
};

var sum = function(input){
    var result = "";
	for(i=0; i < input.length; i+=2){
	    result += (input[i] === input[i+1]) ? "1" : "0";
    }
    return result;
};

var doit = function(){
    result = input;
    while(result.length < discspace){
        result = double(result);
    }
    result = trim(result, discspace);
    console.log(result.length);

	for(i=0;i<discspace;i+=2097152){
		partitions.push(result.substring(i, i+2097152));
	}

	result = "";
	console.log(partitions.length);
	console.log(partitions[0].length);
	console.log(partitions[16].length);

	for(p=0; p< partitions.length; p++){
		var partchecksum = sum(partitions[p]);
		while(partchecksum.length % 2 == 0){
			partchecksum = sum(partchecksum);
		}
		checksum += partchecksum;
		console.log(partchecksum);
	}
    

    //console.log(result);
    console.log(checksum);
};

doit();