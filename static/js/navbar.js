$(document).ready(function() {
  // Stop from dragging Images
  $('img').on('dragstart', function(event) { event.preventDefault(); });

  // Selector
  var $links = $("div#navbar > div.links div.buttons > div.button");

  // Link Hover effect
  $links.hover(function() {
    $($(this).children("div")[1]).animate({
        height: "3px"
      }, 200, function() {}); }, function() {
    $($(this).children("div")[1]).animate({
        height: "0px"
      }, 200, function() {});
    }
  );

  // Link clicking
  $links.click(function() {
    if(typeof $(this).parent().attr("href") != "undefined")
      window.location = $(this).parent().attr("href");
  });

  // Flip the boat image
  function flipBoat($boat, $wind, dir) {
    if(dir) {
      $boat.attr("src", "images/sailboat-left.png");
      $wind.attr("src", "images/wind-left.png");
      $wind.css("left", $wind.position().left + 10);
    }
    else {
      $boat.attr("src", "images/sailboat-right.png");
      $wind.attr("src", "images/wind-right.png");
      $wind.css("left", $wind.position().left - 10);
    }
  }

  // Get distance for the boat
  function boatDiff($boat, $button) {
    var gotoPos = $button.position().left + $button.width()/2 +
                parseFloat($button.css("padding-right").replace("px", "")) +
                parseFloat($button.css("border-right").replace("px", "")) +
                parseFloat($button.css("margin-right").replace("px", ""));

    var boatPos = $boat.position().left + $boat.width()/2; 
    return gotoPos - boatPos;
  }

  // Sailboat effect
  var linkQueue = [];
  var boatProgress = 0;
  function linkAction() {
    if(linkQueue.length === 0) return;

    var $button = $(linkQueue.shift());
    var $boat = $("div#navbar > div.links > div.sailboat-track > img.boat");

    // Skip spurious requests
    $boat.css("left", $boat.position().left);
    var diff = boatDiff($boat, $button);
    if(Math.abs(diff) < 5) {
      linkAction();
      return;
    }

    var wind = document.createElement('img');
    wind.className = "wind";

    $boat.parent().append(wind);
    var $wind = $("div#navbar > div.links > div.sailboat-track > img.wind");
    $wind.css("position", "absolute");
    $wind.css("left", $boat.position().left - $wind.width());

    flipBoat($boat, $wind, diff < 0);

    // Make wind
    $wind.animate({
        left: "+=" + (diff > 0 ? "-" : "") + "10",
        opacity: "0"
      }, 200 * Math.log(Math.abs(diff)), function() {
        $wind.remove();
    });
    
    // Move boat
    var duration = 350 * Math.log(Math.abs(diff));
    $boat.animate({
        left: "+=" + diff
      }, {
        duration: 350 * Math.log(Math.abs(diff)),
        easing: 'swing',
        progress: function(a, p, c) {
          boatProgress = p;
        },
        done: linkAction
    });
  }
  
  // Clicking link behavior
  $links.click(function() {
    linkQueue.push(this);

    var $boat = $("div#navbar > div.links > div.sailboat-track > img.boat");
    if($boat.is(':animated')) return;

    linkAction();
  });
});
