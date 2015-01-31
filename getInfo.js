
function getUserInfo() 
{
	FB.api('/me', function(response) 
	{
		var str="<b>Name</b> : "+response.name+"<br>";
	  	str +="<input type='button' value='Get Notification' onclick='getNotif();'/>";
	  	str +="<input type='button' value='Get User Events' onclick='getUserGroups();'/>";
	  	str +="<input type='button' value='Get Open Group Messages' onclick='getFeed(269730429771312);'/>";
	  	str +="<input type='button' value='Logout' onclick='Logout();'/>";
	  	document.getElementById("status").innerHTML=str;
	 	getPhoto();	 
    	});
}
//prints out messages given a groupID

function getFeed(id)
{
	FB.api('/'+id+'/?fields=feed', function(response) 
	{
		for(var i=0; i<3; i++)
		{
		//	console.log(response.feed.data[i].to)
			var str="<b>Group Name</b> : "+response.feed.data[i].to.data[0].name+"<br>";
	  		str +="<b>Message: </b>"+response.feed.data[i].message+"<br>";
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
//get the groupID of all the groups the user is in and print out the events created inside
function getUserGroups(){
	FB.api('me/groups', function(response){
		for (var i=0; i<10; i++)
		{
			getMemberEvents(response.data[i].id);
		}
	});
}
///////////////////////////////////////////////////////////
//get the eventID of a given groupID
function getMemberEvents(id) {
	FB.api('/'+id+'/events ', function(response){
		for(var i = 0; i<10; i++) 
		{
			traceEvent(response.data[i].id);
		}	
	});

}
//////////////////////////////////////////////////
//get the notification of events
function getNotif()
{
	FB.api('me/?fields=notifications{application}', function(response) 
	{
		for(var i = 0; i<10;i++) 
		{
			if(response.notifications.data[i].application.name=="Events")
			{
				console.log(response.notifications.data[i]);
				traceNotif(response.notifications.data[i].id);
			}
		}
    	});
}
//return the eventID from a notification of an invitation
function traceNotif(id)
{
	FB.api('/'+id+'', function(response)
	{
		console.log(response);
		traceEvent(response.object.id);
	});
}
//print out event info from a given eventID
function traceEvent(id)
{
	FB.api('/'+id+'', function(response)
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

