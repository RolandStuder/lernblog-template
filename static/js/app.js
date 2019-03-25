// Netlify Identity.
if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", user => {
    if (!user) {
      window.netlifyIdentity.on("login", () => {
        document.location.href = "/admin/";
      });
    }
  });
}

$(function() {
  // var topOfOthDiv = $(".hideshare").offset().top;
  // $(window).scroll(function() {
  //     if($(window).scrollTop() > topOfOthDiv) { //scrolled past the other div?
  //         $(".share").hide(); //reached the desired point -- show div
  //     }
  //     else{
  //       $(".share").show();
  //     }
  // });

  // Init image zoom.
  mediumZoom(".article-post img, [data-zoomable]");

  // Hide Header on on scroll down
  var didScroll;
  var lastScrollTop = 0;
  var delta = 5;
  var navbarHeight = $("nav").outerHeight();

  $(window).scroll(function(event) {
    didScroll = true;
  });

  setInterval(function() {
    if (didScroll) {
      hasScrolled();
      didScroll = false;
    }
  }, 250);

  function hasScrolled() {
    var st = $(this).scrollTop();

    // Make sure they scroll more than delta
    if (Math.abs(lastScrollTop - st) <= delta) return;

    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight) {
      // Scroll Down
      $("nav")
        .removeClass("nav-down")
        .addClass("nav-up");
      $(".nav-up").css("top", -$("nav").outerHeight() + "px");
    } else {
      // Scroll Up
      if (st + $(window).height() < $(document).height()) {
        $("nav")
          .removeClass("nav-up")
          .addClass("nav-down");
        $(".nav-up, .nav-down").css("top", "0px");
      }
    }

    lastScrollTop = st;
  }

  $(".site-content").css("margin-top", $("header").outerHeight() + "px");
});
