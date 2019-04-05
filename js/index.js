const SLOTS_PER_REEL = 10;
const REEL_RADIUS = (266 / 2) / Math.tan (Math.PI / SLOTS_PER_REEL);
const IMAGE_ARRAY = ['bar-3', 'bar', 'bar-2', 'seven', 'cherry'];
var previousTotal = 0;
var currentTotal = 0;
var userMode = true;
var iconSelectedValues = [];
var iconSelected = [];
var levelSelected = ["Top", "Top", "Top"];


        window.onload = function(){

        for (let i = 1; i < 4; i++) {
            	
            iconSelected[i - 1] = new IconSelect("my-icon-select" + i);

            document.getElementById('my-icon-select' + i).addEventListener('changed', function(e){
               iconSelectedValues[i - 1] = iconSelected[i - 1].getSelectedValue();
               console.log(iconSelectedValues);
            });
            
            var icons = [];
            icons.push({'iconFilePath':'images/3XBAR.png', 'iconValue':'1'});
            icons.push({'iconFilePath':'images/BAR.png', 'iconValue':'2'});
            icons.push({'iconFilePath':'images/2XBAR.png', 'iconValue':'3'});
            icons.push({'iconFilePath':'images/7.png', 'iconValue':'4'});
            icons.push({'iconFilePath':'images/cherry.png', 'iconValue':'5'});
            
            iconSelected[i - 1].refresh(icons);

            $("#developer-mode-TCB-select" + i).change(function(){
       			levelSelected[i - 1] = $(this).children("option:selected").val();
       			console.log(levelSelected);
    	   	});



       	}
	       	
       }


/* In reel they will be seen in BOTTOM-line (TOP-BOTTOM case) (TOP + 3)
 * 0 - barx3
 * 1 - bar
 * 2 - barx2
 * 3 - seven
 * 4 - cherry
 * 5 - barx3
 * 6 - bar
 * 7 - barx2
 * 8 - seven
 * 9 - cherry
*/ 

