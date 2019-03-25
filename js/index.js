const SLOTS_PER_REEL = 10;
const REEL_RADIUS = (266 / 2) / Math.tan (Math.PI / SLOTS_PER_REEL);
const IMAGE_ARRAY = ['bar-3', 'bar', 'bar-2', 'seven', 'cherry'];



/* In reel they will be seen in top-line (TOP-BOTTOM case)
 * 0 - Сherry
 * 1 - barx3
 * 2 - bar
 * 3 - barx2
 * 4 - seven
 * 5 - Cherry
 * 6 - barx3
 * 7 - bar
 * 8 - barx2
 * 9 - seven
*/ 

/* In reel they will be seen in top-line (TOP-BOTTOM case)
 * 0 - seven
 * 1 - cherry
 * 2 - barx3
 * 3 - bar
 * 4 - barx2
 * 5 - seven
 * 6 - cherry
 * 7 - barx3
 * 8 - bar
 * 9 - barx2
*/ 

/* In reel they will be seen in center (Center Case)
 * 0 - barx2
   1 - seven
 * 2 - cherry
 * 3 - barx3
 * 4 - bar
 * 5 - barx2
 * 6 - seven
 * 7 - cherry
 * 8 - barx3
 * 9 - bar
*/ 


function createSlots (wheel) {
	var slotAngle = 360 / SLOTS_PER_REEL;

	for (var i = 0; i < SLOTS_PER_REEL; i++) {
		
		var slot = $("<div></div>").addClass("slot");

	 	$(slot).css("transform", function () {
	 		return 'rotateX(' + (slotAngle * i) + 'deg) translateZ(' + REEL_RADIUS + 'px)';	
	 	});

	 	var content = $(slot).addClass(IMAGE_ARRAY[(i + 4) % 5]);

	 	wheel.append(slot);

	}

}

function getSeed() {
	return Math.floor(Math.random()*(SLOTS_PER_REEL));
}

function spin(timer) {

	var bctSeed = [-1,-1,-1]; //Bottom, Top, Center seed;

	for(var i = 1; i < 4; i++) {

	   var seed = getSeed();
	   var previousSeed = -1;

	   var previousSeed = $('#wheel' + i).attr('class').slice(14);


	   while (parseInt(previousSeed) == seed) {
	   		seed = getSeed();
	   		console.log("seed has changed on " + seed);
	   }

	   var centerOrTopBottom = getSeed();

	   if (centerOrTopBottom % 2 == 0) { /*Bottom-Top*/
	   		bctSeed[i - 1] = 'TB' + seed; 
	   		$('#wheel'+ i).attr('class', 'wheel spin-TB-' + seed)
	   					  .css('animation', 'back-spin 1s, spin-TB-' + seed + ' ' + (timer + i * 0.5) + 's');
	   } else { /*Center*/
	   		bctSeed[i - 1] = 'CC' + seed;
	   		$('#wheel'+ i).attr('class', 'wheel spin-CO-' + seed)
	   					  .css('animation', 'back-spin 1s, spin-CO-' + seed + ' ' + (timer + i * 0.5) + 's');
	   }
	   	
 	}

 	checkWinComb(bctSeed);
}

