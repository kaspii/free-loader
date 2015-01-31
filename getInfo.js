window.fbAsyncInit = function() 
{
    FB.init({
      appId      : '341086482753224',
      xfbml      : true,
      status     : true, // check login status
      cookie     : true, // enable cookies to allow the server to access the session
      version    : 'v2.2'
    });
};

(function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

/*FB.Event.subscribe('auth.authResponseChange', function(response) 
{
	if (response.status === 'connected') 
  	{
  		document.getElementById("message").innerHTML +=  "<br>Connected to Facebook"; //SUCCESS
  	}	 
	else if (response.status === 'not_authorized') 
	{
    		document.getElementById("message").innerHTML +=  "<br>Failed to Connect"; //FAILED
    	}
    	else 
    	{
    		document.getElementById("message").innerHTML +=  "<br>Logged Out";
    	}
});*/	
    
   function Login()
	{
	
		FB.login(function(response) {
		   if (response.authResponse) 
		   {
		    	getUserInfo();
  			} else 
  			{
  	    	 console.log('User cancelled login or did not fully authorize.');
   			}
		 },{scope: 'email,user_photos,user_videos'});
	
	
	}

  function getUserInfo() {
	    FB.api('/me', function(response) {
 	  
 	  getPhoto();
	  var str="<b>Name</b> : "+response.name+"<br>";
	  	  //str +="<b>Link: </b>"+response.link+"<br>";
	  	  //str +="<b>id: </b>"+response.id+"<br>";
	  	  //str +="<b>Email:</b> "+response.email+"<br>";
	  	  //str +="<input type='button' value='Get Photo' onclick='getPhoto();'/>";
	  	  //str += "<br/><b>Pic</b> : <img src='"+response.data.url+"'/>";
	  	  str +="<input type='button' value='Get Groups' onclick='getGroups();'/>";
	  	  str +="<input type='button' value='Logout' onclick='Logout();'/>";
	  	  document.getElementById("status").innerHTML=str;
	  
	  //getPhoto();	  
	  	  	    
    });
    }
    
    ///////////////
    	function getGroups()
	{
	  FB.api('/me/events', function(response) {
	  var str;
	  console.log("hi");
	  console.log(response.data);
	  console.log(response.data.length);
	  console.log(response.data[1].name);
	  for (var i = 0; i < response.data.length; i++) 
	  {
		  str+="<br/>Groups: " + response.data[i].name + "<br>";
	  }	  	    
	  document.getElementById("status").innerHTML=str;
    });
	
	}
    ///////////////////////////
	function getPhoto()
	{
	  FB.api('/me/picture?type=normal', function(response) {

		  var str="<br/><b>Pic</b> : <img src='"+response.data.url+"'/>";
	  	  document.getElementById("status").innerHTML+=str;
	  	  	    
    });
	
	}
	
	
	/////////////////
	function Logout()
	{
		FB.logout(function(){document.location.reload();});
	}

  // Load the SDK asynchronously
  
  
 (function(d){
     var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement('script'); js.id = id; js.async = true;
     js.src = "//connect.facebook.net/en_US/all.js";
     ref.parentNode.insertBefore(js, ref);
   }(document));

