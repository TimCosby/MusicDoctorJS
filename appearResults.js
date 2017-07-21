var el = document.querySelector("#results");
console.log(el.scrollLeft, el.offsetTop);


function validate() {
  console.log("Running validation");
  $(".result").css("display", "block");
  //$("div").toggleClass("resultShow");
  //$(".result").toggleClass(".resultShow");
  $("input").css("background-image", "none");
  // window.location = 'index.html#results';
}



// When I submit #form
$( "#form" ).submit(

  // Do stuff...
  function( event ) {

    console.log("Form submitted");

    // 1. Don't refresh page
    event.preventDefault();

    // 2. Grab what is in the form
    var searchText = document.getElementById("artist").value;
    console.log("Search text = "+searchText);

    // 3. Run validation function
    validate();


    // 3b. Move to validation results
    window.scrollTo(0, el.offsetTop);

    // 4. Update recommendations
    // function(searchText);
  }
);
