function actor(){

}

function show(){

}

//var axios = require("axios");
var command = process.argv[2];
var searchType = process.argv.slice(3).join(" ");
var searchstring = command + " " + searchType;
console.log(searchstring);

switch(command) {
                
    case "actor":
        actor(searchType);
        break;

    case "show":
       show(searchType);
        break;
}

