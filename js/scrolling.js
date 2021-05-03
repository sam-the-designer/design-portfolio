var maxMoveSpace = 40;
var dotPlacement = 0;
var colors = ["#E0DCD9", "#428BA7", "#BE3F3E"];
// PRE LOAD THE SNACK ARRAY //
var snackArray = ["beer.svg", "cheese.svg", "cigs.svg", "coffee.svg", "wing.svg", "yogurt.svg"];
var resultArray = ["burp.svg", "chomp.svg", "like.svg", "mmmm.svg", "nibble.svg", "sploosh.svg",
"yasss.svg", "yum.svg"];
var logoArray = ["fist.svg", "fuck.svg", "hi.svg", "rock.svg", "shoot.svg"];
var chosenColor="";
var topSpacer=0;
var bottomSpacer=0;
var aMoveDot = $('.moveDot');
var aPageContainer = $('.page-container');
var aFilledDot = $('#filled-dot');
var windowWidth = $(window).width();
const tabletView = 970;
const mobileView = 767;


/* -- TEST LATER --
const express = require('express');
const app = express();
const path = require('path');

// Allow assets directory listings
const serveIndex = require('serve-index'); 
app.use('/images', serveIndex(path.join(__dirname, '/images')));
*/


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
-- CALLBACKS for page load

*/

var browserPrefix="";

navigator.sayswho= (function(){
  var N = navigator.appName, ua = navigator.userAgent, tem;
  var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
  if(M && (tem = ua.match(/version\/([\.\d]+)/i))!= null) M[2] = tem[1];
  M = M? [M[1], M[2]]: [N, navigator.appVersion,'-?'];
  M = M[0];
  if(M == "Chrome") { browserPrefix = "-webkit-"; }
  if(M == "Firefox") { browserPrefix = "-moz-"; }
  if(M == "Safari") { browserPrefix = "-webkit-"; }
  if(M == "MSIE") { browserPrefix = "-ms-"; }
})();

function setBkg(){
  chosenColor = colors[Math.floor(Math.random()*colors.length)];
  $('body').css("background", chosenColor);
}

function setTeeth(){
  topSpacer = "-" + $('.topteeth').height();
  $('.topteeth').css("margin-top", topSpacer+"px");
  bottomSpacer = "-" + $('.bottomteeth').height() - 2;
  $('.bottomteeth').css("bottom", bottomSpacer+"px");
  console.log("teeth loaded. Top spacer is: " + topSpacer);
}

/* -- fix this -- MVP snack array pre-loaded 

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

*/

/* -- fix this -- MVP results array pre-loaded 

function loadResults(){
  $.ajax({
      url : "/images/results/",
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

*/

/* -- fix this -- MVP logo array pre-loaded 

function loadLogoArray(callback){
  $.ajax({
      url : "/images/logos/",
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

*/

function setSnacks(messVisible){
  var time=100;
  var chartOrder=1;
  var messVisible = "none"
  if(!$(".message-ty").css('display') == messVisible){
    $(".message-ty").addClass("show-message").show();
    $(".snack-grid").hide();
  }else{
    $(".message-ty").removeClass("show-message").hide();
    $(".snack-grid").show();
    $(".page-container").scrollTop(0);
  }  
  setTimeout(function(){ 
  $('.snack-item').each(function(){
    //var chosenSnack = snackArray.splice(Math.floor(Math.random()*snackArray.length), 1);
    //var chosenSnack = snackArray[Math.floor(Math.random()*snackArray.length)];
    //$(this).attr("src","images/snacks/"+chosenSnack);
    
      var itemImageSnacks = images.snacks[Math.floor(Math.random()*images.snacks.length)];
      $(this).attr("src",itemImageSnacks);
    
  });
}, 100);

  $('.snack').each(function(){
    if (windowWidth >= mobileView) {
  		$(this).attr("style",browserPrefix+"animation: popIn 600ms ease "+time+"ms 1 normal forwards;");
  		if(chartOrder==4){
  			time=50;
  		}
  		time += 100;
  		chartOrder += 1;
      $(this).on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).addClass("v-visibility");
        $(this).removeAttr('style');
      });
    }
  });
  
}

function setLogo(){
  //var chosenLogo = logoArray[Math.floor(Math.random()*logoArray.length)];
  //$('.logo').attr("src", "images/logos/"+chosenLogo);
  setTimeout(function(){ 
  
    var itemImage;
  itemImage = images.logos[Math.floor(Math.random() * images.logos.length)];
  
  $('.logo').attr("src", itemImage);
  

  }, 100);
  console.log("logo loaded");
}

