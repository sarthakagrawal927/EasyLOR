import { useMemo } from "react";
import { Option } from "components/SearchMultiSelect";
import universityData from "./universities.json";

type University = {
	country: string;
	name: string;
	url: string;
};

type UseUniversitiesReturn = {
	universityOptions: Option[];
};

export const useUniversities = (): UseUniversitiesReturn => {
	const universities: University[] = universityData;

	const universityOptions: Option[] = useMemo<Option[]>(() => {
		return universities.map(university => {
			return {
				key: university.name,
				value: university.name,
				label: university.name,
			};
		});
	}, []);

	return {
		universityOptions,
	};
};
