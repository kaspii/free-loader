<!DOCTYPE html>
<html>

<head>
	Free Loader @UCLA
</head>
<body>
<p>Who doesn’t like freebies? What’s better than searching through facebook for all of the events with free stuff? Seeing them in one place, so you can look and nab as much swag as you can! Freeloader is your personal ultimate guide to zero dollar food, fun, and awesomeness.</p>


<h2>Teacup Piggy! <3</h2>
<img src="http://i.imgur.com/GLOwF.jpg" alt="Piggy">

<div id="fb-root"></div>

<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&appId=754073501337233&version=v2.0";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>

<div
  class="fb-like"
  data-share="true"
  data-width="450"
  data-show-faces="true">
</div>

<?php
$posts = json_decode(
    file_get_contents('https://graph.facebook.com/swagbucks/posts')
);
foreach($posts->data as $post) {
    echo $post->message, PHP_EOL;
}
?>

<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '341086482753224',
      xfbml      : true,
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
</script>
<!--<script src="getInfo.js"></script>-->
</body>

</html>