function init(){
  // loadSnackArray(setSnacks);
  setSnacks(); // not needed once loadSnackArray is fixed
  // loadResults();
  // loadLogoArray(setLogo);
  setLogo(); // not needed once loadLogoArray is fixed
  setBkg();
  setTimeout(setTeeth, 500); // call once the teeth img is loaded on the page
  
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
  /*var chosenResult=resultArray[Math.floor(Math.random()*resultArray.length)];
  $('.snack-item', thisObj).attr("src","images/results/"+chosenResult);*/
  

    var itemImageResults;
  itemImageResults=images.results[Math.floor(Math.random()*images.results.length)];
  $('.snack-item', thisObj).attr("src", itemImageResults);
  $('.snack-item', thisObj).addClass("result-item");
  $('.snack-item', thisObj).parent().addClass("no-pointer");
  $('.snack-item', thisObj).removeClass("snack-item");
  
  

  $('.topteeth', thisObj).css("transform", "translateY(0px)");
  $('.bottomteeth', thisObj).css("transform", "translateY(0px)");  
  //$(thisObj).off('click');
  $('.topteeth', thisObj).css("visibility", "hidden");
  $('.bottomteeth', thisObj).css("visibility", "hidden");
  
}


function closeTeeth(thisObj, callback){
  var topAmount = -topSpacer-4;
  var moveTopY = "translateY("+ topAmount+"px)";
  var bottomAmount = bottomSpacer;
  var moveBottomY = "translateY("+ bottomAmount+"px)";
  $('.topteeth', thisObj).css("transform", moveTopY);
  $('.bottomteeth', thisObj).css("transform", moveBottomY);
  setTimeout(function(){ callback(thisObj);}, 500);
  /*$('.topteeth',thisObj).css("animation-name", "topTeethAnimation");
  $('.bottomteeth',thisObj).css("animation-name", "bottomTeethAnimation");
  callback(thisObj);*/
};

function resetImgList(){
  //var itemImageSnacks = images.snacks[Math.floor(Math.random()*images.snacks.length)];
  $('.snack').each(function(){    
    $(".result-item", this).removeClass("result-item").addClass("snack-item").attr("src","");
  });
  if(!$(".message-ty").is(":visible") && $(".snack-grid").is(":visible")){
    $(".message-ty").addClass("show-message").show();
    $(".snack-grid").hide();
  }else{
    $(".message-ty").removeClass("show-message").hide();
    $(".snack-grid").show();
  }
  $(".snack").removeClass("v-visibility active hide-md-active show");
}

if (windowWidth <= mobileView) {
  
  $('.touch-device #fix-mobile .wrap').on('resize scroll', function(){
    let scrollMobile = $(this).scrollTop(),
        topPosScreenTow = $('#pageTwo').position(),
        blockHeight = $('.socialCard').outerHeight(),
        resScroll = topPosScreenTow.top + blockHeight;
    //console.log($(this).scrollTop() + " = " + topPosScreenTow.top + " h " + resScroll);
    if(topPosScreenTow.top <= 0){
      $(this).css('scroll-snap-type','none');
    }else{
        $(this).css('scroll-snap-type','y mandatory');
    }
}) 
} 



function countCliks(thisObj){
  let totalClick = $('.snack:visible').length;
  let countClick = $('.snack.active').length;
  if(totalClick < 3){
    totalClick = 4
    setTimeout(function(){
      $(thisObj).addClass("hide-md-active").removeClass("show").next().addClass("show"); 
    }, 2000);
  }
  setTimeout(function(){
    if( countClick == totalClick ){
        resetImgList();
    }
  }, 2000);
}

$(".snack").on('click', function(){
  
  if(!$(this).hasClass("active")){
  $('.topteeth', $(this)).css("visibility", "visible");
  $('.bottomteeth', $(this)).css("visibility", "visible");
  $(this).addClass('active');
  
  
  closeTeeth($(this), openTeeth);
  countCliks($(this));
  }
  
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
  if(dotPlacement <= maxMoveSpace || dotPlacement <= 0){
    if (windowWidth <= tabletView) {
      maxMoveSpace = 14
      aMoveDot.css({'top': dotPlacement});
    }
    aMoveDot.css({'top': dotPlacement});
  }

/* if social cards aren't visible, add fade in animation */
var socialVisibility = $('.socialCard').css("opacity");
//console.log(socialVisibility);
if(socialVisibility=="0"){
	var time=500;
	$('.socialCard').each(function(){
  		$(this).attr("style",browserPrefix+"animation: fadeinUP 1s ease "+time+"ms 1 normal forwards;");
  		time += 100;
  });
}

});

$(window).on("resize", function(){
  let windowHeight = $(window).height();
  if($('body').hasClass('hover-device') && windowHeight <= 660){
    $('body').addClass('small-screen');
  }else{
    $('body').removeClass('small-screen');
  }
}).resize();
window.onload = init();
window.onresize = function(){
  setTeeth();
};

