#!/usr/bin/env node
var package = require('../package.json');
var argv = require('yargs')
    .usage('reddit CLI v' + package.version + '\nUsage: $0 -r [subreddit] -l [limit]')
    .example('$0 -r node -l 1', 'show one post in /r/node')
    .describe('f', 'Show frontpage')
    .describe('r', 'Show subreddit')
    .describe('l', 'Limit of posts')
    .alias('r', ['sub', 'subreddit'])
    .alias('l', 'limit')
    .alias('f', 'frontpage')
    .demand('l')
    .argv;
var Snoocore = require('snoocore');
var chalk = require('chalk');
var reddit = new Snoocore({ userAgent: 'Node CLI /u/ZucchiniZe v'+package.version });
var subreddit = argv.r;
var limit = argv.l;

function listPost(data){
  for(var i=0; i < data.children.length ;i++){
    var post = data.children[i].data;
    console.log(chalk.yellow('post #%d'), i+1);
    console.log(chalk.cyan('title:'), post.title);
    console.log(chalk.green('author:'), post.author);
    if(post.domain === 'self.' + post.subreddit) {
      console.log(chalk.yellow('type:'), 'selfpost');
      console.log(chalk.blue('self:'), post.selftext);
    } else {
      console.log(chalk.yellow('type:'), 'link');
      console.log(chalk.blue('url:'), post.url);
    }
    if(post.link_flair_text !== null){
      console.log(chalk.green('flare:'), post.link_flair_text);
    }
    if(argv.f === true) {
      console.log(chalk.cyan('subreddit:'), post.subreddit);
    }
    console.log(chalk.red('score:'), post.score);
    console.log(chalk.magenta('id:'), post.id);
    console.log(chalk.bold.bgBlue('           '));
  }
}

if(argv.r !== undefined){
  reddit('/r/$subreddit/hot').listing({
    $subreddit: subreddit,
    limit: limit
  }).then(function(data){
    listPost(data);
  });
}

if(argv.f === true) {
  reddit.raw('https://www.reddit.com/.json').listing({
    limit: limit
  }).then(function(data){
    listPost(data);
  });
}