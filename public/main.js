// Focus div based on nav button click


const homeButton = document.getElementById("homenav")
			// Add event listener for coins form
			homeButton.addEventListener("click", moveHome)
			// Create the submit handler
            
			function moveHome() {
                // go home
                document.getElementById("home").className = "active"
                document.getElementById("single").className = "hidden"
                document.getElementById("multi").className = "hidden"
                document.getElementById("guess").className = "hidden"

            }

const singleFlip = document.getElementById("singlenav")
			// Add event listener for coins form
			singleFlip.addEventListener("click", moveSingleFlip)
			// Create the submit handler
			function moveSingleFlip() {
                // go to single flip
                document.getElementById("home").className = "hidden"
                document.getElementById("single").className = "active"
                document.getElementById("multi").className = "hidden"
                document.getElementById("guess").className = "hidden"
            }

const multiFlip = document.getElementById("multinav")
			// Add event listener for coins form
			multiFlip.addEventListener("click", moveMultiFlip)
			// Create the submit handler
			function moveMultiFlip() {
                // go to multi flip
                document.getElementById("home").className = "hidden";
                document.getElementById("single").className = "hidden";
                document.getElementById("multi").className = "active";
                document.getElementById("guess").className = "hidden";
            }

const guessFlip = document.getElementById("guessnav")
			// Add event listener for coins form
			guessFlip.addEventListener("click", moveGuess)
			// Create the submit handler
			function moveGuess() {
                // go to multi flip
                document.getElementById("home").className = "hidden";
                document.getElementById("single").className = "hidden";
                document.getElementById("multi").className = "hidden";
                document.getElementById("guess").className = "active";
            }


// Flip one coin and show coin image to match result when button clicked

const singleFlipButton = document.getElementById("singleFlipCoinButton")
			// Add event listener for coins form
			singleFlipButton.addEventListener("click", flipSingle)
			// Create the submit handler
			function flipSingle(){
                url = "http:localhost:5000/app/flip/"
                    fetch(url)
                      .then(function(response) {
                      return response.json();
                      })
                    .then(function(result) {
          //              if( result.flip == "heads"){
                        document.getElementById("singleCoinImages").setAttribute("src", result.flip+".jpg");
            //            }else{
              //              document.getElementById("singleCoinImages").src = "./assets/img/tails.png"
                        }
                //    }
                    )
            }
            
                    

                

// Flip multiple coins and show coin images in table as well as summary results
// Enter number and press button to activate coin flip series

// Guess a flip by clicking either heads or tails button
