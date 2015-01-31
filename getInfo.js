
function getUserInfo() 
{
	FB.api('/me', function(response) 
	{
		var str="<b>Name</b> : "+response.name+"<br>";
	  	//str +="<b>Link: </b>"+response.link+"<br>";
	  	//str +="<b>id: </b>"+response.id+"<br>";
	  	//str +="<b>Email:</b> "+response.email+"<br>";
	  	//str +="<input type='button' value='Get Photo' onclick='getPhoto();'/>";
	  	str +="<input type='button' value='Get Groups' onclick='getGroups();'/>";
	  	str +="<input type='button' value='Get Events' onclick='getEvents();'/>";
	  	str +="<input type='button' value='Get Notification' onclick='getNotif();'/>";
	  	str +="<input type='button' value='Logout' onclick='Logout();'/>";
	  	document.getElementById("status").innerHTML=str;
	 	getPhoto();	 
    	});
}
////////////////////////////////////////////////
function getGroups()
{
	FB.api('me/groups', function(response)
	{
		var str;
		for (var i = 0; i < response.data.length; i++) 
		{
			str+="<br/>Groups: " + response.data[i].name + "<br>";
		}	  	    
	document.getElementById("status").innerHTML+=str;
    	});
}
/////////////////////////////////////////////////	
function getEvents()
{
	FB.api('me/events', function(response) 
	{
		var str;
		for (var i = 0; i < response.data.length; i++) 
		{
			str+="<br/>Events: " + response.data[i].name + "<br>";
		}	  	    
		document.getElementById("status").innerHTML+=str;
	});
}
///////////////////////////////////////////////////
function getPhoto()
{
	FB.api('/me/picture?type=normal', function(response) 
	{
		  var str="<br/><b>Pic</b> : <img src='"+response.data.url+"'/>";
	  	  document.getElementById("status").innerHTML+=str;
    	});
}
//////////////////////////////////////////////////
function getNotif()
{
	FB.api('me/?fields=notifications{application}', function(response) 
	{
		for (var i = 0; i < 5; i++) 
		{
			if(response.notifications.data[i].application.name=="Events")
			{
				console.log(response.notifications.data[i]);
				console.log(response.notifications.data[i].object);
				traceEvent(response.notifications.data[i].object.id);
			}
		}
	  	  
    	});
	
}
function traceEvent(id)
{
	FB.api('/id', function(response)
	{
		var str="<b>Name</b> : "+response.name+"<br>";
	  	str +="<b>Description: </b>"+response.description+"<br>";
		document.getElementById("status").innerHTML+=str;
	});
}
/////I don't know what it is. Load the SDK asynchronously
 (function(d){
     var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement('script'); js.id = id; js.async = true;
     js.src = "//connect.facebook.net/en_US/all.js";
     ref.parentNode.insertBefore(js, ref);
 }(document));

