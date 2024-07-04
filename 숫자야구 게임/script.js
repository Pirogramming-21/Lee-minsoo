document.addEventListener("DOMContentLoaded", () => {
    const randomNumbers = generateRandomNumbers();
    let attempts = 0;

    document.querySelector(".submit-button").addEventListener("click", function() {
        const guess = getGuess();
        const result = checkGuess(guess, randomNumbers);
        displayResult(guess, result);
        attempts++;

        if (result.strikes === 3) {
            displayVictory();
        } else if (attempts >= 9) {
            displayDefeat();
        }
    });

    function generateRandomNumbers() {
        const numbers = [];
        while (numbers.length < 3) {
            const number = Math.floor(Math.random() * 10);
            if (!numbers.includes(number)) {
                numbers.push(number);
            }
        }
        return numbers;
    }

    function getGuess() {
        const inputs = document.querySelectorAll(".input-field");
        return Array.from(inputs).map(input => parseInt(input.value, 10));
    }

    function checkGuess(guess, target) {
        let strikes = 0;
        let balls = 0;
        guess.forEach((num, idx) => {
            if (num === target[idx]) {
                strikes++;
            } else if (target.includes(num)) {
                balls++;
            }
        });
        return { strikes, balls };
    }

    function displayResult(guess, result) {
        const resultElement = document.querySelector(".result-display");
        const resultDiv = document.createElement("div");
        resultDiv.classList.add("check-result");

        const guessDiv = document.createElement("div");
        guessDiv.classList.add("left");
        guessDiv.textContent = guess.join(" ");

        const feedbackDiv = document.createElement("div");
        feedbackDiv.classList.add("right");

        if (result.strikes === 0 && result.balls === 0) {
            const outDiv = document.createElement("div");
            outDiv.classList.add("out", "num-result");
            outDiv.textContent = "O";
            feedbackDiv.appendChild(outDiv);
        } else {
            if (result.strikes > 0) {
                const strikeDiv = document.createElement("div");
                strikeDiv.classList.add("strike", "num-result");
                strikeDiv.textContent = `${result.strikes}S`;
                feedbackDiv.appendChild(strikeDiv);
            }
            if (result.balls > 0) {
                const ballDiv = document.createElement("div");
                ballDiv.classList.add("ball", "num-result");
                ballDiv.textContent = `${result.balls}B`;
                feedbackDiv.appendChild(ballDiv);
            }
        }

        resultDiv.appendChild(guessDiv);
        resultDiv.appendChild(feedbackDiv);
        resultElement.appendChild(resultDiv);
    }

    function displayVictory() {
        const resultImage = document.getElementById("game-result-img");
        resultImage.src = "success.png";
        resultImage.alt = "Success";
    }

    function displayDefeat() {
        const resultImage = document.getElementById("game-result-img");
        resultImage.src = "fail.png";
        resultImage.alt = "Fail";
    }
});
