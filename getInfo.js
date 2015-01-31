//Apple ID login
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
//don't know what this does but don't touch it
(function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

//login
var permission = "email,read_friendlists,user_status,user_likes,user_relationships,user_about_me,user_birthday,friends_status,read_stream,manage_notifications,publish_actions,user_groups,user_events";
function Login()
{
	FB.login(function(response) 
	{
		if (response.authResponse) 
		{
		   	var access_token = FB.getAuthResponse()['accessToken'];
		   	//console.log('Access Token = '+ access_token);
		   	FB.api('/me', function(response)
		   	{
		   		console.log('Good to see you, '+ response.name+ '.');
		   	});
		    	getUserInfo();
		    	getPermissions();
  			}
  			else 
  			{
  	    	 		console.log('User cancelled login or did not fully authorize.');
   			}
		 },{scope: permission});
	}

	  function getPermissions() {
	    FB.api('/me/permissions', function(response) {

			console.log(response);
	  	  	    
    });
    }
  function getUserInfo() {
	    FB.api('/me', function(response) {

	  var str="<b>Name</b> : "+response.name+"<br>";
	  	  //str +="<b>Link: </b>"+response.link+"<br>";
	  	  //str +="<b>id: </b>"+response.id+"<br>";
	  	  //str +="<b>Email:</b> "+response.email+"<br>";
	  	  //str +="<input type='button' value='Get Photo' onclick='getPhoto();'/>";
	  	  str +="<input type='button' value='Get Groups' onclick='getGroups();'/>";
	  	  str +="<input type='button' value='Logout' onclick='Logout();'/>";
	  	  document.getElementById("status").innerHTML=str;
	  
	  getPhoto();	  
	  	  	    
    });
    }
    
    ///////////////
    	function getGroups()
	{
	  FB.api('me/groups', function(response) {
	  var str;
	  for (var i = 0; i < response.data.length; i++) 
	  {
		  str+="<br/>Groups: " + response.data[i].name + "<br>";
	  }	  	    
	  document.getElementById("status").innerHTML+=str;
    });
	
	}
	
	function getEvents()
	{
	  FB.api('me/events', function(response) {
	  var str;
	  for (var i = 0; i < response.data.length; i++) 
	  {
		  str+="<br/>Events: " + response.data[i].name + "<br>";
	  }	  	    
	  document.getElementById("status").innerHTML+=str;
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

