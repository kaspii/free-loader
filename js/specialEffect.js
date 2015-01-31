// jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    if ($(this).attr("id") != "dropMobile") {
        $('.navbar-toggle:visible').click();  
    };
});


 // ADD SLIDEDOWN ANIMATION TO DROPDOWN //
$('.dropdown').on('show.bs.dropdown', function(e){
  $(this).find('.dropdown-menu').first().stop(true, true).slideDown();
});

 // ADD SLIDEUP ANIMATION TO DROPDOWN //
$('.dropdown').on('hide.bs.dropdown', function(e){
 $(this).find('.dropdown-menu').first().stop(true, true).slideUp();
 });
