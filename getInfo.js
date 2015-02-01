var wordOpt=" ";////////TODO: FEED THE SUBMIT RESULT HERE 

function getUserInfo() 
{
	FB.api('/me', function(response) 
	{
		var str="<b>Name</b> : "+response.name+"<br>";
	  	str +="<input type='button' value='Events for You' onclick='forYou();'/>";
	  	str +="<input type='button' value='Events around UCLA' onclick='getFeed();'/>";
	  //	var str2 ="<input type='button' value='Logout' onclick='Logout();'/>";
	  	var str2 ="Logout";
	  	document.getElementById("status").innerHTML=str;
		document.getElementById("demo").innerHTML=str2;
	 	getPhoto();	 
	 	
    	});
}
$("demo").on('click', function(){
	Logout();
})
//prints out messages given a groupID

/*<form ... onsubmit="myButton.disabled = true; return true;">
...
<input type="submit" name="myButton" value="Submit">
</form>
*/

function forYou()
{
	getUserGroups();
	getNotif();
}
function getFeed()
{
	for(var a=0; a<openGroups.length;a++)
	{
	id=openGroups[a];
	FB.api('/'+id+'/?fields=feed', function(response) 
//FB.api('/269730429771312/?fields=feed', function(response)
	{
		var str="";
		for(var i=0; i<10; i++)
		{
		//	var indicator = false;
			var indicatorMust = {value : false};
			var indicatorOpt = {value : false};
			for(var j=0; j<3;j++)
			{
				parse(indicatorMust,response.feed.data[i].message,wordMusthave[j]);
			}
			parse(indicatorOpt,response.feed.data[i].message,wordOpt);
	
			if(indicatorMust.value==true &&indicatorOpt.value==true )
			{
				var str="<b>Group Name</b> : "+response.feed.data[i].to.data[0].name+"<br>";
	  			document.getElementById("status").innerHTML+=str;
	  			var str="<b>Message: </b>"+response.feed.data[i].message+"<br>";
	  			document.getElementById("status").innerHTML+=str;
			}
				//document.getElementById("status").innerHTML+=str;
		}
	
	
	});
	}
	
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
	{	var str = "";
		var indicatorMust = {value: false};
		var indicatorOpt = {value: false};
		for (var j=0; j<3; j++)
		{
			parse(indicatorMust, response.description, wordMusthave[j]);
		}
		parse(indicatorOpt, response.description, wordOpt);
		if(indicatorMust.value == true && indicatorOpt.value== true)
		{
		str+="<b>Name</b> : "+response.name+"<br>";
	  	str +="<b>Description: </b>"+response.description+"<br>";	
		}
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

