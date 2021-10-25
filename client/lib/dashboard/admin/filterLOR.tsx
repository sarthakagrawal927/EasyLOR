import {
	SimpleGrid,
	PopoverTrigger,
	Button,
	IconButton,
	PopoverBody,
	Popover,
	PopoverCloseButton,
	Select,
	Spacer,
	Flex,
} from "@chakra-ui/react";

import FilterIcon from "components/icons/FilterIcon";
import { FilterPopoverHeader, FilterFormLabel, FilterPopoverContent } from "../dashboard.styled";
const FilterLOR = ({ options, handleFilterClear, handleFilterSubmit, filters, setFilters }) => {
	return (
		<>
			{options ? (
				<Popover isLazy placement="bottom-start">
					<PopoverTrigger>
						<IconButton icon={<FilterIcon />} aria-label="filter" border="none" boxShadow="none" />
					</PopoverTrigger>
					<FilterPopoverContent width="23vw">
						<PopoverCloseButton />
						<FilterPopoverHeader>FILTER RESULTS</FilterPopoverHeader>
						<PopoverBody>
							<SimpleGrid columns={2} spacing={3} minChildWidth="7vw">
								<FilterFormLabel>STUDENT DEPARTMENT</FilterFormLabel>
								<Select
									defaultValue={null}
									width="10vw"
									value={filters.studentDepartment}
									onChange={e => setFilters({ ...filters, studentDepartment: e.target.value })}
								>
									{options.map((item, index: number) => {
										return (
											<option key={index} value={item.name}>
												{item.name}
											</option>
										);
									})}
								</Select>
								<FilterFormLabel>FACULTY DEPARTMENT</FilterFormLabel>
								<Select
									defaultValue={null}
									width="10vw"
									marginBottom="1rem"
									value={filters.facultyDepartment}
									onChange={e => setFilters({ ...filters, facultyDepartment: e.target.value })}
								>
									{options.map((item, index: number) => {
										return (
											<option key={index} value={item.name}>
												{item.name}
											</option>
										);
									})}
								</Select>
							</SimpleGrid>
							<Flex>
								<Spacer />
								<Button
									onClick={handleFilterClear}
									variant="unstyled"
									color="blue"
									margin="-0.5rem 0.8rem 0rem 0"
									fontSize="1rem"
								>
									Clear
								</Button>
								<Button onClick={handleFilterSubmit} variant="solid" size="sm">
									Show
								</Button>
							</Flex>
						</PopoverBody>
					</FilterPopoverContent>
				</Popover>
			) : null}
		</>
	);
};

export default FilterLOR;
