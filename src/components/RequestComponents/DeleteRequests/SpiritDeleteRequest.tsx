"use client";
import { FC, useState, ChangeEvent } from "react";
import { useDb } from "@/services";
import { useLoadingAsync } from "@/utils/hooks/useLoadingAsync";
import { Button } from "@/client-components";

const SpiritDeleteRequest: FC = () => {
	const { spirits, refreshSpirits, deleteData } = useDb();

	const [id, setId] = useState<string>("");

	const { loading } = useLoadingAsync(async () => {
		await refreshSpirits();
	}, []);

	const onChange = (ev: ChangeEvent<HTMLSelectElement>) => {
		setId(ev.target.value);
	};

	return (
		<div style={{ marginLeft: "10vw" }}>
			<h1>Delete Spirit</h1>
			<div>
				<select onChange={onChange} defaultValue={"select"}>
					<option value={"select"}>-- Choose Spirit --</option>
					{!loading && (
						<>
							{spirits.map((spirit, index) => (
								<option key={index} value={spirit.id}>
									{spirit.name}
								</option>
							))}
						</>
					)}
				</select>
				<hr />
				<Button onClick={() => deleteData("spirit", id)}>Submit</Button>
			</div>
		</div>
	);
};

export default SpiritDeleteRequest;
