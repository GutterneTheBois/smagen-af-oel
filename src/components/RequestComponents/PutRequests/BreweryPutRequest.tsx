"use client";
import {
	FC,
	useState,
	ChangeEvent,
	useEffect,
	KeyboardEvent,
	useRef,
} from "react";
import { useDb } from "@/services";
import { Button } from "@/client-components";
import { Brewery } from "@prisma/client";

const BreweryPutRequest: FC = () => {
	const { updateDescription, breweries, refreshBreweries } = useDb();
	const ref = useRef(null);

	const [id, setId] = useState<string>("");
	const [description, setDescription] = useState<string>("");

	const onChangeSelect = (ev: ChangeEvent<HTMLSelectElement>) => {
		setId(ev.target.value);
	};

	const onChangeInput = (ev: ChangeEvent<HTMLInputElement>) => {
		setDescription(ev.target.value);
	};

	const getBreweryDescription = (): string => {
		let brewery: Brewery = breweries[
			breweries.findIndex((brew) => brew.id === id)
		] as Brewery;

		if (brewery === undefined || brewery.description === null)
			return "Description";

		return brewery.description;
	};

	const onKeyPress = (ev: KeyboardEvent<HTMLInputElement>) => {
		if (ev.key === "Enter") update();
	};

	const fillInput = (desc: string) => {
		setDescription(desc);
	};

	useEffect(() => {
		(async () => {
			await refreshBreweries();
		})();
	}, [breweries, refreshBreweries]);

	const update = () => {
		updateDescription("brewery", id, description);
		setDescription("");
		// @ts-ignore
		ref.current.value = "";
	};

	return (
		<div>
			<h1>Update Brewery</h1>
			<div>
				<select onChange={onChangeSelect} defaultValue={"select"}>
					<option value="select">-- Choose Brewery --</option>
					{breweries.map((brewery, index) => (
						<option key={index} value={brewery.id}>
							{brewery.name}
						</option>
					))}
				</select>

				<hr />
				<input
					ref={ref}
					type="text"
					onChange={onChangeInput}
					defaultValue={description}
					placeholder={getBreweryDescription()}
					onKeyDown={onKeyPress}
				/>
				<button
					style={{ color: "black" }}
					onClick={() => fillInput(getBreweryDescription())}
				>
					Fill input
				</button>
				<Button onClick={update}>Submit</Button>
			</div>
		</div>
	);
};

export default BreweryPutRequest;
