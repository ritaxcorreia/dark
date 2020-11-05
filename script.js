"use strict";

const randomButton = document.querySelector(".random-button");

const characterDropdownButton = document.querySelector(".dropdown");

const quoteArea = document.querySelector(".js-quote");

const characterArea = document.querySelector(".js-character");

const selectElement = document.querySelector("#characters");

//Choose a character dropdown
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
	.then(function (data) {
		console.table(data);
		// store character list for later use
		const characterData = data;

		// Create an <option> for every character object
		characterData.forEach(function (object) {
			const optionElement = document.createElement("option");
			const name = object.name;
			optionElement.value = object.char_id;
			optionElement.appendChild(document.createTextNode(name));
			selectElement.appendChild(optionElement);
		});

		//  .js-character is the div where the character data will be displayed
		selectElement.addEventListener("change", function (event) {
			// the selected option "value" attribute is always a string
			// char_id is a number so we have to convert the value to a number
			// this is so that we can find the character for the selected char id
			const selectedCharId = parseInt(event.target.value);
			console.log(selectedCharId);

			// next, let's find the character in the characters array

			// how can we find it?
			// - we have the selected char_id in selectedCharId
			// - each character in characterData has a char_id
			// - we can get the correct character by comparing the selected char_id to the character char_id

			const selectedCharacter = characterData.find(function (character) {
				// if this is true, then it returns this specific character and stores it in the const character
				return character.char_id === selectedCharId;
			});

			// for (let i = 0; i < characterData.length; i++) {
			// 	const item = characterData[i];

			// 	if (item.char_id === selectedCharId) {
			// 		selectedCharacterFor = item;
			// 	}
			// }

			console.log(selectedCharacter);

			const name = selectedCharacter.name;
			const image = selectedCharacter.img;
			const aliases = selectedCharacter.aliases;
			const portrayedYoung = selectedCharacter.portrayed.Young;
			const portrayedAdult = selectedCharacter.portrayed.Adult;
			const portrayedOld = selectedCharacter.portrayed.Old;
			const occupation = selectedCharacter.occupation;
			characterArea.classList.add("quote-class");
			characterArea.innerHTML = `
            <img class="character-image" src="${image}">
            <h2>Name:</h2>
            <p> ${name}</p>
            <br>
            <h2>Aliases:</h2> 
            <p>${aliases}</p><br><h2>Portrayed by:</h2> <p>${portrayedYoung}, ${portrayedAdult}, ${portrayedOld}</p><br><h2>Occupation:</h2> <p>${occupation}</p>`;
		});
	});

//Get a random Dark quote
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
