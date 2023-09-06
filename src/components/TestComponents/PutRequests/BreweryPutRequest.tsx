"use client";
import { FC, useState, ChangeEvent } from "react";
import { useDb } from "@/services";
import { Button } from "@/client-components";
import { Brewery } from "@prisma/client";
import { useLoadingAsync } from "@/utils/hooks/useLoadingAsync";

const BreweryPutRequest: FC = () => {
	const { updateBreweryDescription, breweries, getAllBreweries } = useDb();

	const [id, setId] = useState<string>("");
	const [description, setDescription] = useState<string>("");

	const onChangeSelect = (ev: ChangeEvent<HTMLSelectElement>) => {
		setId(ev.target.value);
	};

	const onChangeInput = (ev: ChangeEvent<HTMLInputElement>) => {
		setDescription(ev.target.value);
	};

	const getBreweryDescription = (): void => {
		const brewery: Brewery = breweries[
			breweries.findIndex((brew) => brew.id === id)
		] as Brewery;

		setDescription(String(brewery.description));
	};

	const { loading } = useLoadingAsync(async () => {
		await getAllBreweries();
		getBreweryDescription();
	}, []);

	return (
		<div>
			<h1>Update Brewery</h1>
			<div>
				{!loading && (
					<select onChange={onChangeSelect} defaultValue={"select"}>
						<option value="select">-- Choose Brewery --</option>
						{breweries.map((brewery) => (
							<option key={brewery.id} value={brewery.id}>
								{brewery.name}
							</option>
						))}
					</select>
				)}
				<hr />
				<input
					type="text"
					onChange={onChangeInput}
					defaultValue={description}
				/>
				<Button
					onClick={() => updateBreweryDescription(id, description)}
				>
					Submit
				</Button>
			</div>
		</div>
	);
};

export default BreweryPutRequest;
