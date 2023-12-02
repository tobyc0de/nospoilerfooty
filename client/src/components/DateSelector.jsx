import moment from "moment";
moment().format();
export default function DateSelector({ selectedDate, setSelectedDate }) {
	return (
		<div id="datebuttons">
			<div
				className="otherdate"
				onClick={() => {
					setSelectedDate(
						moment(selectedDate).add(-1, "days").format("YYYY-MM-DD")
					);
				}}
			>
				⇐ {moment(selectedDate).add(-1, "days").format("YYYY-MM-DD")}
			</div>
			<div id="selecteddate">{selectedDate}</div>
			<div
				className="otherdate"
				onClick={() => {
					setSelectedDate(
						moment(selectedDate).add(1, "days").format("YYYY-MM-DD")
					);
				}}
			>
				{moment(selectedDate).add(1, "days").format("YYYY-MM-DD")} ⇒
			</div>
		</div>
	);
}
