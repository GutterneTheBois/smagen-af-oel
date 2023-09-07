"use client";
import { FC, useState, ChangeEvent } from "react";
import { useDb } from "@/services";
import { Button } from "@/client-components";

const DistilleryPostRequest: FC = () => {
	const { createDistillery } = useDb();
	const [input, setInput] = useState({
		name: "",
		description: "",
	});

	const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = ev.target;

		setInput({
			...input,
			[name]: value,
		});
	};

	return (
		<div>
			<h1>Create Distillery</h1>
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
					onClick={() =>
						createDistillery(input.name, input.description)
					}
				>
					Submit
				</Button>
			</div>
		</div>
	);
};

export default DistilleryPostRequest;
