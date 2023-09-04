"use client";
import { ExampleButton } from "@/barrels";
import React, { ChangeEvent, FC, useState } from "react";
import { useDb } from "@/services";
import styles from "./request.module.scss";

const ExampleSendPost: FC = (): JSX.Element => {
	const { createExampleUser, getExampleUsers } = useDb();
	const [input, setInput] = useState({
		name: "",
		email: "",
	});

	const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = ev.target;

		setInput({
			...input,
			[name]: value,
		});
	};

	return (
		<div className={styles.requestContainer}>
			<div className={styles.containerMargin}>
				<label htmlFor="name">Name:</label>
				<br></br>
				<input
					className={styles.inputField}
					name="name"
					defaultValue={input.name}
					onChange={onChange}
					placeholder="Name"
				/>
				<hr />
				<label>Email:</label>
				<br></br>
				<input
					className={styles.inputField}
					name="email"
					defaultValue={input.email}
					onChange={onChange}
					placeholder="Email"
				/>
				<ExampleButton
					backgroundColor="#dd0b69"
					onClick={async () => {
						createExampleUser(input.name, input.email);
						await getExampleUsers();
					}}
				>
					Create user
				</ExampleButton>
			</div>
		</div>
	);
};

export default ExampleSendPost;
