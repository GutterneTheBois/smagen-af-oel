"use client";
import { FC, useState, ChangeEvent } from "react";
import { useDb } from "@/services";
import { useLoadingAsync } from "@/utils/hooks/useLoadingAsync";
import { Button } from "@/client-components";

const SpiritDeleteRequest: FC = () => {
	const { spirits, refreshSpirits, deleteSpirit } = useDb();

	const [id, setId] = useState<string>("");

	const { loading } = useLoadingAsync(async () => {
		await refreshSpirits();
	}, [refreshSpirits]);

	const onChange = (ev: ChangeEvent<HTMLSelectElement>) => {
		setId(ev.target.value);
	};

	return (
		<div>
			<h1>Delete Spirit</h1>
			<div>
				<select onChange={onChange} defaultValue={"select"}>
					<option value={"select"}>-- Choose Spirit --</option>
					{!loading && (
						<>
							{spirits.map((spirit) => (
								<option key={spirit.id} value={spirit.id}>
									{spirit.name}
								</option>
							))}
						</>
					)}
				</select>
				<hr />
				<Button onClick={() => deleteSpirit(id)}>Submit</Button>
			</div>
		</div>
	);
};

export default SpiritDeleteRequest;