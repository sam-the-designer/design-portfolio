var maxMoveSpace = 40;
var dotPlacement = 0;
var colors = ["#E0DCD9", "#428BA7", "#BE3F3E"];
var snackArray = [];
var resultArray = [];
var logoArray = [];
var chosenColor="";
var topSpacer=0;
var aMoveDot = $('.moveDot');
var aPageContainer = $('.page-container');
var aFilledDot = $('#filled-dot');

/* --- only need the shuffle if later need the unspliced snack array --- 

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    // swap elements array[i] and array[j]
    [array[i], array[j]] = [array[j], array[i]];
  }
}

*/

/* --- TODO ---- 

-- COMBINE THE LOAD ARRAYS & set functions INTO ONE FUNCTION(S) WITH PARAMS
-- use shuffle instead of splicing to handle case where there aren't enough images in the folder
-- load all LOADS and SETS before page load
-- consider NPM Glob instead of ajax for getting images from file

*/

function setBkg(){
  chosenColor = colors[Math.floor(Math.random()*colors.length)];
  $('body').css("background", chosenColor);
}

function setTeeth(){
  topSpacer = "-" + $('.topteeth').height();
  $('.topteeth').css("margin-top", topSpacer+"px");
  console.log("teeth loaded");
}

function loadSnackArray(callback){
  $.ajax({
      url : "/images/snacks/",
      success: function (data) {
        while(snackArray.length<8){
          $(data).find("a").each(function(){
            if($(this).attr("href").match(/\.(svg)$/) )
            {
              snackArray.push($(this).attr("href"));
            }
        })
        }
        console.log("snack array loaded");
        return callback();
      }      
  });
}

function loadResults(){
  $.ajax({
      url : "./images/results/",
      success: function (data) {
        $(data).find("a").each(function(){
          if($(this).attr("href").match(/\.(svg)$/) )
          {
            resultArray.push($(this).attr("href"));
          }
        });
      }      
  });  console.log("results loaded");
}

function loadLogoArray(callback){
  $.ajax({
      url : "images/logos/",
      success: function (data) {
        $(data).find("a").each(function(){
          if($(this).attr("href").match(/\.(svg)$/) )
          {
            logoArray.push($(this).attr("href"));
          }
          
        })
        return callback();
      }      
  });
}

function setSnacks(){
  $('.snack-item').each(function(){
    var chosenSnack = snackArray.splice(Math.floor(Math.random()*snackArray.length), 1);
    $(this).attr("src","images/snacks/"+chosenSnack[0]);
  });
}

function setLogo(){
  chosenLogo = logoArray[Math.floor(Math.random()*logoArray.length)];
  $('.logo').attr("src", "../images/logos/"+chosenLogo);
  console.log("logo loaded");
}

function init(){
  loadSnackArray(setSnacks);
  loadResults();
  loadLogoArray(setLogo);
  setBkg();
  setTeeth();
}

$(document).on('click', 'a[href^="#"]', function(e){
  var p = $.attr(this, 'href');
  aFilledDot.addClass("smoothDot"); /* add the smooth move duration */
  /* move the dot to the place that was clicked and move the page */
  e.preventDefault();
  if(p=="#pageOne"){
    aMoveDot.css("top", "0px");
    $('html, body, .page-container').animate({scrollTop: ($(p).offset().top)*0.8},400);
    aFilledDot.removeClass("smoothDot");
    console.log("moved from two to one");
  }
  else{
    aMoveDot.css("top", "40px");
    aPageContainer.animate({scrollTop: ($(p).offset().top)*0.9},400);
    aFilledDot.removeClass("smoothDot");
    console.log("moved from one to two");
  }
});

function openTeeth(thisObj){
  var chosenResult=resultArray[Math.floor(Math.random()*resultArray.length)];
  $('.snack-item', thisObj).attr("src","images/results/"+chosenResult);
  $('.snack-item', thisObj).addClass("result-item");
  $('.snack-item', thisObj).removeClass("snack-item");
  $('.topteeth', thisObj).css("transform", "translateY(0px)");
  $('.bottomteeth', thisObj).css("transform", "translateY(0px)");
  $(thisObj).off('click');
  $('.topteeth', thisObj).css("visibility", "hidden");
  $('.bottomteeth', thisObj).css("visibility", "hidden");
}

function closeTeeth(thisObj, callback){
  var topAmount = -topSpacer-4;
  var moveTopY = "translateY("+ topAmount+"px)";
  var bottomAmount = -($('.bottomteeth').height()-2);
  var moveBottomY = "translateY("+ bottomAmount+"px)";
  $('.topteeth', thisObj).css("transform", moveTopY);
  $('.bottomteeth', thisObj).css("transform", moveBottomY);
  setTimeout(function(){ callback(thisObj);}, 500);
  /*$('.topteeth',thisObj).css("animation-name", "topTeethAnimation");
  $('.bottomteeth',thisObj).css("animation-name", "bottomTeethAnimation");
  callback(thisObj);*/
};

$(".snack").on('click', function(){
  $('.topteeth', $(this)).css("visibility", "visible");
  $('.bottomteeth', $(this)).css("visibility", "visible");
  closeTeeth($(this), openTeeth);
});


aPageContainer.scroll(function(){
/*
move the dot the distance the user scrolled 
proportionally within the space
and in the direction of the scroll.
*/

/* determine amount of scroll */
  var currentScrollTop = $(this).scrollTop();

/* calculate proportional move amount */
  dotPlacement = (currentScrollTop / ($(window).height()*0.8))*maxMoveSpace;

/* move the dot the amount that was scrolled in the correct direction */
  aMoveDot.css({'top': dotPlacement});

});
window.onload = init();
window.onresize = function(){
  setTeeth();
};

