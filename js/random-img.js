
var config = {
  pathFolder : window.location.pathname,
  totalImages: 32,
  extension  : ".svg",
  dir : {
    logos   : "images/logos/",
    snacks  : "images/snacks/",
    results : "images/results/"
  }
}
var images = {};
for(type in config.dir){
    if(getCookie(type) !== null){
      images[type]= JSON.parse(decodeURI(getCookie(type)));
    }else{
     parseImages(type);
    }
}
console.log(images)
  function setCookie(name,value,minutes) {
    var expires = "";
    if (minutes) {
        var date = new Date();
        date.setTime(date.getTime() + (minutes*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  }
  function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }  
    return null;  
  }
  function eraseCookie(name) {   
    
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
  async function parseImages(type){
    images[type] = [];
    for(let i = 1; i < config.totalImages; i++){
        var path = config.pathFolder + config.dir[type] + i + config.extension;
            //images[type].push(path)
        jQuery.ajax({
          url: path,
          type: 'HEAD',
          async : false,
          error: function() {   
          },
          success: function() {
            images[type].push(path)
          },
          complete:function(){
            
          }
        });    
      }
      setCookie(type,encodeURI(JSON.stringify(images[type])),60);      
    console.log("data arrived")    
    console.log(encodeURI(JSON.stringify(images[type])))
  }


