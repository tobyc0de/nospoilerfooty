const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const PORT = 8080;
require("dotenv").config();
app.use(express.json());
const axios = require("axios");
var moment = require("moment"); // require
moment().format();

async function getFixtures(date) {
	const options = {
		method: "GET",
		url: "https://api-football-v1.p.rapidapi.com/v3/fixtures",
		params: { date: date },
		headers: {
			"X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
			"X-RapidAPI-Host": process.env.RAPIDAPI_HOST,
		},
	};

	try {
		const response = await axios.request(options);
		return response.data;
	} catch (error) {
		return error;
	}
}

async function getLeagueStandings(league) {
	const options = {
		method: "GET",
		url: "https://api-football-v1.p.rapidapi.com/v3/standings",
		params: {
			season: moment().format("YYYY"),
			league: league,
		},
		headers: {
			"X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
			"X-RapidAPI-Host": process.env.RAPIDAPI_HOST,
		},
	};

	try {
		const response = await axios.request(options);
		return response.data;
	} catch (error) {
		console.error(error);
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

app.get("/leaguebyid", async (request, response) => {
	const standings = await getLeagueStandings(request.query.league);
	response.json(standings.response);
});

app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
