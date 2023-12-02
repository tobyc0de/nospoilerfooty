export default function LeagueStandingsPopup({
	selectedLeagueStandings,
	setPopupStatus,
}) {
	return (
		// POPUP CONTENT
		<div id="popup">
			{selectedLeagueStandings[0]?.league?.name && (
				<>
					<h2>
						Current standings for {selectedLeagueStandings[0]?.league?.name}
					</h2>
					<div
						className="closepopupbutton"
						onClick={() => setPopupStatus(false)}
					>
						Close
					</div>
					<table id="popuptable">
						<thead>
							<tr>
								<th>Rank</th>
								<th>Team</th>
								<th>Played</th>
								<th>Won</th>
								<th>Draw</th>
								<th>Lost</th>
								<th>Goals</th>
								<th>Points</th>
							</tr>
						</thead>
						<tbody>
							{selectedLeagueStandings[0]?.league?.standings[0].map(
								(team, i) => (
									<tr key={i}>
										<td>{team.rank}</td>
										<td>
											<img src={team.team.logo} alt={team.team.name} />
										</td>
										<td>{team.all.played}</td>
										<td>{team.all.win}</td>
										<td>{team.all.draw}</td>
										<td>{team.all.lose}</td>
										<td>
											{team.all.goals.for} - {team.all.goals.against}
										</td>
										<td>{team.points}</td>
									</tr>
								)
							)}
						</tbody>
					</table>
				</>
			)}
		</div>

		// END POPUP
	);
}
