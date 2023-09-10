"use client";
import { FC, ChangeEvent, useState } from "react";
import { useDb } from "@/services";
import { Button } from "@/client-components";
import { useLoadingAsync } from "@/utils/hooks/useLoadingAsync";

const DistilleryPutRequest: FC = () => {
	const { updateDescription, distilleries, refreshDistilleries } = useDb();

	const [id, setId] = useState<string>("");
	const [description, setDescription] = useState<string>("");

	const onChangeSelect = (ev: ChangeEvent<HTMLSelectElement>) => {
		setId(ev.target.value);
	};

	const onChangeInput = (ev: ChangeEvent<HTMLInputElement>) => {
		setDescription(ev.target.value);
	};

	const { loading } = useLoadingAsync(async () => {
		await refreshDistilleries();
	}, []);

	return (
		<div style={{ marginLeft: "10vw" }}>
			<h1>Update Distillery</h1>
			<div>
				<select onChange={onChangeSelect} defaultValue={"select"}>
					<option value="select">-- Choose Distillery --</option>
					{!loading && (
						<>
							{distilleries.map((distillery) => (
								<option
									key={distillery.id}
									value={distillery.id}
								>
									{distillery.name}
								</option>
							))}
						</>
					)}
				</select>

				<hr />
				<input
					type="text"
					onChange={onChangeInput}
					defaultValue={description}
				/>
				<Button
					onClick={() =>
						updateDescription("distillery", id, description)
					}
				>
					Submit
				</Button>
			</div>
		</div>
	);
};

export default DistilleryPutRequest;
