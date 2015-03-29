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

  // Sailboat effect
  $links.click(function() {
    var $boat = $("div#navbar > div.links > div.sailboat-track > img.boat");
    var $button = $(this);

    $boat.css("left", $boat.position().left);

    $boat.queue(function() {
      var gotoPos = $button.position().left + $button.width()/2 +
                  parseFloat($button.css("padding-right").replace("px", "")) +
                  parseFloat($button.css("border-right").replace("px", "")) +
                  parseFloat($button.css("margin-right").replace("px", ""));

      var boatPos = $boat.position().left + $boat.width()/2; 
      var diff = gotoPos - boatPos;
  
      if(Math.abs(diff) < 5) {
        return;
      }

      var wind = document.createElement('img');
      wind.className = "wind";

      $boat.parent().append(wind);
      var $wind = $("div#navbar > div.links > div.sailboat-track > img.wind");
      $wind.css("position", "absolute");
      $wind.css("left", $boat.position().left - $wind.width());

      if(diff < 0) {
        $boat.attr("src", "images/sailboat-left.png");
        $wind.attr("src", "images/wind-left.png");
        $wind.css("left", $wind.position().left + 10);
      }
      else if(diff > 0) {
        $boat.attr("src", "images/sailboat-right.png");
        $wind.attr("src", "images/wind-right.png");
        $wind.css("left", $wind.position().left - 10);
      }

      // Make wind
      $wind.animate({
            left: "+=" + (diff > 0 ? "-" : "") + "10",
            opacity: "0"
          }, 200 * Math.log(Math.abs(diff)), function() {
            $wind.remove();
        });
      
      // Move boat
      $boat.animate({
          left: "+=" + diff
        }, 350 * Math.log(Math.abs(diff)));
          
      $(this).dequeue();
    });
  });
});
