var database = {'ALT-J': ['Alt-J', 5.6, 3.0, 6.0, 5.0, 6.0], 'ARCADE FIRE': ['Arcade Fire', 6.5, 4.0, 6.5, 5.0, 6.0], 'ARCTIC MONKEYS': ['Arctic Monkeys', 4.0, 7.0, 4.0, 6.5, 3.0], 'BLUR': ['Blur', 3.0, 6.5, 4.5, 7.0, 2.0], 'BON IVER': ['Bon Iver', 7.5, 3.0, 7.0, 5.0, 5.0], 'CHILDISH GAMBINO': ['Childish Gambino', 2.0, 6.0, 3.0, 6.5, 5.0],'COLDPLAY': ['Coldplay', 5.9, 2.3, 4.5, 8.3, 4.6],'DEATH CAB FOR CUTIE': ['Death Cab for Cutie', 8.0, 5.0, 5.0, 4.0, 6.0],'FOSTER THE PEOPLE': ['Foster The People', 2.0, 2.0, 7.5, 6.5, 8.0],'GLASS ANIMALS': ['Glass Animals', 1.8, 2.4, 7.2, 5.0, 6.0],'GORILLAZ': ['Gorillaz', 6.0, 5.0, 8.2, 6.8, 7.6],'INTERPOL': ['Interpol', 6.0, 5.7, 5.3, 4.3, 3.3],'JACK WHITE': ['Jack White', 4.5, 7.6, 6.5, 6.6, 3.2],'KENDRICK LAMAR': ['Kendrick Lamar', 1.3, 7.3, 4.5, 8.0, 5.0],'LCD SOUNDSYSTEM': ['LCD Soundsystem', 5.6, 4.7, 5.8, 5.2, 8.2],'LOGIC': ['Logic', 1.0, 2.5, 6.2, 5.8, 6.8],'M83': ['M83', 5.6, 5.0, 7.8, 3.4, 9.2],'MODEST MOUSE': ['Modest Mouse', 7.2, 6.2, 6.4, 3.2, 2.2],'MUSE': ['Muse', 3.1, 6.9, 5.5, 5.9, 6.2],'NIRVANA': ['Nirvana', 6.0, 7.2, 6.3, 7.5, 1.1],'OASIS': ['Oasis', 3.5, 5.4, 3.2, 7.2, 2.0],'PASSION PIT': ['Passion Pit', 7.3, 1.4, 6.5, 2.3, 8.2],'QUEENS OF THE STONE AGE': ['Queens of the Stone Age', 3.5, 5.6, 5.7, 5.4, 2.1],'RADIOHEAD': ['Radiohead', 9.5, 7.8, 8.2, 7.0, 7.2],'THE RED HOT CHILI PEPPERS': ['The Red Hot Chili Peppers', 0.8, 6.0, 5.0, 7.6, 1.7],'THE SMASHING PUMPKINS': ['The Smashing Pumpkins', 5.4, 6.2, 4.3, 5.2, 3.4],'VAMPIRE WEEKEND': ['Vampire Weekend', 2.2, 2.0, 6.8, 5.5, 3.2],'WEEZER': ['Weezer', 7.0, 6.5, 2.2, 4.2, 2.1],'THE WHITE STRIPES': ['The White Stripes', 1.2, 7.8, 5.8, 6.0, 2.3]};
var favoured_artists = [];
function is_in(obj, arr) { // Tell if obj is in arr
	for(var i=0; i < arr.length; i++){ // Go through every value of arr
	    if (Array.isArray(arr[i])){ // If there's a chance of nestation at arr[i]
            if (is_in(obj, arr[i])){ // Use recursion on all levels
	            return true
            }
        }
		else if(obj === arr[i]){ // If arr[i] is the same as obj
            return true
		}
	}
	return false
}
function get_input(input, type){ // Add/Remove/Tell the user to get smart
    var input_text = input.value.toUpperCase();
	if(is_in(input_text, Object.keys(database))){
		if (type === 'add'){
			if(is_in(input.value.toUpperCase(), favoured_artists) === false){
				favoured_artists.push(input.value.toUpperCase());
				document.getElementById('result').innerHTML = ('Artist added!');
				input.value = '';
			}
			else{
				document.getElementById('result').innerHTML = ('Artist has already been added!');
			}
		}
		else if (type === 'remove'){
			if(is_in(input_text, favoured_artists)){
				for(var i=0; i < favoured_artists.length; i++){
					if(input_text === favoured_artists[i]){
						favoured_artists.splice(i, 1);
						document.getElementById('result').innerHTML = ('Artist has been removed!');
						input.value = '';
						break
					}
				}
			}
			else{
				document.getElementById('result').innerHTML = ('Artist has not been added!');
			}
		}
	}
	else{
		document.getElementById('result').innerHTML = ('Artist not recognized!');
	}
}
function get_average_difference(database, source) { // Compares all the values in database with all the values in source and outputs the points with artists in a dictionary
    var point_distri = {};
	var data_keys = Object.keys(database); // Gets names of all artists
	for(var i=0; i < data_keys.length; i++){ // Goes through all artists
        if(is_in(data_keys[i], source) === false){ // Checks to make sure it isn't an artist you already know of
            var new_artist_data = database[data_keys[i]]; // Get data from the new artist
            var point_dif = 0;
            for(var k=0; k < source.length; k++){ // Goes through all known artists
                for(var j=1; j < new_artist_data.length; j++){ // Goes through all data types (Skips the first data point since it's the name
                    point_dif += + Math.abs(new_artist_data[j] - database[source[k]][j]); // Get the difference between data types
                }
            }
            try{
                point_distri[point_dif].push(database[data_keys[i]]); // Put the artist under the point difference if the points already exist
            }
            catch(err){
                point_distri[point_dif] = [database[data_keys[i]]]; // Put the artist under the point difference if the points don't exist yet
            }
        }
	}
	return point_distri
}
function get_recommendations(limit){ // Get the artists from most to least matching current liked artists
	if (favoured_artists.length == 0){
		return 'You need to enter an artist first';
	}
    var points = get_average_difference(database, favoured_artists); // Get average difference in points between known and unknown artists
    var sorted_points = Object.keys(points).sort(function(a, b){return a-b}); // Sort from most to least points
    if(limit === undefined){ // Sets the default limit to 5
        limit = 5;
    }
    var artists_to_display = [];
    // Limit the artist count
    for(var i=0; i < sorted_points.length; i++){ // For every value of point
        for(var k=0; k < points[sorted_points[i]].length; k++){ // For every artist with that value of point
            if(artists_to_display.length === limit){ // Stop looking after the limit is reached
                break
            }
            else{ // // Add the artist to the array
                var percentage = ((9 * (database[favoured_artists[0]].length - 1) - sorted_points[i]) / (9 * database[favoured_artists[0]].length - 1)) * 100; // Get initial percentage of equivalence
                percentage = parseFloat(Math.round(percentage * 100) / 100).toFixed(2); // Limit to 2 decimal places
                artists_to_display.push({'': points[sorted_points[i]][k][0]});
            }
        }
    }
    return artists_to_display
}

function display(){ // For testing
    document.getElementById('result').innerHTML = (JSON.stringify(get_recommendations()));
}
