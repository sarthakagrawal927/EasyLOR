import { Thead, Tbody, Tr, Th, Td, chakra } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useTable, useSortBy } from "react-table";
import { DashboardTable } from "./dashboard.styled";

const Table = ({ columns, data }) => {
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data }, useSortBy);

	return (
		<DashboardTable {...getTableProps()} variant="unstyled">
			<Thead>
				{headerGroups.map(headerGroup => (
					<Tr {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map(column => (
							<Th {...column.getHeaderProps(column.getSortByToggleProps())}>
								{column.render("Header")}
								<chakra.span pl="4">
									{column.isSorted ? (
										column.isSortedDesc ? (
											<TriangleDownIcon aria-label="sorted descending" />
										) : (
											<TriangleUpIcon aria-label="sorted ascending" />
										)
									) : null}
								</chakra.span>
							</Th>
						))}
					</Tr>
				))}
			</Thead>
			<Tbody {...getTableBodyProps()}>
				{rows.map(row => {
					prepareRow(row);
					return (
						<Tr {...row.getRowProps()}>
							{row.cells.map(cell => (
								<Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
							))}
						</Tr>
					);
				})}
			</Tbody>
		</DashboardTable>
	);
};

export default Table;