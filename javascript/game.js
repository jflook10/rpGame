//onload function
$(document).ready(function(){

//global variables
// Each character in the game has 3 attributes: Health Points, Attack Power and Counter Attack Power.
//var healthPts = $("section").attr("data-hp");
var attackPower = "" ;
var counterAttack = "";
var selectPlayer = true;
var selectOpponent = false;
var player;
var opponent;
var winsVar = 0;
var globalAP; 
//var winsCount = $("#winsCount");


//put the hp into the span of the closest char 

	for (var i= 0; i < 4; i++){
		var sectVal = $("section")[i]; //gets all sections at i
		console.log(sectVal);
		var spanVal = $("span")[i];  //set var for spans at i
	  	//var healthPts = $(sectVal).attr("data-hp"); //gets the hp for the specific sect at i
	  $(spanVal).html($(sectVal).attr("data-hp"));  //sets the inner html of the span for its related sect
	}


//select player and highlight selected player with css.
$(".char").click(function(){
	if(selectPlayer){	
		$(this).addClass("highlightPlay");
		player = this;
		globalAP = +$(player).data("ap") //set global var CA to call additively later THIS ISNT WORKINNGGG!!!!!

		//when player selected, move remaining players to right and prompt to select first attacker. 
		$("#instructions").html("Please select your opponent");
		console.log($(player).attr("id"));
		selectOpponent = true;
		selectPlayer =false;
	}else if(!selectPlayer&&selectOpponent){
		$(this).addClass("highlightOpp");
		opponent = this;
		$("#instructions").html("Attack your opponent")	
		console.log($(opponent).attr("id"));
		selectOpponent = false;	
	}
	//stop playing the game
	else{
		return false;
	}
});

 

//set attack and defeat rules
	$("#attack").on("click", function(){
		//when clicks attack, opponent hp - player attack
		var oppHP = +$(opponent).data("hp");

		//get players AP
		var playerAP= $(player).data("ap");
		console.log(playerAP + "player AP");
		//decrease opponents HP with players AP
		oppHP = oppHP - playerAP;
		console.log()

		//What to do when your opponents HP <= 0
		if (oppHP <= 0){
			$(opponent).addClass("defeatedOpp");
			var oppLocation = opponent;
			$(opponent).clone().appendTo("#defeatedOpp");
			$(oppLocation).hide();

			// $(opponent).append("#defeatedOpp");
			selectOpponent = true;
			console.log(opponent + " new opponent");

			//increase wins counter 
			winsVar++;
			$("#winsCount").html(winsVar);


			//when to select new opponent or stop game
			if (winsVar <3) {
				$("#instructions").html("You've subdued your opponent, select another")	
				$(opponent)
				console.log(winsVar);
			} else{
				$("#instructions").html("Your mission has prevailed and you defeated all of your opponents");
				return false;
			}
			
		}

		//change opponent HP in the data and in html
		$(opponent).data("hp", oppHP);
		$(opponent).find("span").html(oppHP);

		//player hp - opponent counter attack
		var playerHP = +$(player).data("hp");
		var oppCA = +$(opponent).data("ca");
		playerHP = playerHP - oppCA;
		console.log(playerHP + " player HP");
		console.log(oppCA + " opp CA");
		$(player).data("hp", playerHP);
		$(player).find("span").html(playerHP);

		//player attack + +$(data-ap)
		$(player).data("ap", playerAP + globalAP);
		playerAP = playerAP + globalAP;
		console.log(playerAP);

		
		if(playerHP <= 0){
			alert("You've been defeated")
			selectOpponent = false;
			selectPlayer = false;
			return false;
		}


		
		//reset game with refresh page
		$("#reset").on("click", function(){
			location.reload(true);
		})

	});


});//end document ready




//PSEUDO-CODE
// move selected attacker to row 2

// Each time the player attacks, their character's Attack Power increases by its base Attack Power.

// if the base Attack Power is 6, each attack will increase the Attack Power by 6 (12, 18, 24, 30 and so on).
// The enemy character only has Counter Attack Power. Counter Attack Power never changes.


// No characters in the game can heal or recover Health Points.

