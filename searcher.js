<html>

    <p id='announcement' hidden="True"></p>

    <p id='error' hidden=True></p>

    <textarea id='input'></textarea>

    <button class='action_button' id='Add'>Add Artist</button>

    <button class='action_button' id='Remove'>Remove Artist</button>

    <button class='action_button' id='Get_Recommendations'>Get Recommendations</button>

    <p id='text'>hi</p>

    <div class="cards">
        <!-- Cards go in here -->
    </div>

</html>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

<script>
    var DATABASE = {'ALT-J': ['Alt-J', 5.6, 3.0, 6.0, 5.0, 6.0], 'ARCADE FIRE': ['Arcade Fire', 6.5, 4.0, 6.5, 5.0, 6.0], 'ARCTIC MONKEYS': ['Arctic Monkeys', 4.0, 7.0, 4.0, 6.5, 3.0], 'BLUR': ['Blur', 3.0, 6.5, 4.5, 7.0, 2.0], 'BON IVER': ['Bon Iver', 7.5, 3.0, 7.0, 5.0, 5.0], 'CHILDISH GAMBINO': ['Childish Gambino', 2.0, 6.0, 3.0, 6.5, 5.0],'COLDPLAY': ['Coldplay', 5.9, 2.3, 4.5, 8.3, 4.6],'DEATH CAB FOR CUTIE': ['Death Cab for Cutie', 8.0, 5.0, 5.0, 4.0, 6.0],'FOSTER THE PEOPLE': ['Foster The People', 2.0, 2.0, 7.5, 6.5, 8.0],'GLASS ANIMALS': ['Glass Animals', 1.8, 2.4, 7.2, 5.0, 6.0],'GORILLAZ': ['Gorillaz', 6.0, 5.0, 8.2, 6.8, 7.6],'INTERPOL': ['Interpol', 6.0, 5.7, 5.3, 4.3, 3.3],'JACK WHITE': ['Jack White', 4.5, 7.6, 6.5, 6.6, 3.2],'KENDRICK LAMAR': ['Kendrick Lamar', 1.3, 7.3, 4.5, 8.0, 5.0],'LCD SOUNDSYSTEM': ['LCD Soundsystem', 5.6, 4.7, 5.8, 5.2, 8.2],'LOGIC': ['Logic', 1.0, 2.5, 6.2, 5.8, 6.8],'M83': ['M83', 5.6, 5.0, 7.8, 3.4, 9.2],'MODEST MOUSE': ['Modest Mouse', 7.2, 6.2, 6.4, 3.2, 2.2],'MUSE': ['Muse', 3.1, 6.9, 5.5, 5.9, 6.2],'NIRVANA': ['Nirvana', 6.0, 7.2, 6.3, 7.5, 1.1],'OASIS': ['Oasis', 3.5, 5.4, 3.2, 7.2, 2.0],'PASSION PIT': ['Passion Pit', 7.3, 1.4, 6.5, 2.3, 8.2],'QUEENS OF THE STONE AGE': ['Queens of the Stone Age', 3.5, 5.6, 5.7, 5.4, 2.1],'RADIOHEAD': ['Radiohead', 9.5, 7.8, 8.2, 7.0, 7.2],'THE RED HOT CHILI PEPPERS': ['The Red Hot Chili Peppers', 0.8, 6.0, 5.0, 7.6, 1.7],'THE SMASHING PUMPKINS': ['The Smashing Pumpkins', 5.4, 6.2, 4.3, 5.2, 3.4],'VAMPIRE WEEKEND': ['Vampire Weekend', 2.2, 2.0, 6.8, 5.5, 3.2],'WEEZER': ['Weezer', 7.0, 6.5, 2.2, 4.2, 2.1],'THE WHITE STRIPES': ['The White Stripes', 1.2, 7.8, 5.8, 6.0, 2.3]};

    var ARTISTS = []; // List of Artists user adds

    var LIMIT = 6; // Suggested cards outputted.

    $(function(){

        $('.action_button').click(function(){ // Hide Messages
            $('#announcement').hide();
            $('#error').hide();
        });

        $('#Add').click(function(){ // Adding artists
            if ($('#input').val() != '') {

                for (var key in DATABASE) {
                    if (key.toLowerCase() == $('#input').val()) {
                        ARTISTS.push(DATABASE[$('#input').val().toUpperCase()][0]); // Add the Value in the textarea
                        $('#input').val(''); // Empty the textarea

                        $('#announcement').text('Artist Added!').show();

                        break
                    }
                }

                if ($('#input').val() != '') { // If Artist didn't match
                    $('#error').text('Artist does not exist!').show();
                }
            }
        });

        $('#Remove').click(function(){ // Removing artists
            if ($('#input').val() != '') {

                for (var i = 0; i < ARTISTS.length; i++) { // Cycle through all artists
                    if (ARTISTS[i].toLowerCase() == $('#input').val().toLowerCase()) {
                        ARTISTS.splice(i, 1);
                        $('#input').val('');

                        $('#announcement').text('Artist Removed!').show();

                        break
                    }
                }

                if ($('#input').val() != '') { // If Artist wasn't added
                    $('#error').text('Artist has not been added!').show();
                }
            }
        });

        $('#Get_Recommendations').click(function(){
            var temp_base = $.extend({}, DATABASE);
            for (var key in ARTISTS){
                delete temp_base[ARTISTS[key].toUpperCase()];
            }

            var avg_points = {};
            var temp_list = [];

            for (var constant_keys in temp_base){
                constant_keys = temp_base[constant_keys];
                var temp_points = 0;

                    for (var static_keys in ARTISTS) {
                        static_keys = ARTISTS[static_keys];

                        for (var i = 1; i < 6; i++) {
                            temp_points += Math.abs(DATABASE[static_keys.toUpperCase()][i] - constant_keys[i]);
                        }
                    }

                try{
                    avg_points[temp_points].push(constant_keys[0])
                }catch(e){
                    avg_points[temp_points] = [constant_keys[0]]
                }
                temp_list.push(temp_points);
            }

            temp_list.sort(function(a,b){ // Sort in decending order
                return b - a
            });

            var final_list = [];
            for (var point in temp_list){
                $.merge(final_list, avg_points[temp_list[point]]);
            }

            for (var i = 0; i < LIMIT; i++){
                if ($('#card' + i.toString()).length){ // If card already exists
                    $('#card' + i.toString()).text(final_list.pop())
                }
                else{ // If card does not yet exist
                    $('.cards').append('<p id="card' + i.toString() + '">' + final_list.pop() + '</p>')
                }
            }
        });

   });
</script>
