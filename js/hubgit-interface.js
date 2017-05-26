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
