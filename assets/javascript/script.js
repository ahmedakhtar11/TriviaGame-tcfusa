$(document).ready(function() {

	//CSS Manipulation
	$("#title").css("color", "purple").css("font-weight", "bolder");
	$("body").css("color", "#02153F");

	// Audio for Theme Song
    var audioElement = document.createElement("audio");
    audioElement.setAttribute("src", "assets/finalfantasyzanarkand.mp3");

    // Theme Music Play Button
    $(".theme-button").on("click", function() {
        audioElement.play();
    });

    // Theme Music Pause Button
    $(".pause-button").on("click", function() {
        audioElement.pause();
    });

    //Var array to hold correct answers
	var correctoptions = ["1652", "266 Thousand", "25 years", "10,100 female teachers", "110", "All of the Above", "All of the Above"];

	//Var array to reference images]
	var correctImage = ["a.jpg", "b.jpg", "c.jpg", "d.jpg", "e.jpg", "f.jpg", "g.jpg"];

	//Var to hold Wrong option total
	let wrongoption = 0;

	//Var to hold Unanswered question totals
	let unanswered = 0;

	//Var to hold totalscore
	var totalscore = 0;

	//Var for timer
	var timer;

	//Var for intervalId
	var intervalId;

	// Var to hold index of current question.
    var questionIndex = 0;

    // Var to hold current index of options.
    var optionIndex = 0;

    // Var to Start the Game.
    var begingame;


	//Var Array for all option choices
	const options = {
        choices1: ["1950", "1652", "200", "950"],
        choices2: ["15 Thousand", "55 Thousand", "266 Thousand", "110 Thousand"],
        choices3: ["5 years", "10 years", "25 years", "30 years"],
        choices4: ["10,100 female teachers", "3,000 female teachers", "6,000 female teachers", "1,500 female teachers"],
        choices5: ["50", "20", "110", "65"],
        choices6: ["A Free Quality Education", "College Scholarships", "School and Safety Supplies", "All of the Above" ],
        choices7: ["A U.S. Nonprofit", "Tax Deductible 501(c)(3) Nonprofit", "Builder of Schools in Pakistan", "All of the Above"],
      };

    //Var Array for all question choices
	const questions = {
        question1: ["How many Schools does TCF Operate as of 2021?"],
        question2: ["How many students does TCF teach?"],
        question3: ["How long has TCF been teaching Pakistani Children?"],
        question4: ["How many female teachers does TCF employ?"],
        question5: ["How many Towns/Cities in Pakistan does TCF have schools in?"],
        question6: ["What does TCF provide to students?"],
        question7: ["What is TCF-USA?"]
      };

    // Const to hold Array of Questions
    const questionsArray = [questions.question1, questions.question2, questions.question3, questions.question4, questions.question5, questions.question6, questions.question7];
      
    // Const to hold Array of Answers
    const optionsArray = [options.choices1, options.choices2, options.choices3, options.choices4, options.choices5, options.choices6, options.choices7];

    //Jquery Hide Reset Button
    $('#buttonreset').hide();

	//Start Game
	$('#buttonstart').click(function(){

	//Function to Start Game
	begingame = true;
	gamestart();
	//Hide the start button
	$('#buttonstart').hide();
	showreset();

	});

	//Function to start Game
	function gamestart() {
		showquestions();
	};

	//Ask First Question
	function showquestions(){

	//Start timer
	time();

	//This asks and displays the questions
    $('#start').html('<h2>'+questionsArray[questionIndex][0]+'</h2>');
    logArray(optionsArray[optionIndex]);
	};

	//Next question function
	function nextquestion() {

	//If Else Statement. Setting Number of Questions
	if(questionIndex < 6){
		optionIndex++;
		questionIndex++;
		showquestions();
		$("#option0, #option1, #option2, #option3").show();
		$('#images').hide();
		}

	//Game ends after all questions
	else if (questionIndex === 6){
		begingame = false;
		endgame();
		$("#option0, #option1, #option2, #option3").hide();
		$('#timeclock').hide();
		$('#images').hide();
		$('#start').html("<h2>Incorrect Answers: "+ wrongoption+"<br>Correct Answers: "+totalscore+"<br>Unanswered Questions: "+unanswered+'</h2>');
		showreset();
		}
	};


	//Choosing the Correct Answer
	$("#option0, #option1, #option2, #option3").on("click", function(rightanswer) {

		var rightanswer = "";
		rightanswer = $(this).text();
		
	//Events after the Correct Answer is Picked
		if(rightanswer == correctoptions[optionIndex]){
			$('#start').html("<h2>Correct! The Answer is: "+correctoptions[optionIndex]+"</h2>");
			$("#option0, #option1, #option2, #option3").hide();
			imagedisplay();
			setTimeout(nextquestion, 2000);
			endgame();
			totalscore++;
		}

	//Checks if the wrong answer is selected
		else if (rightanswer != correctoptions[optionIndex]){
			$('#start').html("<h2>Incorrect Choice! The Correct Answer is: "+correctoptions[optionIndex]+"</h2>");
			$("#option0, #option1, #option2, #option3").hide();
			imagedisplay();
			setTimeout(nextquestion, 2000);
			endgame();
			wrongoption++;
		}
      });

	//Function to show images.
	function imagedisplay() {
		$('#images').show();
		$('#images').html("<img src='assets/images/"+correctImage[optionIndex]+"'>");
	};

	//Reset button
	$("#buttonreset").on("click", function(){

	//Reset game
	reset();
	
	//Hide Eeset button
	$('#buttonreset').hide();

	});

	//Display Questions
	function logArray(list) {
        for (var i = 0; i < list.length; i++) {
          $('#option'+i).html(list[i]+'<br>');
        }
      }

    //Start the Timer
	function time(){
	
	//Question Time Out after 20 seconds
	timer = 20;
	clearInterval(intervalId);

	//Decrementing Timer
    intervalId = setInterval(decrement, 1000);
	}

	//Resets game to Question 1
	function reset(){
		questionIndex = 0;
		optionIndex = 0;
		$("#option0, #option1, #option2, #option3").show();
		$('#timeclock').show();
		time();
		unanswered = 0;
		wrongoption = 0;
		totalscore = 0;
		gamestart();
	}

	//Hide reset button when Game Begins
	function showreset(){
		if (begingame == true) {
			$('#buttonreset').hide();
		}
	//Show reset button when Game Ends
		else if (begingame == false){
			$('#buttonreset').show();
		}
	}

	//This functions decreases the timer
    function decrement() {

    // Time decreasing (--)
    timer--;

    //Display remaining time
     $("#timeclock").html("<h2>Time Left: " + timer + "</h2>");
    
    // Surpassing the Time Limit for Questions
      if (timer === 0) {
        //Alert the user that time is up.
        $('#start').html('<h2>You ran out of time! The correct answer is: '+correctoptions[optionIndex]+'</h2>');
		$("#option0, #option1, #option2, #option3").hide();
		imagedisplay();
	    endgame();
		setTimeout(nextquestion, 5000);
		unanswered++;
      }
  	}

  	//Stopping timer and clearing intervalId
    function endgame() {
    	clearInterval(intervalId);
    }
});