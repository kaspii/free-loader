
FB.api(
    "/me",
    function (response) {
      if (response && !response.error) {
     //GET graph.facebook.com
       // /me?
    fields=albums.limit(5),posts.limit(5)
        console.log("hi");
      }
    }
);
