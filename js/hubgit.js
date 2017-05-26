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
