var TV = function() {
  this.findShow = function(show) {
    // The following URL can be used to search the TV Maze API for a given show
    var URL = "http://api.tvmaze.com/singlesearch/shows?q=" + show;
    return URL;
  };
  this.findActor = function(actor) {
    var URL = "http://api.tvmaze.com/search/people?q=" + actor;
  return URL;
  };
};

module.exports = TV;
