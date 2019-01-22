function average(scores){
    var total=0;
        for(var i=0; i<scores.length;i++){
            total=total+scores[i];
        }
        var avg=Math.round(total/(scores.length));
    console.log(avg);
}

var scores1=[90,98,89,100,100,86,94];
average(scores1);
var scores2=[40,65,77,82,80,54,73,63,95,49];
average(scores2);