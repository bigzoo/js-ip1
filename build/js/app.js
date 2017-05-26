(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "2174c070df9ed743f270ceea45b0a24ce9fcdac6";

},{}],2:[function(require,module,exports){
var apiKey = require('./../.env').apiKey;

Hubgit = function() {};

HubgitRepos = function() {};

Hubgit.prototype.getHubgit = function(userName, displayName) {
  $('#display').empty();
  $('#email').empty();
  $.get('https://api.github.com/users/' + userName + '?access_token=' + apiKey).then(function(response) {
    displayName(response.name,response.email);
    //console.log(response);
  }).fail(function(error) {
    $('#display').text(error.response.message);

  });
};

HubgitRepos.prototype.getHubgit = function(userName, displayRepos) {
  var i;
  $('#displayRepos').empty();
  $('#reposHeader').hide();
  $.get('https://api.github.com/users/' + userName + '/repos?access_token=' + apiKey).then(function(response) {
    console.log(response);
    for (i = 0; i < response.length; i++) {
      if (response[i].description===null){
        response[i].description = 'No description in repo';
      }
      $('#reposHeader').show();
      displayRepos(response[i].name,response[i].description,response[i].created_at);
    }
  }).fail(function(error) {
    $('#display').text(error.response.message);
  });
};

exports.hubgitModule = Hubgit;
exports.HubgitReposModule = HubgitRepos;

},{"./../.env":1}],3:[function(require,module,exports){
var Hubgit = require('./../js/hubgit.js').hubgitModule;
var HubgitRepos = require('./../js/hubgit.js').HubgitReposModule;

var displayName = function(user,email) {
  if (user===null) {
    $('#display').text("The users has no name in profile");
  }
  $('#display').text("You are viewing " + user+"'s profile.");
  $('#email').text("Email address: " + email);
};

var displayRepos = function (repoName,repoDescription,creationDate) {
  var $time = moment(creationDate).format('LLL');
  //moment().format('H:mm');
  $('#displayRepos').append("<li><h4>"+repoName+"</h4><br>"+repoDescription+"<br> Date of creation: "+$time+"</li>");
};

$(document).ready(function() {
  $('#reposHeader').hide();
  var currentHubgitObject = new Hubgit();
  var currentHubgitReposObject = new HubgitRepos();
  $('#submitUserName').click(function() {
    var userName = $('#userName').val();
    $('#userName').val("");
    currentHubgitObject.getHubgit(userName, displayName);
    currentHubgitReposObject.getHubgit(userName,displayRepos);
  });
});

},{"./../js/hubgit.js":2}]},{},[3]);
