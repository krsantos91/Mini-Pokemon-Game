// global variable declaration
var spriteObject = {
	sprite1: {name:"Pikachu", imgsrc:"assets/images/pikachu.gif", basicname: "Swift", specialname:"Thunder", health:0, initialbasic:0, basic:0, special:0, defense:0, counter:0},
	sprite2: {name:"Bulbasaur", imgsrc:"assets/images/bulbasaur.gif", basicname:"Headbutt", specialname:"Vine Whip", health:0, initialbasic:0, basic:0, special:0, defense:0, counter:0},
	sprite3: {name:"Charmander", imgsrc:"assets/images/charmander.gif", basicname:"Bite", specialname:"Ember", health:0, initialbasic:0, basic:0, special:0, defense:0, counter:0},
	sprite4: {name:"Squirtle", imgsrc:"assets/images/squirtle.gif", basicname:"Tackle", specialname:"Watergun", health:0, initialbasic:0, basic:0, special:0, defense:0, counter:0}
}
var minStartHealth = 200;
var maxStartHealth = 300;
var minbasic = 8;
var maxbasic = 15;
var minspecial = 80;
var maxspecial = 150;
var mindefense = 15;
var maxdefense = 30;
var minCounter = 15;
var maxCounter = 40;
var player;
var enemies;
var currentEnemy;
var enemiesDefeated = 0;
player={};
enemies={};

// initialize game conditions
for(var i=1;i<5;i++){
	//initialize stats for each character
	spriteObject["sprite" + i].health = getRndInteger(minStartHealth,maxStartHealth);
	spriteObject["sprite" + i].basic = getRndInteger(minbasic,maxbasic);
	spriteObject["sprite" + i].initialbasic = spriteObject["sprite" + i].basic
	spriteObject["sprite" + i].special= getRndInteger(minspecial,maxspecial);
	spriteObject["sprite" + i].defense = getRndInteger(mindefense,maxdefense);
	spriteObject["sprite" + i].counter = getRndInteger(minCounter,maxCounter);
	//create divs to contain characters
	//create div to hold the character and an image tag to show the character
	var charbox = $("<button>");
	var image = $("<img>");
	//grab character name and character image source
	var pokemonName = spriteObject["sprite" + i].name;
	var imageSource = spriteObject["sprite" + i].imgsrc;
	//give image tag attributes and classes
	image.attr("src", imageSource);
	image.addClass("sprite");
	//give the div an id and class for styling
	charbox.attr("id", pokemonName);
	charbox.addClass("character-box");
	//append character button to html div then populate with image
	$("#charactercontainer").append(charbox);
	$("#"+pokemonName).append(image);
};

// help info displayed when help button is pressed
$("#helpbutton").on("click",function(){
	var bigbox = $("<div>");
	bigbox.addClass("container helpbox")
	var helpbox = $("<div>");
	helpbox.addClass("jumbotron ")
	helpbox.attr("style", "position:absolute;top:100px;margin-right:50px");
	helpbox.append("<h5>GAMEPLAY:</h5><br><h7>Each time the game is initalized, each pokemon is assigned a random health, basic attack(e.g. Tackle), special attack(e.g. Ember) and defense. The player chooses one character and must battle and defeat all 3 in order to win the game. The player always initiates the combat and the enemy pokemon attacks afterwards unless it is defeated.</h7><br><br><h5>ATTACK BUTTONS:<br><br>Basic Attack: Basic attacks never miss and get stronger each time they are used.<br><br>Special Attacks: Special attacks are much more powerful, but are not always accurate and will sometimes miss the enemy character. Additionally, special attacks receive a bonus multiplier when used against vulnerable Pokemon types (e.g. water against fire).<br><br>Defense: Increasing defense will increase the chance of an enemy's counter attacks missing. The max defense that a pokemon can have is 65.</h7><hr>");
	var closehelp = $("<div>");
	closehelp.addClass("btn btn-danger");
	closehelp.text("Close");
	closehelp.attr("style","text-align:center")
	helpbox.append(closehelp);
	bigbox.append(helpbox);
	$("#gamecontainer").append(bigbox);
})

