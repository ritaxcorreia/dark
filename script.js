"use strict";

const randomButton = document.querySelector(".random-button");

const characterDropdownButton = document.querySelector(".dropdown");

const quoteArea = document.querySelector(".js-quote");

const characterArea = document.querySelector(".js-character");

const selectElement = document.querySelector("#characters");

// .js-quote is the div where the quote will be displayed
fetch(
	"https://cors-anywhere.herokuapp.com/https://dark-api.herokuapp.com/api/v1/quote"
)
	.then((response) => {
		if (!response.ok) {
			const myStatusText = `Oops - There was a ${response.statusText} error`;
			throw Error(myStatusText);
		}
		return response.json();
	})
	.then((jsonData) => {
		console.log("jsonData", jsonData);

		randomButton.addEventListener("click", function () {
			const object =
				jsonData[Math.floor(Math.random() * jsonData.length)];
			const author = object.author;
			const season = object.season;
			const episode = object.episode;
			const quote = object.quote;
			quoteArea.classList.add("quote-class");
			quoteArea.innerHTML = `<h2>Quote:</h2><p><em> ${quote} </em></p><h2>Author: </h2><p>${author}</p><h2>Season:</h2><p>${season}</p><h2>Episode:</h2> <p>${episode}</p>`;
		});
	});

// .js-character is the div where the character data will be displayed
fetch(
	"https://cors-anywhere.herokuapp.com/https://dark-api.herokuapp.com/api/v1/character"
)
	.then((response) => {
		if (!response.ok) {
			const myStatusText = `Oops - There was a ${response.statusText} error`;
			throw Error(myStatusText);
		}
		return response.json();
	})
	.then((jsonData) => {
		console.log("jsonData", jsonData);

		//populate dropdown with character list
		jsonData.forEach(function (object) {
			const optionElement = document.createElement("option");
			const name = object.name;
			optionElement.appendChild(document.createTextNode(name));
			selectElement.appendChild(optionElement);
		});

		// when user selects option from dropdown menu
		selectElement.addEventListener("change", function (characterChoice) {
			const characterChosen = characterChoice.target.name;
			console.log(characterChosen);

			const name = jsonData.name;
			const aliases = jsonData.aliases;
			const portrayedYoung = jsonData.portrayed.Young;
			const portrayedAdult = jsonData.portrayed.Adult;
			const portrayedOld = jsonData.portrayed.Old;
			const occupation = jsonData.occupation;
			characterArea.classList.add("quote-class");
			characterArea.innerHTML = `<h2>Name:</h2> ${name}<br><h2>Aliases:</h2> ${aliases}<br><h2>Portrayed by:</h2> ${portrayedYoung}, ${portrayedAdult}, ${portrayedOld}<br><h2>Occupation:</h2> ${occupation}`;
		});
	});
