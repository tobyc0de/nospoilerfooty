import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import moment from "moment";
moment().format();
import LeagueStandingsPopup from "./components/LeagueStandingsPopup";
import GamesTable from "./components/GamesTable";
import DateSelector from "./components/DateSelector";

function App() {
	const [selectedLeague, setSelectedLeague] = useState();
	const [selectedLeagueStandings, setSelectedLeagueStandings] = useState();
	const [fixtures, setFixtures] = useState([]);
	const [popupStatus, setPopupStatus] = useState(false);
	const [selectedDate, setSelectedDate] = useState(
		moment().format("YYYY-MM-DD")
	);

	useEffect(() => {
		getFixtures(selectedDate);
	}, [selectedDate]);

	useEffect(() => {
		getLeagueStandings(selectedLeague);
	}, [selectedLeague]);

	useEffect(() => {
		console.log(selectedLeagueStandings);
	}, [selectedLeagueStandings]);

	async function getLeagueStandings(leagueId) {
		const API = `https://nospoilerfooty-api.onrender.com/leaguebyid?league=${leagueId}`;
		// const API = `http://localhost:8080/leaguebyid?league=${leagueId}`;
		const res = await axios.get(API);
		await setSelectedLeagueStandings(res.data);
		console.log(res.data);
	}

	async function getFixtures(selectedDate) {
		const API = `https://nospoilerfooty-api.onrender.com/fixturesbydate?date=${selectedDate}`;
		const res = await axios.get(API);
		setFixtures(res.data);
		hideAllScores();
	}

	function showScore(i) {
		let selectedScore = document.querySelector(`#score${i}`);
		let selectedScoreButton = document.querySelector(`#scorebutton${i}`);
		selectedScore.className = `showscore`;
		selectedScoreButton.className = `hidden`;
	}

	function showAllScores() {
		let allScores = document.querySelectorAll('[id^="score"]');
		let allScoresButtons = document.querySelectorAll('[id^="scorebutton"]');
		let showallscoresbutton = document.querySelector("#showallscoresbutton");
		// if currently hidden
		if (showallscoresbutton.innerHTML === "show all scores") {
			allScores.forEach((score) => {
				score.className = "showscore";
			});
			allScoresButtons.forEach((button) => {
				button.className = "hidden";
			});
			showallscoresbutton.innerHTML = "hide all scores";
		}
		// if currently shown
		else {
			hideAllScores();
		}
	}

	function showMatchDetails(i) {
		let matchDetails = document.querySelector(`#matchdetails${i}`);
		let matchDetailButton = document.querySelector(`#matchdetailsbutton${i}`);

		if (matchDetailButton) {
			if (matchDetailButton.innerHTML === "show details") {
				matchDetails.className = "showdetails";
				matchDetailButton.innerHTML = "hide details";
			} else {
				matchDetails.className = "hidden";
				matchDetailButton.innerHTML = "show details";
			}
		} else {
			console.error(`Button with ID matchdetailsbutton${i} not found.`);
		}
	}

	function hideAllScores() {
		let allScores = document.querySelectorAll('[id^="score"]');
		let allScoresButtons = document.querySelectorAll('[id^="scorebutton"]');
		let showallscoresbutton = document.querySelector("#showallscoresbutton");
		allScores.forEach((score) => {
			score.className = "hidden";
		});
		allScoresButtons.forEach((button) => {
			button.className = "scorebutton";
		});
		showallscoresbutton.innerHTML = "show all scores";
	}

	return (
		<>
			{popupStatus && selectedLeagueStandings[0]?.league?.name && (
				<LeagueStandingsPopup
					selectedLeagueStandings={selectedLeagueStandings}
					setPopupStatus={setPopupStatus}
				/>
			)}
			<h1>Spoiler-Free Footy Fixtures</h1>
			<DateSelector
				selectedDate={selectedDate}
				setSelectedDate={setSelectedDate}
			/>
			<div>
				<GamesTable
					showAllScores={showAllScores}
					fixtures={fixtures}
					setSelectedLeague={setSelectedLeague}
					setPopupStatus={setPopupStatus}
					showScore={showScore}
					showMatchDetails={showMatchDetails}
				/>
			</div>
		</>
	);
}

export default App;
