function collapse(display) {
  var form = document.getElementById("hiddenForm")

  for( var i = 0; i < form.children.length; i++) {
	form.children[i].style.display = display;
  }
}

var expand = false;

function toggleHidden() {
  var cont = document.getElementById("container");

  if(expand) {
	expand = false;
	collapse("none");
  }
  else {
	expand = true;
	collapse("block");
  }
}