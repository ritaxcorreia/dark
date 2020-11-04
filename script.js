"use strict";

const healthButton = document.querySelector("#getDataButton");

const displayOl = document.querySelector(".health-data-list");

fetch(
	"https://data.cityofnewyork.us/api/views/jb7j-dtam/rows.json?accessType=DOWNLOAD"
)
	.then((response) => {
		if (!response.ok) {
			const myStatusText = `Oops - ${response.statusText}`;
			throw Error(myStatusText);
		}
		return response.json();
	})
	.then((jsonData) => {
		console.log("jsonData", jsonData);

		healthButton.addEventListener("click", function () {
			jsonData.data.forEach((item) => {
				const li = document.createElement("li");
				const deaths = item[12];
				const diseaseDescription = item[9];
				li.innerText = `${deaths} - ${diseaseDescription}`;
				displayOl.appendChild(li);
			});
		});
	});
