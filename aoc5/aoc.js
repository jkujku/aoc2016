var input = "abbhdwsy";

var example = "abc";

var output;

var init = function(){
    output = [];
};
var isAccepted = function(hash){
    return (hash.substring(0,5) == "00000") && (parseInt(hash.substring(5,6), 10) < 8);
};
var hash = function(str){
    return Crypto.MD5(str);  
};
var letter = function(str){
    return str.substring(6,7);
};
var position = function(str){
    return str.substring(5,6);
};
var doit = function(input){
    init();
    var index = 0;
    _.each(_.range(0,20), function(i){
        var found = false;
        while(!found){
            var hashy = hash(input+index);
            if(isAccepted(hashy)){
                console.log(i, index, hashy);    
                output[position(hashy)] = letter(hashy);
                found = true;
            }
            index++;
        }
        
        console.log(output);
    });
    
    console.log(output.join(""));
   
};

doit(input);