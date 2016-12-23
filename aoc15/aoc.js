var discs = [
    {n: 1, p:7, s:0},
    {n: 2, p:13, s:0},
    {n: 3, p:3, s:2},
    {n: 4, p:5, s:2},
    {n: 5, p:17, s:0},
    {n: 6, p:19, s:7},
    {n: 7, p:11, s:0}
];

var results = [];

var isValid = function(t,s,n,p){
    return ((t+s+n) % p == 0) ? true : false;
}
_.each(_.range(0, 30000000), function(t){
    var success = true;
   _.each(discs, function(d){
      var valid = isValid(t,d.s,d.n,d.p); 
      success &= valid;
   });
   if(success){
       console.log(t);
   }
});