// the button to exit out of the help menu
$(document).on("click",".helpbox",function(){
	$(".helpbox").remove();
})

$("#messagebox").append("<h6>Choose your pokemon!</h6>");	

// start the game when a character is selected as the player
$(".character-box").on("click", function(){
	//remove the character selection div from the screen
	$("#messagebox2").removeClass("hidden");
	$("#charactercontainer").remove();
	var selector = $(this).attr("id");
	var enemyCount = 1;
	//sort through the spriteObject sprites and assign them as the player or an enemy
	for (var i=1; i<5; i++){
		if (selector == spriteObject["sprite"+i].name){
			player = spriteObject["sprite"+i];
		}
		else{
			enemies["enemy"+ enemyCount] = spriteObject["sprite"+i];
			enemyCount ++;
		}
	}
	//print the player image to the playerbox div
	var myPlayer = $("<img>");
	myPlayer.attr("src", player.imgsrc);
	myPlayer.addClass("flipped gameSprite");
	$("#playerbox").append(myPlayer);
	//print the enemy images to the enemybox div as buttons
	for(var j = 1; j<4; j++){
		var myEnemy = $("<button>");
		var enemyimage = $("<img>");
		var enemyName = enemies["enemy"+j].name;
		var enemyImgSrc = enemies["enemy"+j].imgsrc;
		myEnemy.attr("id",(enemyName));
		myEnemy.addClass("character-box enemyplayer");
		enemyimage.attr("src", enemyImgSrc);
		enemyimage.addClass("gameSprite")
		enemyimage.attr("id",(enemies["enemy"+j].name+"image"));
		$("#enemybox").append(myEnemy);
		$("#" + enemyName).append(enemyimage);
	};
	//animate the characters being moved to their respective playerbox and enemybox divs
	$(".gameSprite").animate({ height: "100px", width: "100px" });
	//print the player stats and attack buttons to the playerbox div
	$("#playerstatsNAME").text("Name: " + player.name);
	$("#playerstatsHEALTH").text("Health: " + player.health + " HP");
	$("#playerstatsNAME").attr("style", "font-size:16px;padding:1px 3px;border: 1px solid black;")
	$("#playerstatsHEALTH").attr("style", "font-size:16px;padding:1px 3px;border: 1px solid black;")
	var basicAttack = $("<button>");
	var specialAttack = $("<button>");
	var defense = $("<button>");
	basicAttack.attr("id", "basicAttack");
	specialAttack.attr("id", "specialAttack");
	defense.attr("id", "defense");
	basicAttack.addClass("btn btn-primary basicAttack");
	specialAttack.addClass("btn btn-danger specialAttack");
	defense.addClass("btn btn-success defense");
	basicAttack.text(player.basicname + ": " + player.basic);
	specialAttack.text(player.specialname + ": " + player.special);
	defense.text("Defense: "+ player.defense);
	$("#playerstatsBUTTONS").append(basicAttack, specialAttack, defense);	
	$("#messagebox").empty();

	$("#messagebox").append("<h6>Choose a pokemon to battle! You must defeat all 3 to win.</h6>");
	$("#messagebox2").append("<div>Every time <span class='bg-primary'>basic attack</span> is used, its power increases.</div><br><div><span style='background-color:red;color:white'>Special attacks</span> is not always accurate.</div><br><div>Use <span style='background-color:#5cd65c;color:white'>defense</span> to increase chances of missed enemy attacks.</div>");
});

