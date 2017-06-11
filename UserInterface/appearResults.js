function validate() {
    $(".result").css("display", "block");
    //$("div").toggleClass("resultShow");
    //$(".result").toggleClass(".resultShow");
    $("input").css("background-image", "none");
    window.location = 'index.html#results';

  }

  $(document).ready(function(){
      $("button").click(function(){
          $(".advancedTogglesHidden").toggleClass("showAdvancedToggles");
      });
  });
