import Link from "next/link";
export const data = [
	{
		applicationID: "id324324",
		name: "millimetres (mm)",
		branch: 25.4,
		status: "PENDING",
	},
	{
		applicationID: "id324",
		name: "millimetres (mm)",
		branch: 25.4,
		status: "PENDING",
	},
	{
		applicationID: "feet",
		name: "centimetres (cm)",
		branch: 30.48,
		status: "REJECTED",
	},
	{
		applicationID: "yards",
		name: "metres (m)",
		branch: 0.91444,
		status: "ACCEPTED",
	},
];

export const columns = [
	{
		Header: "To convert",
		accessor: "applicationID",
	},
	{
		Header: "Into",
		accessor: "name",
	},
	{
		Header: "Multiply by",
		accessor: "branch",
	},
	{
		Header: "Status",
		accessor: "status",
		Cell: cell => {
			return cell.value === "PENDING" ? (
				<Link
					href={{
						pathname: "/editApplication/[applicationID]",
						query: { applicationID: cell.row.cells[0].value },
					}}
				>
					<span className="blue">{cell.value}</span>
				</Link>
			) : cell.value === "ACCEPTED" ? (
				<span className="green">{cell.value}</span>
			) : (
				<span className="red">{cell.value}</span>
			);
		},
	},
];
