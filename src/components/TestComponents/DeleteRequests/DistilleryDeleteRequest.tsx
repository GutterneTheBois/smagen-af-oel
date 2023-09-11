"use client";
import { FC, useState, ChangeEvent } from "react";
import { useDb } from "@/services";
import { useLoadingAsync } from "@/utils/hooks/useLoadingAsync";
import { Button } from "@/client-components";

const DistilleryDeleteRequest: FC = () => {
	const { distilleries, refreshDistilleries, deleteDistillery } = useDb();

	const [id, setId] = useState<string>("");

	const { loading } = useLoadingAsync(async () => {
		await refreshDistilleries();
	}, [refreshDistilleries]);

	const onChange = (ev: ChangeEvent<HTMLSelectElement>) => {
		setId(ev.target.value);
	};

	return (
		<div style={{ marginLeft: "10vw" }}>
			<h1>Delete Distillery</h1>
			<div>
				<select onChange={onChange} defaultValue={"select"}>
					<option value={"select"}>-- Choose Distillery --</option>
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
				<Button onClick={() => deleteDistillery(id)}>Submit</Button>
			</div>
		</div>
	);
};

export default DistilleryDeleteRequest;
