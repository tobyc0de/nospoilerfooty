const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const PORT = 8080;
require("dotenv").config();
app.use(express.json());
const axios = require("axios");

async function getFixtures(date) {
	const options = {
		method: "GET",
		url: "https://api-football-v1.p.rapidapi.com/v3/fixtures",
		params: { date: date },
		headers: {
			"X-RapidAPI-Key": "a18441b5bfmsh54707e1fa8f757cp18855djsn09278f2f9abf",
			"X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
		},
	};

	try {
		const response = await axios.request(options);
		console.log(response.data);
		return response.data;
	} catch (error) {
		return error;
	}
}

app.get("/", (_, response) => {
	response.json("I am rooting for you.");
});

app.get("/fixturesbydate", async (request, response) => {
	const fixtures = await getFixtures(request.query.date);
	const wrangledfixtures = await fixtures.response.filter(
		(fixture) =>
			fixture.league.id === 3 ||
			fixture.league.id === 39 ||
			fixture.league.id === 2 ||
			fixture.league.id === 78
	);
	console.log("wrang:", wrangledfixtures);
	response.json(wrangledfixtures);
});

app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
