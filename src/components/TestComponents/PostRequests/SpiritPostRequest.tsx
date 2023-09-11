"use client";
import { FC, ChangeEvent, useState } from "react";
import { useDb } from "@/services";
import { useLoadingAsync } from "@/utils/hooks/useLoadingAsync";
import { Button } from "@/client-components";

const SpiritPostRequest: FC = () => {
	const { createSpirit, distilleries, refreshDistilleries } = useDb();

	const { loading } = useLoadingAsync(async () => {
		await refreshDistilleries();
	}, [refreshDistilleries]);

	const [inputStrings, setInputStrings] = useState({
		name: "",
		type: "",
		image_url: "",
		description: undefined,
	});

	const [inputNumbers, setInputNumbers] = useState({
		vol: 0.0,
		size: 0,
	});

	const [selectValue, setSelectValue] = useState("");

	const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = ev.target;

		setInputStrings({ ...inputStrings, [name]: value });
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
			<h1>Create Spirit</h1>
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
					<option value={"select"}>-- Select distillery --</option>
					{!loading && (
						<>
							{distilleries.map((distillery) => (
								<option
									key={distillery.id}
									value={distillery.name}
								>
									{distillery.name}
								</option>
							))}
						</>
					)}
				</select>

				<Button
					onClick={() =>
						createSpirit(
							inputStrings.name,
							selectValue,
							inputStrings.name,
							inputNumbers.vol,
							inputNumbers.size,
							inputStrings.image_url,
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

export default SpiritPostRequest;
