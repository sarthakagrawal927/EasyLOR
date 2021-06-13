export const data = [
	{
		applicationID: "inches",
		name: "millimetres (mm)",
		branch: 25.4,
		link: "strings",
	},
	{
		applicationID: "feet",
		name: "centimetres (cm)",
		branch: 30.48,
		link: "string",
	},
	{
		applicationID: "yards",
		name: "metres (m)",
		branch: 0.91444,
		link: "string",
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
		Header: "VIEW",
		accessor: "link",
		Cell: (e: any) => (
			<a href={e.value}>
				<button>View</button>
			</a>
		),
	},
];