// when a enemy is selected, set it to the current fighter against player
$(document).on("click",".enemyplayer", function(){
	$("#messagebox").empty();
	if (enemiesDefeated == 0){
	$("#messagebox").append("<h6>Click an attack button to start playing.<br> You can swtich opponents at any time. Good luck!</h6>")
	}
	else{
	$("#messagebox").append("<h6>Click an attack button to start playing.</h6>")		
	}
	var name = $(this).attr("id");
	enemySelector(name);
	// print enemy stats to the enemybox div
	$("#enemystatsNAME").text("Name: " + currentEnemy.name);
	$("#enemystatsHEALTH").text("Health: " + currentEnemy.health);
	$("#enemystatsNAME").attr("style", "font-size:16px;padding:1px 3px;border: 1px solid black; visibility:visible")
	$("#enemystatsHEALTH").attr("style", "font-size:16px;padding:1px 3px;border: 1px solid black; visibility:visible")
	$("#enemystatsCounter").text(currentEnemy.basicname + ": " + currentEnemy.counter);
	$("#enemystatsCounter").attr("style", "font-size:20px;padding: 1px 3px;border: 1px solid black; visibility:visible");
});

// gameplay for a basic attack
$(document).on("click","#basicAttack", function(){
	if (currentEnemy.health > 0){
	$("#messagebox").empty();
	// check to see if theres an active enemy
		// deduct basic attack from enemy's health
		currentEnemy.health -= player.basic;
		player.basic += player.initialbasic;
		$(".basicAttack").text(player.basicname + ": " + player.basic);
		// if enemy's health < 0 enemy cannot attack and is removed from the game
		if (currentEnemy.health < 0){
			basicAttack();
			return;
		};
		// enemy took damage but is still alive, so check to see if counter attack is successful
		if(player.defense < 65 ){
			var a = getRndInteger(10,20);
			a += player.defense;					
		}
		else{
			var a = 65;
		}
		console.log("a" + a);
		var y = getRndInteger(35,120);
		console.log("y" + y)	
		// a < y so enemy attack is successful
		if (a < y){
			player.health -= currentEnemy.counter;
			basicCounterattack();
		};
		// a > y so player successfully dodges attack
		if(a >= y){
			basicAttack();
			// $("#messagebox").append("<h6>Enemy " + currentEnemy.name + "'s attack missed! No health lost.</h6>");
		};		
	}
	else{
		$("#messagebox").text("No enemy selected. Please select a Pokemon to battle!");
	}
});

// gameplay for a special attack
$(document).on("click", "#specialAttack", function(){
	if(currentEnemy.health >0){
	$("#messagebox").empty();
	// check to see for active enemy
		// decides whether the special attack lands or not
		var x = Math.random() * 100
		var y = (36.43- 1/7*player.special);
		console.log("random number: " + x)
		console.log("special probability: " + y);
		// SPECIAL ATTACK IS SUCCESSFUL
		if (x < y){
			if ((player.name == "Pikachu" && currentEnemy.name == "Squirtle") || (player.name == "Squirtle" && currentEnemy.name == "Charmander") || (player.name == "Charmander" && currentEnemy.name == "Bulbasaur") || (player.name == "Bulbasaur" && currentEnemy.name == "Squirtle")){
				currentEnemy.health -= Math.floor((0.25*player.special))
			}
			currentEnemy.health -= player.special;
			// ENEMY IS GOING TO DIE, DOESNT GET OPPORTUNITY TO ATTACK
			if (currentEnemy.health < 0){
				specialAttack();
				return;
			}
			// CHECK TO SEE IF ENEMY'S ATTACK IS SUCCESSFUL OR MISSES
			else{
				if(player.defense < 65 ){
					var a = getRndInteger(10,20);
					a += player.defense;					
				}
				else{
					var a = 65;
				}
				console.log("a" + a);
				var y = getRndInteger(30,120);
				console.log("y" + y)
				if (a<y){
					player.health  -= currentEnemy.counter;
					specialCounterattack();
				}
				else {
					specialAttack();
				}
			}
		}
		// SPECIAL ATTACK MISES
		else{
			$("#messagebox").append("<h6>" + player.name + "'s attack: " + player.specialname + " missed.</h6>")
			if(player.defense < 65 ){
				var a = getRndInteger(10,20);
				a += player.defense;					
			}
			else{
				var a = 65;
			}
			console.log("a" + a);
			var y = getRndInteger(30,120);
			console.log("y" + y)
			if (a<y){
				player.health  -= currentEnemy.counter;
				counter();
			}
			if (a>=y){
				countermiss();
			}
		}
	}
	else{
	 	$("#messagebox").text("No enemy selected. Please select a Pokemon to battle.");
	 }	
});

