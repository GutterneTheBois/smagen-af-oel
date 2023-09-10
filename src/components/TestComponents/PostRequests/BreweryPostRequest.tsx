"use client";
import { ChangeEvent, FC, useState, useEffect } from "react";
import { useDb } from "@/services";
import { Button } from "@/client-components";
import { useLoadingAsync } from "@/utils/hooks/useLoadingAsync";

const BreweryPostRequest: FC = () => {
	const { createBrewery, breweries, refreshBreweries } = useDb();

	const [input, setInput] = useState({
		name: "",
		description: "",
	});

	const { loading } = useLoadingAsync(async () => {
		await refreshBreweries();
	}, []);

	const onChange = (ev: ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = ev.target;

		setInput({
			...input,
			[name]: value,
		});
	};

	const isExistingBrewery = (name: string): boolean => {
		return breweries.some((brewery) => brewery.name === name);
	};

	return (
		<div style={{ marginRight: "10vw" }}>
			<h1>Create Brewery</h1>
			<div>
				<label htmlFor="name">Name:</label>
				<br />
				<input
					name="name"
					defaultValue={input.name}
					onChange={onChange}
					placeholder="Name"
				/>
				<hr />
				<label htmlFor="description">Description:</label>
				<br />
				<input
					name="description"
					defaultValue={input.description}
					onChange={onChange}
					placeholder="Description"
				/>
				<Button
					onClick={() => createBrewery(input.name, input.description)}
				>
					Submit
				</Button>
			</div>
		</div>
	);
};

export default BreweryPostRequest;
