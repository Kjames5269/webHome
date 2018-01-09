
var chArr = new Array();
var user;
var mangaName;

function prepChapter(manga, chapters, first) {
	var request = new XMLHttpRequest();
	
	if(!chapters.chId) {
		return;
	}
	
	request.open('GET', 'http://www.mangaeden.com/api/chapter/' + chapters.chId, true);
	request.onreadystatechange = function(){
		if (request.readyState === 4 && request.status === 200){
			var response = JSON.parse(request.response);
			var images = response.images.reverse();
			//console.log(response);
			var imgs = [];
			images.forEach(function (e) {
				var a = new Image();
				a.src = "https://cdn.mangaeden.com/mangasimg/" + e[1];
				a.alt = e[0];
				if(parseInt(e[2]) > 1569) {
					a.classList.add("largePage");
				}
				imgs.push(a);
			});

			var str = manga.name.replace(/-/g, ' ') + " -- Chapter " + chapters.ch + " : " + chapters.chName;
			var button = "<button class=\"footer\" onclick=\"getNext()\" value=\"" + user + "_"
			+ manga.name + "\" name=\"query\">Next chapter of " + manga.name.replace(/-/g, ' ') +"</button>";

			chArr.push( { name: manga.name, chapter: chapters.chName, title: str, button: button, imgs: imgs } );
			if(first) {
				populateChapter(manga.name);
			}
		}
	};
	request.send();
}

function prep(first) {
	var request = new XMLHttpRequest();
	request.open('GET', 'https://neatmangareader.appspot.com/getChapter/' + user +'/' + mangaName, true);
	request.onreadystatechange = function() {
		if (request.readyState === 4 && request.status === 200){
			var manga = JSON.parse(request.response);
			console.log(manga);
			if(first)
				prepChapter(manga, manga.currCh, first);
			prepChapter(manga, manga.nextCh);
		}// else if (request.readyState === 4 && request.status === 200) {
			// document.getElementById("Title").innerHTML = request.response;
		//}
	}
request.send();
}

function getNext() {
	prep(false);
	populateChapter();
}

function populateChapter(chNum) {
	var chapter;
	if(chNum) {
		chapter = (chArr[0].chapter == chNum) ? chArr.shift() : chArr.pop();
	}
	else {
		var chapter = chArr.shift();
	}
	var doc = document.getElementById("mangaReader");
	var title = document.getElementById("Title");
	
	doc.innerHTML = "";
	title.innerHTML = "The next chapter is not out yet";
	
	if(chapter) {

		title.innerHTML = chapter.title;

		chapter.imgs.forEach(function (e) {
			doc.appendChild(e);
		});
		var next = document.getElementById("nextChapter");
		next.innerHTML = chapter.button;
	}
	scroll(0,0);

}

// -------------------- Functions End ------------------------------ //

var url = location.href;
if(!url.includes('?')) {
	document.getElementById("mangaReader").innerHTML = "No Chapter found";
}
else {
//  Horribly bad but w.e.

	var vars = url.substring(url.indexOf("?")+1);
	var arr = vars.split("=");

//  I can't even begin to comprehend how bad this is
	var spagetti = arr[1].split("_");
	user = spagetti[0];
	mangaName = spagetti[1];

	prep(true);
}