// gameplay for defense increase
$(document).on("click", "#defense", function(){
	if (player.defense == 65){
		$("#messagebox").empty();
		$("#messagebox").append("<h6> Defense is a maximum value 65</h6>")
		$("#defense").removeClass("btn-success");
		$("#defense").addClass("btn-basic");
		return;
	}
	if(currentEnemy.health >0){
	$("#messagebox").empty();
	var x = getRndInteger(5,10);
	if((x + player.defense) > 65){
		player.defense = 65;
		$("#messagebox").append("<h6>" + player.name + " is at maximum defense.</h6>")
	}
	else{
		$("#messagebox").append("<h6>" + player.name + " increased defense.</h6>")
		player.defense += x;
	}
	$("#defense").empty();
	$("#defense").addClass("animated bounceOutUp").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
		function(){
			$("#defense").text('Defense: ' + player.defense);
			$("#defense").removeClass("animated bounceOutUp");
			$("#defense").addClass("animated bounceInDown").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', 
				function(){
					$("#defense").removeClass("animated bounceInDown");
					if(player.defense < 65 ){
						var a = getRndInteger(10,20);
						a += player.defense;					
					}
					else{
						var a = 65;
					}
					console.log("a" + a);
					var y = getRndInteger(30,120);
					console.log("y" + y);
					if (a<y){
						player.health  -= currentEnemy.counter;
						counter();					}
					if (a>=y){
						countermiss();					}
				})
		})	
	}
	else{
		$("messagebox").text("No enemy selected. Please select a pokemon to battle!")
	}
});

// FUNCTIONS
function enemySelector(enemyname){
	if(enemyname === "Pikachu"){
	currentEnemy = spriteObject["sprite1"];
	};
	if(enemyname === "Bulbasaur"){
		currentEnemy = spriteObject["sprite2"];
	};
	if(enemyname === "Charmander"){
		currentEnemy = spriteObject["sprite3"];
	};
	if(enemyname === "Squirtle"){
		currentEnemy = spriteObject["sprite4"];
	};
	//animate the current enemy
	for(k=1;k<4;k++){
		if (currentEnemy.name === enemies["enemy"+k].name){
			$("#"+currentEnemy.name+"image").animate({height:"100px",width:"100px"});
		}
		else{
			$("#"+enemies["enemy"+k].name+"image").animate({height:"50px",width:"50px"});
		}
	}
};

// animations for each type of attack
function basicAttack(){
	var me ="#playerbox";
	var computer = "#" + currentEnemy.name + "image";
	$("#messagebox").append("<h6>" + player.name + " attacked with " + player.basicname + ".</h6>")						
	$(me).addClass("animated lightSpeedOut").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
		function(){
			$(me).removeClass("animated lightSpeedOut");
			$(computer).addClass("animated jello").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
				function(){
					$(computer).removeClass("animated jello");
					changeHealth("#enemystatsHEALTH", currentEnemy.health);
					if(currentEnemy.health <= 0){
						console.log("he died!");
						isDead();
						return;
					}					
					$(computer).addClass("animated fadeOutLeft").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
						function(){
							$(computer).removeClass("animated fadeOutLeft");
							$("#messagebox").append("<h6>Enemy " + currentEnemy.name + "'s attack missed! No health lost.</h6>");			
						})

				})
		});
};

