import React, { FocusEventHandler } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { ActionMeta, createFilter, OptionsType } from "react-select";

import CreatableSelect from "react-select/creatable";

export type Option = {
	key: string;
	value: string;
	label: string;
};

type SearchMultiSelectProps = {
	options: Option[];
	isMulti?: boolean;
	onChange?: (value: Option | OptionsType<Option>, action: ActionMeta<Option>) => void;
	name: string;
	onBlur: FocusEventHandler;
	inputRef: React.Ref<any>;
};

const SearchMultiSelect: React.FC<SearchMultiSelectProps> = ({
	options,
	isMulti,
	onChange,
	name,
	onBlur,
	inputRef,
}) => {
	return (
		<CreatableSelect
			filterOption={createFilter({ ignoreAccents: false })}
			isClearable={true}
			isMulti={isMulti}
			onChange={onChange}
			ref={inputRef}
			name={name}
			onBlur={onBlur}
			options={options}
		/>
	);
};

export default SearchMultiSelect;
