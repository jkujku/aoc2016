var salt = "yjdafjpo";
//var salt = "abc";
var alphabet = "0123456789abcdef";
var keys = [];
var indizes = [];
var waitingkeys = [];

var contains = function(str, seg){
    return str.indexOf(seg) > -1;
};

var repeat = function(char, times){
    var result = "";
    _.each(_.range(0,times), function(){
        result += char;
    });
    return result;
};

var getTriple = function(hash){
    return getRepeated(hash, 3);
};

var getPentiple = function(hash){
    return getRepeated(hash, 5);
};

var getRepeated = function(hash, times){
    var collect = [];
    for(var i=0; i<16; i++){
        var repeated = repeat(alphabet[i], times);
        if(contains(hash, repeated)){
            collect.push({index: hash.indexOf(repeated), repeated:repeated});
        }
    }
    collect = _.sortBy(collect, function(c){
       return c.index; 
    });
    if(collect.length > 1){
        console.log("found multiple", collect);
    }
    return (collect.length > 0) ? (collect[0]).repeated : null;
};

var hash = function(str){
    var rhash = str;
    for(var h=0;h<2017;h++){
        rhash = Crypto.MD5(rhash);
    }
    return rhash;  
};

var getNext = function(index){
    return hash(salt+index);
};

var doit = function(){
    _.each(_.range(0,50000), function(index){
        var hash = getNext(index);
        var trpl = getTriple(hash);
        var pntpl = getPentiple(hash);
        if(pntpl){
            console.log(index, hash, pntpl);
            var sbstr = pntpl.substring(0,3);
            if(waitingkeys[sbstr]){
                console.log("found waiting key:", waitingkeys[sbstr].join(","), pntpl);
                _.each(waitingkeys[sbstr], function(k){
                    if(k > (index-1000)){
                        console.log("found waiting key nearby:", k, pntpl);
                        keys.push({firstindex:k, secondindex:index});
                    }
                });
                waitingkeys[sbstr] = undefined;
            }else{
                waitingkeys[sbstr] = [index];
            }
        }
        if(trpl){
            console.log(index, hash, trpl);
            if(waitingkeys[trpl]){
                waitingkeys[trpl].push(index);
            }else{
                waitingkeys[trpl] = [index];  
            }
        }
        
    });  

    console.log(keys);
    keys = _.sortBy(keys, function(k){
        return k.firstindex;
    });
    _.pluck(keys,'firstindex').join("\n");
};

doit();