function specialAttack(){
	var me ="#playerbox";
	var computer = "#" + currentEnemy.name + "image";
	$(".flipped").animate({height:"160px",width:"160px"});
	$("#messagebox").append("<h6>" + player.name + "'s attack " + player.specialname + " was successful!</h6>")	
	if ((player.name == "Pikachu" && currentEnemy.name == "Squirtle") || (player.name == "Squirtle" && currentEnemy.name == "Charmander") || (player.name == "Charmander" && currentEnemy.name == "Bulbasaur") || (player.name == "Bulbasaur" && currentEnemy.name == "Squirtle")){
		$("#messagebox").append("<h6>" + player.specialname + " was super effective. 125% damage done.</h6>");	
	}	
	$(me).addClass("animated wobble").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
		function(){
			$(me).removeClass("animated wobble");
			$(".flipped").animate({height:"100px", width:"100px"});			
			$(computer).addClass("animated rollOut").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
				function(){
					$(computer).removeClass("animated rollOut");							
					changeHealth("#enemystatsHEALTH", currentEnemy.health);
					if(currentEnemy.health <= 0){
						console.log("he died!");
						isDead();
						return;
					}					
					$(computer).addClass("animated fadeOutLeft").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
						function(){
							$(computer).removeClass("animated fadeOutLeft");
						})

				})
		});
};

function basicCounterattack(){
	var me = "#playerbox";
	var computer ="#" + currentEnemy.name + "image"
	$("#messagebox").append("<h6>" + player.name + " attacked with " + player.basicname + ".</h6>")						
	$(me).addClass("animated lightspeedOut").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
		function(){
			$(me).removeClass("animated lightspeedOut");
			$(computer).addClass("animated jello").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', 
				function(){
					$(computer).removeClass("animated jello");
					changeHealth("#enemystatsHEALTH", currentEnemy.health);
					if(currentEnemy.health <= 0){
						console.log("he died!");
						isDead();
						enemiesDefeated ++;
						if(enemiesDefeated === 3){
							setTimeout(gameOver("W"),5000);
						}
						return;
					}
					$(computer).addClass("animated fadeOutLeft").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
						function(){
							$(computer).removeClass("animated fadeOutLeft");
							$(me).addClass("animated jello").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
								function(){
									$(me).removeClass("animated jello");
									$("#messagebox").append("<h6>" + currentEnemy.name + " attacked with " + currentEnemy.basicname + ".</h6>")														
									changeHealth("#playerstatsHEALTH", player.health);
									if(player.health <= 0){
									setTimeout(gameOver("L"), 5000);								
									}
								});
						});					
				});
		});
};

function specialCounterattack(){
	var me = "#playerbox";
	var computer ="#" + currentEnemy.name + "image";
	$(".flipped").animate({height:"160px",width:"160px"});
	$("#messagebox").append("<h6>" + player.name + "'s attack " + player.specialname + " was successful!</h6>")		
	if ((player.name == "Pikachu" && currentEnemy.name == "Squirtle") || (player.name == "Squirtle" && currentEnemy.name == "Charmander") || (player.name == "Charmander" && currentEnemy.name == "Bulbasaur") || (player.name == "Bulbasaur" && currentEnemy.name == "Squirtle")){
		$("#messagebox").append("<h6>" + player.specialname + " was super effective. 125% damage done.</h6>");	
	}		
	$(me).addClass("animated wobble").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
		function(){
			$(me).removeClass("animated wobble");
			$(".flipped").animate({height:"100px", width:"100px"});
			$(computer).addClass("animated rollOut").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', 
				function(){
					$(computer).removeClass("animated rollOut");				
					changeHealth("#enemystatsHEALTH", currentEnemy.health);
					if(currentEnemy.health <= 0){
						console.log("he died!");
						isDead();
						enemiesDefeated ++;
						if(enemiesDefeated === 3){
							gameOver("W");
						}
						return;
					}
					$(computer).addClass("animated fadeOutLeft").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
						function(){
							$(computer).removeClass("animated fadeOutLeft");
							$(me).addClass("animated jello").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
								function(){
									$(me).removeClass("animated jello");
									$("#messagebox").append("<h6>Enemy " + currentEnemy.name + " attacked with " + currentEnemy.basicname);								
									changeHealth("#playerstatsHEALTH", player.health);
									if(player.health <= 0){
									gameOver("L");									
									}
								});
						});					
				});
		});
};

