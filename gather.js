var argv = require('yargs').argv;
var Snoocore = require('snoocore');
var reddit = new Snoocore({ userAgent: 'Node CLI /u/ZucchiniZe' });
var subreddit = argv.r;
var limit = argv.l || 20;

if(argv.r !== undefined){
  reddit('/r/$subreddit/hot').listing({
    $subreddit: subreddit,
    limit: limit
  }).then(function(data){
    console.log(data.children);
  });
}