function checkWinComb(data) {

	var dictTB = {
		2000: ["555", "000", "550", "500", "005", "055", "050", "505"],
		4000: ['444', '999', '449', '494', '944', '994', '949', '994'],
		150: ["555", "000", "550", "500", "005", "055", "050", "505", "444",
		"999", "449", "499", "994", "944", "949", "494"],
		75: ["004", "044", "440", "400", "404", "040", "009", "099", "990", "900", "909", "090",
		"554", "544", "445", "455", "454", "545", "559", "599", "995", "955", "959", "595",
		"115", "155", "551", "511", "515", "151", "110", "100", "001", "011", "010", "101", 
		"556", "566", "665", "655", "656", "565", "660", "600", "006", "066", "060", "606"],
		50: ["111", "666", "116", "166", "661", "611", "616", "161",
		"222", "777", "227", "277", "772", "722", "727", "272"],
		20: ["333", "888", "338", "388", "883", "833", "838", "383",
		"444", "999", "449", "499", "994", "944", "949", "494"],
		10: ["222", "777", "227", "277", "772", "722", "727", "272",
		"333", "888", "338", "388", "883", "833", "838", "383"],
		5: ["113", "133", "331", "311", "313", "131", "118", "188", "881", "811", "818", "181",
		"112", "122", "221", "211", "212", "121", "117", "177", "771", "711", "717", "171",
		"663", "633", "336", "366", "363", "636", "668", "688", "886", "866", "868", "686",
		"662", "622", "226", "266", "262", "626", "667", "677", "776", "766", "767", "676",
		"332", "322", "223", "233", "232", "323","337", "377", "773", "733", "737", "373",
		"882", "822", "228", "288", "282", "828", "887", "877", "778", "788", "787", "878",
		"224", "244", "442", "422", "424", "242", "229", "299", "992", "922", "929", "292",
		"223", "233", "332", "322", "323", "232", "228", "288", "882", "822", "828", "282",
		"774", "744", "447", "477", "474", "747", "779", "799", "997", "977", "979", "797",
		"773", "733", "337", "377", "373", "737", "778", "788", "887", "877", "878", "787",
		"443", "433", "334", "344", "343", "434","448", "488", "884", "844", "848", "484",
		"993", "933", "339", "399", "393", "939", "998", "988", "889", "899", "898", "989",
		"132", "123", "321", "312", "213", "231"]
	};

	var dictCC = {
		1000: ['222', '777', '227', '272', '722', '772', '727', '277'],
		150: ["111", "666", "116", "166", "661", "611", "616", "161"],
		75: ["112", "122", "221", "211", "212", "121", "117", "177", "771", "711", "717", "171",
		"662", "622", "226", "266", "262", "626", "667", "677", "776", "766", "767", "676"],
		50: ["333", "888", "338", "388", "883", "833", "838", "383"],
		20: ["000", "555", "005", "055", "550", "500", "505", "050"],
		10: ["444", "999", "449", "499", "994", "944", "949", "494"],
		5: ["330", "300", "003", "033", "030", "303", "335", "355", "553", "533", "535", "353",
		"334", "344", "443", "433", "434", "343", "339", "399", "993", "933", "939", "393",
		"880", "800", "008", "088", "080", "808", "885", "855", "558", "588", "585", "858",
		"884", "844", "448", "488", "484", "848", "889", "899", "998", "988", "989", "898",
		"004", "044", "440", "400", "404", "040", "009", "099", "990", "900", "909", "090",
		"554", "544", "445", "455", "454", "545", "559", "599", "995", "955", "959", "595"]
	};

	
	if (data[0].slice(0,2) == data[1].slice(0,2))
		if(data[1].slice(0,2) == data[2].slice(0,2)) {
			TopBotOrCent = data[0].slice(0,2);
			playerComb = '' + data[0].slice(2) + data[1].slice(2) + data[2].slice(2);
			
			console.log(TopBotOrCent);
			console.log(playerComb);

			if (TopBotOrCent == 'TB') {
				for (var key in dictTB) {
					for (var i = 0; i < dictTB[key].length; i++) {
						if (dictTB[key][i] == playerComb) {
							console.log('WIN');
							console.log(key);
						}
					} 

				}

			} else {
				for (var key in dictCC) {
					for (var i = 0; i < dictCC[key]; i++) {
						if (dictCC[key][i] == playerComb) {
							console.log('WIN');
							console.log(key);
						}
					} 

				}
			}
		}
	}

// All combinations was calculated with a help of this function

function combinations(str) {
    console.log(str[0]);
    console.log(str[1]);

    var tempArray = [];

    tempArray.push(str[0].repeat(3));
    tempArray.push(str[1].repeat(3));
    tempArray.push(str[0].repeat(2) + str[1]);
    tempArray.push(str[0] + str[1].repeat(2));
    tempArray.push(str[1].repeat(2) + str[0]);
    tempArray.push(str[1] + str[0].repeat(2));
    tempArray.push(str[1] + str[0] + str[1]);
    tempArray.push(str[0] + str[1] + str[0]);

    console.log(tempArray);

}

function updateCredit() {
	var credit = parseInt($('#input-credit').val());

	if (credit) {
		if (credit <= 5000 && credit >= 0) {
			$('#credit').text(credit);
			$('.spin').attr("disabled", false);
			$('input').hide();
		} else {
			Swal.fire({
  		  	  type: 'error',
  		  	  title: 'Oops...',
  		  	  text: 'Only Integers in range 0 ... 5000 are allowed',
		})
	}
		
	} else {
		Swal.fire({
  		  type: 'error',
  		  title: 'Oops...',
  		  text: 'Only Integers in range 0 ... 5000 are allowed',
		})
	}
	
}

function takeOneCoin() {
	var credit = parseInt($('#credit').text());
	credit = credit - 1;
	$('#credit').text(credit);
}

$(document).ready(function() {

	var countWheels = $("#container-for-reels div").length;

	for (i = 1; i < countWheels + 1; i++) {
		createSlots($('#wheel' + i))
	}

 	//spin start
 	$('.spin').on('click', function(){

 		takeOneCoin();

 		$(this).attr("disabled", true);

 		setTimeout(function() {
 			$('.spin').attr("disabled", false);
 		}, 3000);

 		var timer = 1.5;
 		spin(timer);
 	})
 });

