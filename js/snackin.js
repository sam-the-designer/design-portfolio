var resultArray = ["images/fears/fear-1.svg", "images/fears/fear-2.svg", "images/fears/fear-3.svg", "images/fears/fear-4.svg"];
var snackFills = ["a","b","c","d","e","f"];
var goneArray = ["images/snacks/gone-1.svg", "images/snacks/gone-2.svg", "images/snacks/gone-3.svg", "images/snacks/gone-4.svg"]
var chosenResult="";
var chosenFill="";
var fearAnswer = document.getElementById("fear");


function imgToSVG(){
$(document).ready(function(){
    jQuery('img.svg').each(function(){
            var $img = jQuery(this);
            var imgID = $img.attr('id');
            var imgClass = $img.attr('class');
            var imgURL = $img.attr('src');

            jQuery.get(imgURL, function(data) {
                // Get the SVG tag, ignore the rest
                var $svg = jQuery(data).find('svg');

                // Add replaced image's ID to the new SVG
                if(typeof imgID !== 'undefined') {
                    $svg = $svg.attr('id', imgID);
                }
                // Add replaced image's classes to the new SVG
                if(typeof imgClass !== 'undefined') {
                    $svg = $svg.attr('class', imgClass+' replaced-svg');
                }

                // Remove any invalid XML tags as per http://validator.w3.org
                $svg = $svg.removeAttr('xmlns:a');

                // Replace image with new SVG
                $img.replaceWith($svg);

            }, 'xml');

        });
	});
}


function setImage(){
  chosenResult = resultArray[Math.floor(Math.random()*resultArray.length)];
  fearAnswer.setAttribute('src', chosenResult);
}

function hideForm(){
	document.getElementById("fearForm").setAttribute('style', 'display:none');
	document.getElementById("pageHead").setAttribute('style', 'display:none');
}

function showFear(){
	document.getElementById("fear").setAttribute('height', '400');
	document.getElementById("fear").setAttribute('width', '400');
	document.getElementById("theShame").style.display="block";
}

function giveShame(){
	hideForm();
	showFear();
}

function loadSnacks(){
	var snackArray = document.getElementsByClassName("snack");

	for (var i = 0; i < snackArray.length; i++) {
		
		var randoFill = snackFills[Math.floor(Math.random()*snackFills.length)];
		randoFill += snackFills[Math.floor(Math.random()*snackFills.length)];

        var allPaths = snackArray[i].getElementsByTagName('path');
  		
  		for(var p=0; p<allPaths.length; p++){
  			allPaths[p].style.fill="#"+randoFill+"609a";
  		} 

        snackArray[i].style.display = "inline";
    }
}



function makeGone(theSnack){ //theSnack is an id

	//hide until finished
	document.getElementById(theSnack).style.visibility = "hidden";
	//clear snack
	document.getElementById(theSnack).innerHTML = "";
	//choose gone image
	var gone = goneArray[Math.floor(Math.random()*goneArray.length)];
	//set image
	document.getElementById(theSnack).innerHTML="<img class='svg gone' src="+gone+">";
	//change to svg tags
	imgToSVG(snackFills);
}

function eatSnack(theSnack){
	makeGone(theSnack);
	setTimeout(changeColor, 100, theSnack);
}


function changeColor(theSnack){
	//choose color
	var r = snackFills[Math.floor(Math.random()*snackFills.length)];
	r += snackFills[Math.floor(Math.random()*snackFills.length)];
	//set color
    var p = document.getElementById(theSnack).getElementsByTagName('path');
  	for(var i=0; i<p.length; i++){
  		p[i].style.fill="#62"+r+"e3";
  	}
  	document.getElementById(theSnack).style.visibility = "visible";
}
	

function changeContent(evt, showMe){
    loadSnacks();
    var i;
    var x = document.getElementsByClassName("contentBlock");
    var pageli = document.getElementsByClassName("page-link");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    for (i = 0; i < pageli.length; i++) {
        pageli[i].className = pageli[i].className.replace(" active", "");
  	}
    
    document.getElementById(showMe).style.display = "block";
    evt.currentTarget.className += " active"; 
}

window.onload = setImage();

