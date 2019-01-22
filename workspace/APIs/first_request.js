var request = require("request");
request("https://query.yahooapis.com/v1/public/yql?q=select%20astronomy.sunset%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22maui%2C%20hi%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys", function(error, response, body){
    if(!error && response.statusCode==200){
        var parsedBody = JSON.parse(body);
        console.log("Sunset time in Hawaii is : ")
        console.log(parsedBody["query"]["results"]["channel"]["astronomy"]["sunset"]);
    }
    else{
        console.log("Something went wrong!");
        console.log("We hired a team of highly intelligent monkeys to analyze the issue");
    }
});
