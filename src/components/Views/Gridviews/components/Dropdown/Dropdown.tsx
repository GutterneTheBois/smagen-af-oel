import {
	FC,
	useState,
	useRef,
	useEffect,
	Dispatch,
	SetStateAction,
} from "react";
import beerOptions from "./beerOptions.json";
import spiritOptions from "./spiritOptions.json";
import styles from "./dropdown.module.scss";

type Option = {
	isSelected: boolean;
	label: string;
};

type DropdownProps = {
	type: "beer" | "spirit";
	setFilteredOptions: Dispatch<SetStateAction<string[]>>;
	queries: string[];
};

const Dropdown: FC<DropdownProps> = ({ type, setFilteredOptions, queries }) => {
	const containerRef = useRef(null);

	const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
	const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
	const [unselectedOptions, setUnselectedOptions] = useState<Option[]>([]);

	const handleClickOutsideContainer = (ev: MouseEvent) => {
		// @ts-ignore
		if (containerRef.current && !containerRef.current.contains(ev.target))
			setIsDropdownOpen(false);
	};

	useEffect(() => {
		document.addEventListener("click", handleClickOutsideContainer, true);
		return () => {
			document.removeEventListener(
				"click",
				handleClickOutsideContainer,
				true
			);
		};
	}, []);

	useEffect(() => {
		let options: Option[];

		if (type === "beer")
			options = beerOptions.filter((bo) => bo.isSelected === false);
		else if (type === "spirit")
			options = spiritOptions.filter((so) => so.isSelected === false);
		else options = [];

		setUnselectedOptions(options);
	}, []);

	useEffect(() => {
		const queries = selectedOptions.map((so) => so.label);
		setFilteredOptions([...queries]);
	}, [selectedOptions]);

	const openDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	const selectOption = (option: Option, index: number) => {
		option.isSelected = true;
		setUnselectedOptions([
			...unselectedOptions.slice(0, index),
			...unselectedOptions.slice(index + 1),
		]);
		setSelectedOptions([...selectedOptions, option]);

		const queries = selectedOptions.map((so) => so.label);

		setFilteredOptions([...queries]);
	};

	const unSelect = (option: Option, index: number) => {
		setSelectedOptions([
			...selectedOptions.slice(0, index),
			...selectedOptions.slice(index + 1),
		]);
		setUnselectedOptions([...unselectedOptions, option]);

		const queryIndex = queries.findIndex((q) => q === option.label);

		setFilteredOptions([
			...queries.slice(0, queryIndex),
			...queries.slice(queryIndex + 1),
		]);
	};

	return (
		<div
			className={styles.container}
			ref={containerRef}
			onClick={openDropdown}
		>
			<div className={styles.searchedOptions}>
				{selectedOptions.map((fo, index) => (
					<span key={index} onClick={() => unSelect(fo, index)}>
						{fo.label}
					</span>
				))}
			</div>
			<div
				className={styles.dropdownOptions}
				style={{ display: !isDropdownOpen ? "none" : "" }}
			>
				{unselectedOptions.map((opt, index) => (
					<div
						key={index}
						className={styles.option}
						onClick={() => selectOption(opt, index)}
					>
						{opt.label}
					</div>
				))}
			</div>
		</div>
	);
};

export default Dropdown;
