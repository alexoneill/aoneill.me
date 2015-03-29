// @author Alex O'Neill
// @name main.js

// Section States
var sectionUp = "500px",
  sectionDown = "200px";

// Helper function to toggle a "section"
function toggleSection($section, state, callback) {
  // If callback defined but not state
  if(typeof state == "function") {
    callback = state;
    state = undefined;
  }
  
  // States
  // If we want to set a state not toggle
  if(typeof state != "undefined") {
    if(state)
      $section.animate({
        height: sectionUp
      });
    else
      $section.animate({
        height: sectionDown
      });
  }

  // Toggle
  else {
    if($section.css("height") === sectionUp)
      $section.animate({
        height: sectionDown
      });
    else if($section.css("height") === sectionDown)
      $section.animate({
        height: sectionUp
      });
    else
      $section.css("height", sectionDown);
  }

  // Switching title with description (works with states)
  var fadeDelay = 200;
  var blur = .25;
  if(typeof state != "undefined") {
    if(state) {
      // Swap text
      $section.children(".overlay-text").fadeOut(function() {
        $section.children(".overlay-description").fadeIn();
      });

      // Make background opaque
      $section.children("img").fadeTo(undefined, blur);
    }
    else {
      // Swap text
      $section.children(".overlay-description").fadeOut(fadeDelay, 
        function() {
          $section.children(".overlay-text").fadeIn(fadeDelay);
        });
      
      // Restore background opacity
      $section.children("img").fadeTo(undefined, 1);
    }
  }
  else {
    if(!$section.children(".overlay-text").is(":hidden")) {
      // Swap text
      $section.children(".overlay-text").fadeOut(function() {
        $section.children(".overlay-description").fadeIn();
      });

      // Make background opaque
      $section.children("img").fadeTo(undefined, blur);
    }
    else {
      $section.children(".overlay-description").fadeOut(fadeDelay, 
        function() {
          $section.children(".overlay-text").fadeIn(fadeDelay);
        });

      // Restore background opacity
      $section.children("img").fadeTo(undefined, 1);
    }
  }

  if(typeof callback == "function")
    callback();
}

function getSectionState($section) {
  return $section.height() != parseInt(sectionDown);
} 

$(document).ready(function() {
  ////////////////////////////////
  // Social Media 'Card' Driver //
  ////////////////////////////////

  // Selector
  var $smCard = $("div#content > div.section-large > div.container > div.card");

  // Hover movement
  $smCard.hover(function() {
    $(this).animate({
      top: "-=10"
    });
  }, function() {
    $(this).animate({
      top: "+=10"
    });
  });

  // Clicking brings to defined href
  $smCard.click(function() {
    window.location = $(this).attr("href");
  });

  ////////////////////
  // Section Driver //
  ////////////////////

  // Selector
  var $section = $("div#content > div.section");

  // Toggling sections
  $section.click(function() {
    var closure = this;

    toggleSection($(closure));

    $section.each(function(index, elem) {
      if(closure != elem)
        toggleSection($(elem), false);
    });
  });

  // Special driver for scrolling code block
  var randCodeOffset = Math.random() * 3000 + 475;
  var scrollCode = $("div#content > div.section > img.scrolling");
  scrollCode.css("top", -randCodeOffset);
  $(document).scroll(function() {
    scrollCode.css("top", -randCodeOffset - $(document).scrollTop() * 2);
  });

  // Displaying section description

  ////////////////////
  // Navbar Add-ons //
  ////////////////////
  
  // Link selector
  var $links = $("div#navbar > div.links div.buttons > div.button");

  // Link clicking
  $links.click(function() {
    var sectionId = $(this).attr("href");
    var scrollTo = $(sectionId).position().top -
      $("#navbar").height();

    // See if a section is toggled
    var anySectionToggled = false;
    $section.each(function(index, elem) {
      anySectionToggled = anySectionToggled || getSectionState($(elem));
    });

    if(anySectionToggled) {
      // If the section we are navigating to is above the currently selected one
      // account for the fancy resizing of the sections when scrolling
      var sectionActive = findInList($section.map(function(elem) {
          return getSectionState($($(".section")[elem]))
        }), true);
 
      var thisSectionIndex = $section.map(function(elem) {
          if($section[elem] == $(sectionId)[0])
            return elem
        })[0];
 
      if(sectionActive < thisSectionIndex)
        scrollTo -= parseInt(sectionUp) - parseInt(sectionDown);
    }
    
    // Use the swing easing for smooth scrolling
    $("html, body").animate({
        scrollTop: scrollTo
      }, 500, 'swing');
   
    // Toggle only the current section to large, and the rest to small
    toggleSection($(sectionId), true);

    $section.each(function(index, elem) {
      if($(sectionId)[0] != elem)
        toggleSection($(elem), false);
    });
  });
});

