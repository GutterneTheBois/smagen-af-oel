"use client";
import { useDb } from "@/services";
import { ChangeEvent, FC, useState } from "react";
import { useLoadingAsync } from "@/utils/hooks/useLoadingAsync";
import { ExampleBox, ExampleButton } from "@/barrels";
import styles from "./updater.module.scss";

type HTMLConnectElement = HTMLSelectElement & HTMLInputElement;

const UpdaterExample: FC = () => {
	const {
		exampleUsers,
		getExampleUsers,
		updateExampleUser,
		deleteExampleUser,
	} = useDb();
	const [input, setInput] = useState({
		id: "",
		name: "",
	});

	const { loading } = useLoadingAsync(async () => {
		await getExampleUsers();
	}, []);

	const onChange = (ev: ChangeEvent<HTMLConnectElement>) => {
		const { name, value } = ev.target;

		setInput({
			...input,
			[name]: value,
		});
	};

	return (
		<ExampleBox className={styles.addMargin}>
			{!loading && (
				<select
					defaultValue={input.id}
					name="id"
					onChange={onChange}
					className={styles.adjustedHeight}
				>
					<option value={0}>-- Choose user --</option>
					{exampleUsers.map((user, index) => (
						<option key={index} value={user.id}>
							{user.name}
						</option>
					))}
				</select>
			)}

			<input
				name="name"
				onChange={onChange}
				className={styles.adjustedHeight}
			/>
			<ExampleButton
				onClick={async () => {
					await updateExampleUser(input.id, input.name);
				}}
			>
				Update user
			</ExampleButton>
			<ExampleButton
				onClick={async () => {
					await deleteExampleUser(input.id);
				}}
			>
				Delete User
			</ExampleButton>
		</ExampleBox>
	);
};

UpdaterExample.displayName = "Updater";

export default UpdaterExample;