/* In reel they will be seen in TOP-line (TOP-BOTTOM case) (BOT - 3)
 * 0 - cherry
 * 1 - barx3
 * 2 - bar
 * 3 - barx2
 * 4 - seven
 * 5 - cherry
 * 6 - barx3
 * 7 - bar
 * 8 - barx2
 * 9 - seven
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


function userModeOn(data) {
	userMode = true;
	$(data).css("border", "solid 2px rgb(66, 244, 244)");
	$("#mode>button:nth-child(2)").css("border", "2px solid black");
	$('#container-for-developer').hide();
}

function developerModeOn(data) {
	userMode = false;
	$(data).css("border", "solid 2px rgb(66, 244, 244)");
	$("#mode>button:nth-child(1)").css("border", "2px solid black");

	$('#container-for-developer').show();
}

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

function getTopCenterBottom() {
	return Math.floor(Math.random()*(SLOTS_PER_REEL - 1));
}

function spin(timer) {

	var bctSeed = [-1,-1,-1]; //Bottom, Top, Center seed;

	for(var i = 1; i < 4; i++) {

		var seed = getSeed();
		var previousSeed = -1;

		var previousSeed = $('#wheel' + i).attr('class').slice(14);


		while (parseInt(previousSeed) == seed) {
			seed = getSeed();
		}

		var centerOrTopOrBottom = getTopCenterBottom();

		if (userMode == true) {

			if (centerOrTopOrBottom >= 0 &&  centerOrTopOrBottom < 3) {
				bctSeed[i - 1] = 'TT' + seed; 
				$('#wheel'+ i).attr('class', 'wheel spin-TT-' + seed)
				.css('animation', 'back-spin 1s, spin-TT-' + seed + ' ' + (timer + i * 0.5) + 's');

			} else if (centerOrTopOrBottom >= 3 && centerOrTopOrBottom < 6 ) {
				bctSeed[i - 1] = 'BB' + seed; 
				$('#wheel'+ i).attr('class', 'wheel spin-BB-' + seed)
				.css('animation', 'back-spin 1s, spin-BB-' + seed + ' ' + (timer + i * 0.5) + 's');
			} else {
				bctSeed[i - 1] = 'CC' + seed;
				$('#wheel'+ i).attr('class', 'wheel spin-CC-' + seed)
				.css('animation', 'back-spin 1s, spin-CC-' + seed + ' ' + (timer + i * 0.5) + 's');
			}
		} else {

			if ("Top" == levelSelected[i - 1]) {
				seed = (iconSelectedValues[i - 1]);

				bctSeed[i - 1] = 'TT' + seed; 
				$('#wheel'+ i).attr('class', 'wheel spin-TT-' + seed)
				.css('animation', 'back-spin 1s, spin-TT-' + seed + ' ' + (timer + i * 0.5) + 's');

			} else if ("Bottom" == levelSelected[i - 1]) {
				seed = (parseInt(iconSelectedValues[i - 1]) - 1);
				bctSeed[i - 1] = 'BB' + seed; 
				$('#wheel'+ i).attr('class', 'wheel spin-BB-' + seed)
				.css('animation', 'back-spin 1s, spin-BB-' + seed + ' ' + (timer + i * 0.5) + 's');

			} else if ("Center" == levelSelected[i - 1]) {
				
				seed = (parseInt(iconSelectedValues[i - 1]) + 2);
				bctSeed[i - 1] = 'CC' + seed;
				$('#wheel'+ i).attr('class', 'wheel spin-CC-' + seed)
				.css('animation', 'back-spin 1s, spin-CC-' + seed + ' ' + (timer + i * 0.5) + 's');
			}
		}

 	}

 	var playerWinCombinations = checkWinComb(bctSeed);

 	if (previousTotal != currentTotal)
 		blinksAndIncrement(playerWinCombinations);
}

function checkWinComb(data) {

			countTopBottom = 0;
			countCenter = 0;
			playerWinCombinations = [];

			for (var i = 0; i < 3; i++) {
				if (data[i].slice(0, 2) == 'TT' || data[i].slice(0, 2) == 'BB') {
					countTopBottom += 1;
				} else {
					countCenter += 1;
				}
			}

			playerComb = '' + data[0].slice(2) + data[1].slice(2) + data[2].slice(2);
			

			if (countTopBottom == 3) {
				var playerComb = '';
				for (var i = 0; i < 3; i++) {
					if (data[i].slice(0, 2) == 'TT')
						playerComb += data[i].slice(2);
					else 
						playerComb += (((parseInt(data[i].slice(2)) - 3) + 10) % 10).toString();
				}

				for (var key in dictTT) {
					for (var i = 0; i < dictTT[key].length; i++) {
						if (dictTT[key][i] == playerComb) {
							playerWinCombinations.push('TT' + playerComb);
							currentTotal += parseInt(key);	
						}
					} 

				}

			} if (countTopBottom == 3) {

				var playerComb = '';
				for (var i = 0; i < 3; i++) {
					if (data[i].slice(0, 2) == 'BB')
						playerComb += data[i].slice(2);
					else 
						playerComb += ((parseInt(data[i].slice(2)) + 3) % 10).toString();
				}

				for (var key in dictBB) {
					for (var i = 0; i < dictBB[key].length; i++) {						
						if (dictBB[key][i] == playerComb) {
							playerWinCombinations.push('BB' + playerComb);
							currentTotal += parseInt(key);	
						}
					} 
				}
			} if (countCenter == 3) {

				var playerComb = '';
				playerComb = '' + data[0].slice(2) + data[1].slice(2) + data[2].slice(2);  
				for (var key in dictCC) {
					for (var i = 0; i < dictCC[key].length; i++) {
						if (dictCC[key][i] == playerComb) {
							playerWinCombinations.push('CC' + playerComb);
							currentTotal += parseInt(key);	
						}
					} 
				}
			}

			console.log(playerWinCombinations);

			return playerWinCombinations;
		}

function blinksAndIncrement(data) {

			
		targetSlot = '';
		targetSlotReflected = '';

		setTimeout(function() {
			for (var j = 0; j < data.length; j++) {
				for (var i = 1; i < 4; i++) {

					if (data[j].slice(0, 2) == "BB") { 
						targetSlot = (parseInt(data[j].charAt(i + 1)) + 1) % 10;
						targetSlotReflected = (targetSlot + 5) % 10;
					}

					if (data[j].slice(0, 2) == "TT") {
						targetSlot = (parseInt(data[j].charAt(i + 1))) % 10;
						targetSlotReflected = (targetSlot + 5) % 10;
					}

					if (data[j].slice(0, 2) == "CC") {
						targetSlot = (parseInt(data[j].charAt(i + 1)) + 3) % 10;
						targetSlotReflected = (targetSlot + 5) % 10;
					}


					$('#wheel'+ i).find('*').each(function() {
						
						if ($(this).index() == targetSlot || $(this).index() == targetSlotReflected) {
							$(this).css('animation-name', 'blink-slot')
							.css('animation-duration', '2.0s');
						}
					});
				}
			}
		}, 2960);

		setTimeout(function() {
			for (var i = 1; i < 4; i++) {
				$('#wheel'+ i).find('*').each(function() {
					$(this).css('animation-name', '')
					.css('animation-duration', '');
				});
			}
		}, 5000);

		setTimeout(function() {
			$("#win-window").attr('class', 'blink-win-border');
		}, 3000);

		setTimeout(function() {
			$({value: previousTotal}).animate({value: currentTotal}, {
				duration: 2000,
				easing:'swing', 
				step: function() {$('#win-coins').text((Math.round(this.value)))}		
			})}, 3000);

		setTimeout(function() {
			$("#win-window").attr('class', 'win-table');
			previousTotal = currentTotal;
		}, 4500);

}

function updateCredit(data) {
	var credit = parseInt($('#input-credit').val());

	if (credit) {
		if (credit <= 5000 && credit >= 0) {
			$('#credit').text(credit);
			$('.spin').attr("disabled", false);
			$(data).hide();
			$('#input-credit').hide();
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

	if (credit < 0) {
		Swal.fire({
  		  	  type: 'error',
  		  	  title: 'Oops...',
  		  	  text: 'You have not got any coins more, refresh a page',
		})

		$('.spin').off('click');
		return false;
	}

	$('#credit').text(credit);

}

$(document).ready(function() {

	//Generate of all possible winning combinations

	const BB4000 = Combinatorics.baseN(['4', '9'], 3).toArray(); // bottom
	const TT2000 = Combinatorics.baseN(['0', '5'], 3).toArray(); // top
	const CC1000 = Combinatorics.baseN(['2', '7'], 3).toArray(); //center
	const TT150 = Combinatorics.baseN(['4', '9'], 3).toArray() //top
	const BB150 = Combinatorics.baseN(['3', '8'], 3).toArray();;
	const CC150 = Combinatorics.baseN(['1', '6'], 3).toArray();; 
	const TT75 = Combinatorics.baseN(['0','5', '4', '9'], 3).toArray()
	.filter(function (el) {
		return !(TT150.includes(el) || TT2000.includes(el))
	})
	const BB75 = Combinatorics.baseN(['4','9','3','8'], 3).toArray()
	.filter(function (el) {
		return !(BB4000.includes(el) || (BB150.includes(el)))
	});
	const CC75 = Combinatorics.baseN(['1', '6', '2', '7']).toArray()
	.filter(function (el) {
		return !(CC150.includes(el) || CC1000.includes(el))
	});
	const TT50 = CC150; // 1, 6
	const BB50 = TT2000; // 0, 5
	const CC50 = BB150; //3, 8
	const TT20 = BB150; //3 ,8
	const BB20 = CC1000; //2, 7
	const CC20 = TT2000; //0, 5
	const TT10 = CC1000; //	2, 7
	const BB10 = CC150; //1, 6
	const CC10 = BB4000; //4, 9

	const TT5 = Combinatorics.baseN(['3', '8', '2', '7', '1', '6'], 3).toArray().
	filter(function (el) {
		return !(TT50.includes(el) || TT10.includes(el) || TT20.includes(el))
	});

	const BB5 = Combinatorics.baseN(['0', '5', '2', '7', '1', '6'], 3).toArray().
	filter(function(el) {
		return !(BB50.includes(el) || BB10.includes(el) || BB20.includes(el))
	});

	const CC5 = Combinatorics.baseN(['3', '8', '4', '9', '0', '5'], 3).toArray().
	filter(function (el) {
		return !(CC50.includes(el) || CC20.includes(el) || CC10.includes(el))
	});

	dictTT = {
		2000: TT2000,
		150: TT150,
		50: TT50,
		75: TT75,
		20: TT20,
		10: TT10,
		5: TT5
	};

	dictBB = {
		4000: BB4000,
		150: BB150,
		75: BB75,
		50: BB50,
		20: BB20,
		10: BB10,
		5: BB5
	};

	dictCC = {
		1000: CC1000,
		150: CC150,
		75: CC75,
		50: CC50,
		20: CC20,
		10: CC10,
		5: CC5
	};	

	var countWheels = $("#container-for-reels div").length;

	for (i = 1; i < countWheels + 1; i++) {
		createSlots($('#wheel' + i))
	}


	$('#xray').on('click',function(){
 		//var isChecked = $('#xray:checked');
 		var tilt = 'tiltout';
 		
    if($(this).is(':checked')) {
 			tilt = 'tiltin';
 			
 			$('.slot').addClass('backface-on');
 			$('#container-for-reels').css('animation',tilt + ' 2s 1');
 			$('#container-for-reels').css('overflow','visible');

			setTimeout(function(){
			  $('#container-for-reels').toggleClass('tilted');
			},2000);
 		} else {
      tilt = 'tiltout';
 			$('#container-for-reels').css({'animation':tilt + ' 2s 1'});

			setTimeout(function(){
	 			$('#container-for-reels').toggleClass('tilted');
	 			$('.slot').removeClass('backface-on');
	 			$('#container-for-reels').css('overflow','hidden');
	 			
	 		},1900);
 		}
 	})

 	//spin start
 	$('.spin').on('click', function(){

 		if (takeOneCoin() == false) {
 			return 0;
 		}

 		for (var i = 0; i < 3; i++) {

 			$('#wheel' + i).find('*').each(function() {
 				$(this).css('animation-name', 'none');
 						
 			})
 		}

 		$(this).attr("disabled", true);

 		$('.wheel').css('margin-top', '0px');

 		setTimeout(function() {
 			$('.spin').attr("disabled", false);
 		}, 3000);

 		var timer = 1.5;
 		spin(timer);
 	})
 });

