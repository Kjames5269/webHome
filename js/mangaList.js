
var mangaDiv = document.getElementById('mangaList');
var user = "kjames";

var request = new XMLHttpRequest();
request.open('GET', 'https://neatmangareader.appspot.com/' + user, true);
request.onreadystatechange = function(){
	if (request.readyState === 4 && request.status === 200 ) {
	  var response = JSON.parse(request.response)
	  console.log(response);
	  var manga = response.forEach(function(e) {
		mangaDiv.innerHTML += "<button type=\"submit\" value=\"" + user + "_"
		+ e.name + "\" name=\"query\">" + e.name.replace(/-/g, ' ') +"</button>";
	  });
	}
};
request.send();

var usr = document.getElementById('userId');
usr.value = user;
