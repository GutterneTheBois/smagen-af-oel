"use client";
import { FC, useState, useRef, ChangeEvent, useEffect } from "react";
import { useDb } from "@/services";
import { Button } from "@/client-components";

const AdminPostRequest: FC = () => {
	const { admins, refreshAdmins, addAdmin } = useDb();
	const [input, setInput] = useState<string>("");
	const ref = useRef(null);

	useEffect(() => {
		(async () => await refreshAdmins())();
	}, [refreshAdmins]);

	const onChange = (ev: ChangeEvent<HTMLInputElement>): void => {
		setInput(ev.target.value);
	};

	const clearInput = () => {
		setInput("");

		// @ts-ignore
		ref.current.value = "";
	};

	const doesAdminExists = (): boolean => {
		return admins.some((admin) => admin.name === input);
	};

	return (
		<div style={{ marginRight: "10vw" }}>
			<h1>Add Admin</h1>
			<div>
				<label htmlFor="name">Name:</label>
				<br />
				<input
					ref={ref}
					name={"name"}
					defaultValue={input}
					onChange={onChange}
					placeholder={"Name"}
					style={{ color: `${doesAdminExists() ? "red" : "white"}` }}
				/>
				<Button
					onClick={() => {
						addAdmin(input);
						clearInput();
					}}
				>
					Submit
				</Button>
			</div>
		</div>
	);
};

export default AdminPostRequest;