function counter(){
	var me = "#playerbox";
	var computer = "#" + currentEnemy.name + "image";
	$(computer).addClass("animated fadeOutLeft").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
		function(){
			$(computer).removeClass("animated fadeOutLeft");
			$(me).addClass("animated jello").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
				function(){
					$(me).removeClass("animated jello");
					$("#messagebox").append("<h6>Enemy " + currentEnemy.name + " attacked with " + currentEnemy.basicname);								
					changeHealth("#playerstatsHEALTH", player.health);
					if(player.health <= 0){
					gameOver("L");									
					}
				});			
		});
};

function countermiss(){
	var computer = "#" + currentEnemy.name + "image";
	$(computer).addClass("animated fadeOutLeft").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
		function(){
			$(computer).removeClass("animated fadeOutLeft");
			$("#messagebox").append("<h6>Enemy " + currentEnemy.name + "'s attack missed! No health lost.</h6>");			
		});	
};

// function to change health. x= which character's health to change y = new health value
function changeHealth(x,y){
	$(x).empty();
	$(x).addClass("animated fadeOut").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
		function(){
			$(x).removeClass("animated fadeOut");				
			$(x).text("Health: " + y);
			$(x).addClass("animated fadeIn").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
				function(){
					$(x).removeClass("animated fadeIn");
				});
		});
};

function isDead(){		
	$("#"+currentEnemy.name+"image").addClass("animated fadeOutDown").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', 
		function(){
		$("#"+currentEnemy.name).remove();
		$("#enemystatsNAME").attr("style", "visibility:hidden");
		$("#enemystatsHEALTH").attr("style", "visibility:hidden");
		$("#enemystatsCounter").attr("style", "visibility:hidden");
		if (enemiesDefeated < 3){
		$("#messagebox").text("You defeated " + currentEnemy.name + "! Please select another Pokemon to battle.");
		}
		enemiesDefeated ++;
		console.log(enemiesDefeated);
		if(enemiesDefeated === 3){
			gameOver("W");
		}
		});	
};
 // takes in input as W for win or L for loss and displays corresponding message
function gameOver(x){
	$("#messagebox").remove();
	$("#messagebox2").remove();
	var mymessage = $("<div>")
	mymessage.addClass("Jumbotron")
	if(x === "W"){
		mymessage.append("<h6>Congratulations, you won! Please refresh to play again!</h6>")
	}
	else{
		$("#player").remove();
		mymessage.append("<h6>Sorry, better luck next time. Thanks for playing! Please refresh the browser to play again.</h6>");
	}	
	mymessage.addClass("animated bounceInDown");
	$(".container").append(mymessage);


	// $("#gamecontainer").addClass("animated jello").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
	// 	function(){
	// 		$("#gamecontainer").remove();
	// 		var message = $("<div>");
	// 		message.addClass("jumbotron");
	// 		if(x === "W"){
	// 			message.append("<h6>Congratulations, you won! Please refresh to play again!</h6>")
	// 		}
	// 		else{
	// 			message.append("<h6>Sorry, better luck next time. Thanks for playing! Please refresh the browser to play again.</h6>");
	// 		}
	// 		$(".container").append(message);
	// 	});
};

function getRndInteger(min, max) {
return Math.floor(Math.random() * (max - min + 1) ) + min;
};


