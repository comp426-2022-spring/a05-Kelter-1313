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

async function flipSingle() {
    const endpoint = "app/flip/";
    const url = document.baseURI + endpoint;
    await fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (result) {
            console.log(result)
            document.getElementById("singleCoinImages").setAttribute("src", "./assets/img/" + result.flip + ".png");
        }
        )
}





// Flip multiple coins and show coin images in table as well as summary results
// Enter number and press button to activate coin flip series

const multiFlipButton = document.getElementById("multiFlipForm")
// Add event listener for coins form
multiFlipButton.addEventListener("submit", flipMulti)
// Create the submit handler
async function flipMulti(event) {
    event.preventDefault();
    a = document.getElementById("number").value
    document.getElementById("numberInputtedCheck").innerHTML = a;
    const endpoint = "app/flip/coins/";
    const url = document.baseURI + endpoint;
    const formEvent = event.currentTarget
    try {
        const formData = new FormData(formEvent);
        const flips = await sendFlips({ url, formData });
        console.log(flips);
        document.getElementById("headCount").innerHTML = "Heads: " + flips.summary.heads;
        document.getElementById("tailCount").innerHTML = "Tails: " + flips.summary.tails;
        document.getElementById("coinImages").innerHTML = coinList(flips.raw);
    } catch (error) {
        console.log(error);
    }
}

async function sendFlips({ url, formData }) {
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJson = JSON.stringify(plainFormData);
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: formDataJson
    };
    const response = await fetch(url, options);
    return response.json()
}

function coinList(array) {
    let text = "";
    let arrayLength = array.length
    for (let i = 0; i < arrayLength; i++) {
        text += '<li><img src="assets/img/' + array[i] + '.png" class="bigcoin"></li>';
    }
    return text
}


async function flipCoins(event) {
    event.preventDefault();
    const endpoint = "app/flip/coins/"
    const url = document.baseURI + endpoint
    const formEvent = event.currentTarget
    try {
        const formData = new FormData(formEvent);
        const flips = await sendFlips({ url, formData });
        document.getElementById("heads").innerHTML = "Heads: " + flips.summary.heads;
        document.getElementById("tails").innerHTML = "Tails: " + flips.summary.tails;
        document.getElementById("coinlist").innerHTML = coinList(flips.raw);
    } catch (error) {
        console.log(error);
    }
}



// Guess a flip by clicking either heads or tails button

const guessHeadFlipButton = document.getElementById("guessHeadFlipCoinButton")
// Add event listener for coins form
guessHeadFlipButton.addEventListener("click", flipGuessHead)
// Create the submit handler

async function flipGuessHead() {
    const endpoint = "app/flip/call/heads/";
    const url = document.baseURI + endpoint;
    await fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (result) {
            console.log(result)
            document.getElementById("guessCoinImages").setAttribute("src", "./assets/img/" + result.flip + ".png");
            if (result.flip == "tails") {
                document.getElementById("winOrLose").innerHTML = "You guessed wrong... Oof...";
            } else {
                document.getElementById("winOrLose").innerHTML = "You guessed right! Congrats!";
            }
        }
        )
}

const guessTailsFlipButton = document.getElementById("guessTailFlipCoinButton")
// Add event listener for coins form
guessTailsFlipButton.addEventListener("click", flipGuessTail)
// Create the submit handler

async function flipGuessTail() {
    const endpoint = "app/flip/call/tails/";
    const url = document.baseURI + endpoint;
    await fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (result) {
            console.log(result)
            document.getElementById("guessCoinImages").setAttribute("src", "./assets/img/" + result.flip + ".png");
            if (result.flip == "tails") {
                document.getElementById("winOrLose").innerHTML = "You guessed right! Congrats!";
            } else {
                document.getElementById("winOrLose").innerHTML = "You guessed wrong... Oof...";
            }
        }
        )
}