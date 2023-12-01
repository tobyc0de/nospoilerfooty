import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import moment from "moment";
moment().format();

function App() {
	const tomorrow = moment().add(1, "days").format("YYYY-MM-DD");
	const [fixtures, setFixtures] = useState([]);
	const [selectedDate, setSelectedDate] = useState(
		moment().format("YYYY-MM-DD")
	);

	useEffect(() => {
		getFixtures(selectedDate);
	}, [selectedDate]);

	async function getFixtures(selectedDate) {
		const API = `http://localhost:8080/fixturesbydate?date=${selectedDate}`;
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
			<div id="datebuttons">
				<button
					onClick={() => {
						setSelectedDate(
							moment(selectedDate).add(-1, "days").format("YYYY-MM-DD")
						);
					}}
				>
					-
				</button>

				<div>{selectedDate}</div>
				<button
					onClick={() => {
						setSelectedDate(
							moment(selectedDate).add(1, "days").format("YYYY-MM-DD")
						);
					}}
				>
					+
				</button>
				<br />
			</div>
			<button
				className="showallscoresbutton"
				id="showallscoresbutton"
				onClick={() => showAllScores()}
			>
				show all scores
			</button>
			<div>
				<table id="gamestable">
					<tbody>
						{fixtures.length > 0 &&
							fixtures.map((fixture, i) => (
								<tr key={i}>
									<td>
										<img src={fixture.league.logo} alt={fixture.league.name} />
									</td>
									<td>{fixture.fixture.date.slice(0, 10)}</td>
									<td> {fixture.fixture.date.slice(11, 16)}</td>

									<td>
										<img
											src={fixture.teams.home.logo}
											alt={fixture.teams.home.name}
										/>{" "}
										<br /> {fixture.teams.home.name}
									</td>
									<button
										className="scorebutton"
										id={`scorebutton${i}`}
										onClick={() => showScore(i)}
									>
										reveal score
									</button>
									<td className="hidden" id={`score${i}`}>
										{fixture.score.fulltime.home} -{" "}
										{fixture.score.fulltime.away}
									</td>
									<td>
										<img
											src={fixture.teams.away.logo}
											alt={fixture.teams.away.name}
										/>{" "}
										<br /> {fixture.teams.away.name}
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</>
	);
}

export default App;
