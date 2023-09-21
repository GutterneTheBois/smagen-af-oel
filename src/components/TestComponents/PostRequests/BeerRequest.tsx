"use client";
import { Button } from "@/client-components";
import { useDb } from "@/services";
import { useLoadingAsync } from "@/utils/hooks/useLoadingAsync";
import { ChangeEvent, FC, useState } from "react";

type BeerStrings = {
	name: string;
	type: string;
	image_url: string;
	description?: string;
};

type BeerNumbers = {
	vol: number;
	ibu: number;
	size: number;
};

const PostBeer: FC = () => {
	const { createBeer, breweries, refreshBreweries } = useDb();

	const { loading } = useLoadingAsync(async () => {
		await refreshBreweries();
	}, []);

	const [inputStrings, setInputStrings] = useState<BeerStrings>({
		name: "",
		type: "",
		image_url: "",
		description: undefined,
	});

	const [inputNumbers, setInputNumbers] = useState<BeerNumbers>({
		vol: 0.0,
		ibu: 0,
		size: 0,
	});

	const [selectValue, setSelectValue] = useState<string>("");

	const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = ev.target;

		setInputStrings({
			...inputStrings,
			[name]: value,
		});

		setInputNumbers({
			...inputNumbers,
			[name]: Number(value),
		});
	};

	const onChangeSelect = (ev: ChangeEvent<HTMLSelectElement>) => {
		setSelectValue(ev.target.value);
	};

	return (
		<div style={{ marginRight: "10vw" }}>
			<h1>Create Beer</h1>
			<div>
				<label htmlFor="name">Name:</label>
				<br />
				<input
					name="name"
					defaultValue={inputStrings.name}
					onChange={onChange}
					placeholder="Name"
				/>

				<hr />
				<label htmlFor="description">Description:</label>
				<br />
				<input
					name="description"
					defaultValue={inputStrings.description}
					onChange={onChange}
					placeholder="Description"
				/>

				<hr />
				<label htmlFor="type">Type:</label>
				<br />
				<input
					name="type"
					defaultValue={inputStrings.type}
					onChange={onChange}
					placeholder="Type"
				/>

				<hr />
				<label htmlFor="vol">Vol:</label>
				<br />
				<input
					type="number"
					name="vol"
					defaultValue={Number(inputNumbers.vol)}
					onChange={onChange}
					placeholder="Vol"
				/>

				<hr />
				<label htmlFor="ibu">Ibu:</label>
				<br />
				<input
					type="number"
					name="ibu"
					defaultValue={inputNumbers.ibu}
					onChange={onChange}
					placeholder="Ibu"
				/>

				<hr />
				<label htmlFor="size">Size:</label>
				<br />
				<input
					type="number"
					name="size"
					defaultValue={inputNumbers.size}
					onChange={onChange}
					placeholder="Size"
				/>

				<hr />

				<select onChange={onChangeSelect} defaultValue={"select"}>
					<option value={"select"}>-- Select brewery --</option>
					{!loading && (
						<>
							{breweries.map((brewery, index) => (
								<option key={index} value={brewery.name}>
									{brewery.name}
								</option>
							))}
						</>
					)}
				</select>

				{/* <label htmlFor="brewery">Brewery Name:</label>
				<br />
				<input
					name="brewery"
					defaultValue={inputStrings.breweryName}
					onChange={onChange}
					placeholder="Brewery Name"
				/> */}

				<Button
					onClick={() =>
						createBeer(
							inputStrings.name,
							inputStrings.type,
							inputNumbers.vol,
							inputNumbers.size,
							inputStrings.image_url,
							selectValue,
							inputNumbers.ibu,
							inputStrings.description
						)
					}
				>
					Submit
				</Button>
			</div>
		</div>
	);
};

export default PostBeer;
