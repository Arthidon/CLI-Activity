// NODE PACKAGES
var TV = require("./tv");
var axios = require("axios");
var fs = require("fs");

// FUNCTIONS
function createLog (data) {
    data = data + "\n";
    fs.appendFile("./log.txt", data, function(err) {

        if (err) {
            console.log(err);
        }
    });
}

function actor () {
    console.log("Searching for TV Actor");
    queryURL = tv.findActor(term);

    axios.get(queryURL).then(
        function(response){
            var data = response.data[0].person;
            console.log(data);
            output = [
                "Name: " + data.name,
                "Birthday: " + data.birthday,
                "Gender: " + data.gender,
                "Country: " + data.country.name,
                "Maze URL: " + data.url,
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
            ].join("\n\n");

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

// VARIABLES

// Create a new TV object
var tv = new TV();

var search = process.argv[2];
var term = process.argv.slice(3).join(" ");
var searchString = search + " " + term;

// send user input to log.txt
createLog(searchString);

// If no user input is given, set defaults
if (!search) {
  search = "show";
}

if (!term) {
  term = "Andy Griffith";
}

// Check for search command given and run appropriate function
switch(search) {
                
    case "actor":
        actor(term);
        break;

    case "show":
       show(term);
        break;
}