var wordOpt=" ";////////TODO: FEED THE SUBMIT RESULT HERE 

function getUserInfo() 
{
	FB.api('/me', function(response) 
	{
		var str=""+response.name+"<br>";
	  	var str2 ="Logout";
	  	document.getElementById("status").innerHTML=str;
		document.getElementById("demo").innerHTML=str2;
	 	getPhoto();	 
	 	
	 	var strtab="<div id='content'><ul id='tabs' class='nav nav-tabs nav-justified' data-tabs='tabs'><li class='active'><a href='#red' onclick='forYou()' data-toggle='tab'>Events for You</a></li><li><a href='#green' onclick='getFeed()' data-toggle='tab'>Events in UCLA</a></li></ul><div id='my-tab-content' class='tab-content'><div class='tab-pane active' id='red'><h1>For You</h1><p id='forya'></p></div><div class='tab-pane' id='green'><h1>UCLA Events</h1><p id='foreveryone'></p></div></div></div>";
	 	forYou();
	 	document.getElementById("container2").innerHTML=strtab;
	 	
    	});
}


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
	{
		var str="";
		for(var i=0; i<10; i++)
		{
			var indicatorMust = {value : false};
			var indicatorOpt = {value : false};
			for(var j=0; j<3;j++)
			{
				parse(indicatorMust,response.feed.data[i].message,wordMusthave[j]);
			}
			parse(indicatorOpt,response.feed.data[i].message,wordOpt);
			var str="";
			if(indicatorMust.value==true &&indicatorOpt.value==true )
			{
		
	  		str="<div class='row'><div class='col-sm-2 col-md-10'><div class='thumbnail'><div class='caption'><h3>" +response.feed.data[i].to.data[0].name+"</h3><p>"+response.feed.data[i].message+"</p><p><a href='#' class='btn btn-primary' role='button'>Button</a> <a href='#' class='btn btn-default' role='button'>Button</a></p></div></div></div></div>";
	  			document.getElementById("foreveryone").innerHTML+=str;
	  		}
		}
	
	
	});
	}
	
}
///////////////////////////////////////////////////
function getPhoto()
{
	FB.api('/me/picture?type=normal', function(response) 
	{
		  var str="<br/><img src='"+response.data.url+"'/>";
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
	  	/////////////////////
	  	str= "<div class='row'><div class='col-sm-6 col-md-10'><div onload='getCover("+id+")'class='thumbnail'><p id='vivian'></p><div class='caption'><h3>" +response.name+"</h3><p>"+response.description+"</p><p><a href='#' class='btn btn-primary' role='button'>Button</a> <a href='#' class='btn btn-default' role='button'>Button</a></p></div></div></div></div>";
	  	///////////////////////
		}
		document.getElementById("forya").innerHTML+=str;
	});
}

function getCover(id)
{
	FB.api('/'+id+'?fields=cover', function(response)
	{
		var str ="<img src="+response.cover.source+"alt='...'>";
		document.getElementById("vivian").innerHTML+=str;
	})
}


/////I don't know what it is. Load the SDK asynchronously
 (function(d){
     var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement('script'); js.id = id; js.async = true;
     js.src = "//connect.facebook.net/en_US/all.js";
     ref.parentNode.insertBefore(js, ref);
 }(document));

