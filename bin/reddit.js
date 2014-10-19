#!/usr/bin/env node

var Snoocore = require('snoocore');
var chalk = require('chalk');
var argv = require('yargs').argv;
var package = require('../package.json');
var reddit = new Snoocore({ userAgent: 'Node CLI /u/ZucchiniZe v'+package.version });
var subreddit = argv.r || argv.sub || argv.subreddit;
var limit = argv.l || argv.limit || 5;

if(argv.r !== undefined){
  reddit('/r/$subreddit/hot').listing({
    $subreddit: subreddit,
    limit: limit
  }).then(function(data){
    console.log('');
    for(var i=0; i < data.children.length ;i++){
      var post = data.children[i].data;
      console.log(chalk.yellow('post #%d'), i+1);
      console.log(chalk.cyan('title:'), post.title);
      console.log(chalk.green('author:'), post.author);
      console.log(chalk.blue('url:'), post.url);
      console.log(chalk.red('score:'), post.score);
      console.log(chalk.magenta('id:'), post.id);
      console.log('');
    }
  });
}

if(argv.f === true) {
  reddit.raw('https://www.reddit.com/.json').listing({
    limit: limit
  }).then(function(data){
    console.log('');
    for(var i=0; i < data.children.length ;i++){
      var post = data.children[i].data;
      console.log(chalk.yellow('post #%d'), i+1);
      console.log(chalk.cyan('title:'), post.title);
      console.log(chalk.green('author:'), post.author);
      console.log(chalk.blue('url:'), post.url);
      console.log(chalk.red('score:'), post.score);
      console.log(chalk.magenta('id:'), post.id);
      console.log('');
    }
  });
}