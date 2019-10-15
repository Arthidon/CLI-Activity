// NODE PACKAGES
var TV = require("./tv");
var axios = require("axios");
var fs = require("fs");

function createLog (data) {
    data = data + "\n";
    fs.appendFile("./log.txt", data, function(err) {

        if (err) {
            console.log(err);
        }
    });
}

// FUNCTIONS
function actor () {
    console.log("Searching for TV Actor");
}

function show () {
    console.log("Searching for TV Show");
    queryURL = tv.findShow(term);
    
    axios.get(queryURL).then(
        function(response) {
            var data = response.data;
            output = [
                "Name: " + data.name,
                "Genre: " + data.genres[0],
                "Rating: " + data.rating.average,
                "Network: " + data.network.name,
                "Summary: " + data.summary
            ].join("\n\n")

            console.log(output);
            createLog(output);
        }
    ).catch(function(error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("---------------Data---------------");
          console.log(error.response.data);
          console.log("---------------Status---------------");
          console.log(error.response.status);
          console.log("---------------Status---------------");
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an object that comes back with details pertaining to the error that occurred.
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
    });        
    
}

// Create a new TV object
var tv = new TV();

var search = process.argv[2];
var term = process.argv.slice(3).join(" ");
var searchString = search + " " + term;

createLog(searchString);

if (!search) {
  search = "show";
}

if (!term) {
  term = "Andy Griffith";
}

switch(search) {
                
    case "actor":
        actor(term);
        break;

    case "show":
       show(term);
        break;
}