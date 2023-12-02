export default function GamesTable({
	showAllScores,
	showScore,
	fixtures,
	setSelectedLeague,
	setPopupStatus,
	showMatchDetails,
}) {
	return (
		<table id="gamestable">
			<tbody>
				<tr>
					<td></td>
					<td></td>
					<td></td>
					<td
						className="showallscoresbutton"
						id="showallscoresbutton"
						onClick={() => showAllScores()}
					>
						show all scores
					</td>
					<td></td>
				</tr>
				{fixtures.length > 0 &&
					fixtures.map((fixture, i) => (
						<>
							<tr key={i}>
								<td>
									{/* // League Logo */}
									<img src={fixture.league.logo} alt={fixture.league.name} />
									<div
										className="showstandingsbutton"
										onClick={() => {
											setSelectedLeague(fixture.league.id);
											setPopupStatus(true);
										}}
									>
										show standings
									</div>
								</td>

								<td> {fixture.fixture.date.slice(11, 16)}</td>

								<td>
									<img
										src={fixture.teams.home.logo}
										alt={`${fixture.teams.home.name} logo`}
									/>{" "}
									<br /> {fixture.teams.home.name}
								</td>
								<div
									className="scorebutton"
									id={`scorebutton${i}`}
									onClick={() => showScore(i)}
								>
									reveal score
								</div>
								<td className="hidden" id={`score${i}`}>
									{fixture.score.fulltime.home} - {fixture.score.fulltime.away}
								</td>
								<td>
									<img
										src={fixture.teams.away.logo}
										alt={`${fixture.teams.away.name} logo`}
									/>{" "}
									<br /> {fixture.teams.away.name}
								</td>
								{/* <td>
									<div
										id={`matchdetailsbutton${i}`}
										className="matchdetailsbutton"
										onClick={() => showMatchDetails(i)}
									>
										show details
									</div>
								</td> */}
							</tr>
							{/* <tr id={`matchdetails${i}`} className="hidden">
								<td>Show goals with minutes and players here?</td>
							</tr> */}
						</>
					))}
			</tbody>
		</table>
	);
}
